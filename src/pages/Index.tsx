import React, {useState, useMemo, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, PolygonLayer} from '@deck.gl/layers';
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import {scaleThreshold} from 'd3-scale';
import { ControlBar } from '@/components/ControlBar/ControlBar';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

import type {Color, Position, PickingInfo, MapViewState} from '@deck.gl/core';
import type {Feature, Geometry} from 'geojson';
import type { WorkerMessage } from '../types/worker';

const COLOR_SCALE_DOMAIN = [100, 500, 1000, 2200, 3500, 5000, 6000, 7000, 8000, 9000, 10000];
const colorPalettes = {
  redYellow: {
    name: 'Red-Yellow',
    range: [
      [200, 167, 100], 
      [254, 217, 118],
      [254, 178, 76],
      [253, 141, 60],
      [252, 78, 42],
      [227, 26, 28],
      [189, 0, 38],
      [128, 0, 38],
      [88, 0, 38],
      [48, 0, 38],
      [24, 0, 24]  
    ]
  },
  greenBlue: {
    name: 'Green-Blue',
    range: [
      [237, 248, 177],
      [199, 233, 180],
      [127, 205, 187],
      [65, 182, 196],
      [29, 145, 192],
      [34, 94, 168],
      [37, 52, 148],
      [8, 29, 88],
      [4, 15, 44],
      [0, 0, 0],
      [0, 0, 0]  
    ]
  },
  purplePink: {
    name: 'Purple-Pink',
    range: [
      [247, 244, 249],
      [231, 225, 239],
      [212, 185, 218],
      [201, 148, 199],
      [223, 101, 176],
      [231, 41, 138],
      [206, 18, 86],
      [152, 0, 67],
      [103, 0, 31],
      [50, 0, 15],
      [25, 0, 8]  
    ]
  },
  sunset: {
    name: 'Sunset',
    range: [
      [255, 204, 204],
      [255, 153, 153],
      [255, 102, 102],
      [255, 51, 51],
      [255, 0, 0],
      [204, 0, 0],
      [153, 0, 0],
      [102, 0, 0],
      [51, 0, 0],
      [25, 0, 0],
      [12, 0, 0]  
    ]
  },
  coolWarm: {
    name: 'Cool-Warm',
    range: [
      [49, 54, 149],
      [69, 117, 180],
      [116, 173, 209],
      [171, 217, 233],
      [224, 243, 248],
      [254, 224, 144],
      [253, 174, 97],
      [244, 109, 67],
      [215, 48, 39],
      [165, 0, 38],
      [128, 0, 38]  
    ]
  }
};

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 77.005,
  latitude: 9.635,
  zoom: 7,
  maxZoom: 16,
  pitch: 60,
  bearing: 310
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DARK_MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 10, 1, 6),
  color: [255, 255, 255],
  intensity: 1.0,
});

const landCover: Position[][] = [
  [
    [-123.0, 49.196],
    [-123.0, 49.324],
    [-123.306, 49.324],
    [-123.306, 49.196]
  ]
];

export type BlockProperties = {
  NDVI: number;
};

export default function App({
  data = '/density.geojson' 
}: {
  data?: string | Feature<Geometry, BlockProperties>[];
}) {
  const [geojsonData, setGeojsonData] = useState<Feature<Geometry, BlockProperties>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof data === 'string') {
      setLoading(true);
      setError(null);
      
      const worker = new Worker(
        new URL('../workers/geojsonLoader.ts', import.meta.url),
        { type: 'module' }
      );

      worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
        if (e.data.type === 'success') {
          setGeojsonData(e.data.data);
        } else {
          setError(e.data.error);
        }
        setLoading(false);
        worker.terminate();
      };

      worker.postMessage(data);

      return () => worker.terminate();
    } else {
      setGeojsonData(data);
    }
  }, [data]);

  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ambientLight, dirLight});
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });
  const [opacity, setOpacity] = useState(1);
  const [selectedPalette, setSelectedPalette] = useState<keyof typeof colorPalettes>('redYellow');
  const [is3D, setIs3D] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mapStyle, setMapStyle] = useState(MAP_STYLE);

  const colorScale = useMemo(() => {
    return scaleThreshold<number, Color>()
      .domain(COLOR_SCALE_DOMAIN)
      .range(colorPalettes[selectedPalette]?.range || colorPalettes.redYellow.range);
  }, [selectedPalette]);

  const viewState = useMemo(() => ({
    ...INITIAL_VIEW_STATE,
    pitch: is3D ? 60 : 0,  
    bearing: is3D ? 310 : 0  
  }), [is3D]);

  const layers = useMemo(() => [
    new PolygonLayer<Position[]>({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [0, 0, 0, 0]
    }),
    new GeoJsonLayer<BlockProperties>({
      id: 'geojson',
      data: geojsonData, 
      opacity,
      stroked: true,
      filled: true,
      extruded: is3D,
      wireframe: false,
      lineWidthMinPixels: 0,
      getElevation: f => f.properties.NDVI,
      elevationScale: 1.5,
      getFillColor: f => colorScale(f.properties.NDVI),
      getLineColor: [0, 0, 0, 0],
      getLineWidth: 0,
      pickable: true,
      material: {
        ambient: 0.8,
        diffuse: 0.9,
        shininess: 50,
        specularColor: [255, 255, 255],
      },
      updateTriggers: {
        getFillColor: [selectedPalette]  
      }
    })
  ], [geojsonData, opacity, colorScale, selectedPalette, is3D]);

  useEffect(() => {
    setMapStyle(theme === 'dark' ? DARK_MAP_STYLE : MAP_STYLE);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#e74c3c',
          fontFamily: 'Inter, sans-serif',
          padding: '20px'
        }}
        className="dark:bg-opacity-90 dark:bg-black"
      >
        <h2 style={{ marginBottom: '10px' }}>Error Loading Data</h2>
        <p style={{ color: '#666' }} className="dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div 
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          padding: '10px 20px',
          borderRadius: '8px',
          zIndex: 1,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          letterSpacing: '-0.5px',
          color: theme === 'dark' ? '#fff' : '#000',
          textShadow: theme === 'dark' 
            ? '0 0 10px rgba(255,255,255,0.3)'
            : '0 0 10px rgba(0,0,0,0.1)'
        }}>
          Kerala Population Density Map
        </h1>
        <p style={{
          margin: '5px 0 0 0',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          color: theme === 'dark' ? '#ddd' : '#444',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>Residents/KM²</span>
          <span style={{ 
            color: theme === 'dark' ? '#999' : '#666',
            fontStyle: 'italic',
            fontSize: '13px'
          }}>
            Source: WorldPop
          </span>
        </p>
      </div>
      
      <DeckGL
        layers={layers}
        effects={effects}
        initialViewState={viewState}
        controller={{ touchRotate: true, dragPan: true }}
      >
        <Map reuseMaps mapStyle={mapStyle} />
      </DeckGL>
      
      <ControlBar 
        opacity={opacity} 
        setOpacity={setOpacity} 
        selectedPalette={selectedPalette} 
        setSelectedPalette={setSelectedPalette} 
        is3D={is3D} 
        setIs3D={setIs3D} 
        theme={theme} 
        setTheme={setTheme} 
      />

      <div 
        className="non-touch-message"
        style={{
          position: 'absolute', 
          bottom: 35, 
          right: 10, 
          padding: '6px 12px', 
          borderRadius: '8px', 
          background: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)', 
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: theme === 'dark' 
            ? '0 4px 30px rgba(0, 0, 0, 0.3)'
            : '0 4px 30px rgba(0, 0, 0, 0.1)',
          display: 'none', 
          fontFamily: 'Inter, sans-serif', 
          fontSize: '12px',
          color: theme === 'dark' ? '#fff' : '#000',
          letterSpacing: '0.5px'
        }}
      >
        SHIFT+DRAG FOR ROTATION
      </div>

      <a
        href="https://amithv.xyz"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          color: theme === 'dark' ? '#fff' : '#000',
          textDecoration: 'none',
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          padding: '2px 8px',
          borderRadius: '12px',
          transition: 'opacity 0.2s ease',
          opacity: '0.4'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '0.4'}
      >
        by Amith
      </a>
    </>
  );
}

const style = document.createElement('style');
style.innerHTML = `
  @media (hover: hover) {
    .non-touch-message {
      display: block !important;
    }
  }
`;
document.head.appendChild(style);

export function renderToDOM(container: HTMLDivElement, dataUrl: string) {
  createRoot(container).render(<App data={dataUrl} />);
}
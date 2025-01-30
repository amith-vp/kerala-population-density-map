import React, { useState, useEffect } from 'react';
import { Slider } from './Slider';
import { GradientPicker, colorPalettes } from './GradientPicker';
import { ViewToggle } from './ViewToggle';
import { ThemeToggle } from './ThemeToggle';
import { ChevronUp } from 'lucide-react';

export const ControlBar = ({ 
  opacity, 
  setOpacity, 
  selectedPalette, 
  setSelectedPalette, 
  is3D, 
  setIs3D, 
  theme, 
  setTheme 
}: { 
  opacity: number, 
  setOpacity: (value: number) => void, 
  selectedPalette: string, 
  setSelectedPalette: (value: string) => void, 
  is3D: boolean, 
  setIs3D: (value: boolean) => void, 
  theme: 'light' | 'dark', 
  setTheme: (value: 'light' | 'dark') => void 
}) => {
  const [showGradients, setShowGradients] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!showGradients) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 200); 
      return () => clearTimeout(timer);
    }
  }, [showGradients]);

  const gradients = {
    redYellow: 'linear-gradient(to right, #e61c1c, #e6e61c)',
    deepOcean: 'linear-gradient(to right, #000033, #006994)', 
    purplePink: 'linear-gradient(to right, #e61c98, #d04ed6)',
    sunset: 'linear-gradient(to right, #f20c0c, #ebb0b0)',
    forest: 'linear-gradient(to right, #1a4314, #98fb98)', 
    greenBlue: 'linear-gradient(to right, #2193b0, #6dd5ed)',
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
      {(showGradients || isAnimating) && (
        <div 
          className={`absolute bottom-full mb-2 w-[340px] p-2 rounded-xl 
            bg-white/10 dark:bg-black/20 shadow-2xl backdrop-blur-lg 
            border border-white/20 dark:border-white/10
            transition-all duration-200 ease-in-out
            ${showGradients 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'}`}
        >
          <GradientPicker 
            selectedPalette={selectedPalette} 
            setSelectedPalette={(palette) => {
              setSelectedPalette(palette);
              setShowGradients(false);
            }} 
          />
        </div>
      )}
      <div className="w-[340px] p-2 rounded-xl bg-white/10 dark:bg-black/20 shadow-2xl backdrop-blur-lg border border-white/20 dark:border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Slider value={[opacity]} onValueChange={(values) => setOpacity(values[0])} />
          </div>
          <div className="shadow-xl">
            <button 
              onClick={() => setShowGradients(!showGradients)}
              className={`p-2 rounded-lg transition-colors border border-white/20 dark:border-white/10 ${
                showGradients 
                  ? 'bg-white/20 dark:bg-white/10' 
                  : 'bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-1">
                <div 
                  className="h-7 w-10 rounded-sm shadow-sm" 
                  style={{ background: gradients[selectedPalette] }} 
                />
                <ChevronUp 
                  className={`h-4 w-4 text-black/70 dark:text-white/90 transition-transform duration-200 ${
                    showGradients ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
          </div>
          <div className="shadow-xl">
            <ViewToggle is3D={is3D} setIs3D={setIs3D} />
          </div>
          <div className="shadow-xl">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </div>
  );
};
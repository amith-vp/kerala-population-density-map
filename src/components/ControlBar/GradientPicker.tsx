import React from 'react';

export const colorPalettes = {
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
  },
  forest: {
    name: 'Forest',
    range: [
      [152, 251, 152], 
      [144, 238, 144],
      [124, 205, 124],
      [102, 172, 102],
      [85, 139, 85],
      [67, 106, 67],
      [50, 83, 50],
      [34, 60, 34],
      [26, 47, 26],
      [18, 34, 18],
      [10, 20, 10]
    ]
  },
  deepOcean: {
    name: 'Deep Ocean',
    range: [
      [179, 205, 224], // Light Steel Blue
      [135, 169, 204], // Steel Blue
      [87, 133, 184],  // Blue Gray
      [52, 105, 164],  // Ocean Blue
      [32, 84, 147],   // Deep Ocean
      [21, 67, 130],   // Dark Ocean
      [14, 51, 115],   // Deep Sea
      [8, 37, 103],    // Abyss Blue
      [3, 27, 89],     // Dark Abyss
      [0, 19, 74],     // Ocean Deep
      [0, 13, 51]      // Deepest Ocean
    ]
  }
};

export const GradientPicker = ({ selectedPalette, setSelectedPalette }: { selectedPalette: string, setSelectedPalette: (value: string) => void }) => {
  const gradients = {
    redYellow: 'linear-gradient(to right, #e61c1c, #e6e61c)',
    deepOcean: 'linear-gradient(to right, #000033, #006994)', 
    purplePink: 'linear-gradient(to right, #e61c98, #d04ed6)',
    sunset: 'linear-gradient(to right, #f20c0c, #ebb0b0)',
    forest: 'linear-gradient(to right, #1a4314, #98fb98)', 
    greenBlue: 'linear-gradient(to right, #2193b0, #6dd5ed)',
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      {Object.entries(gradients).map(([key, gradient]) => (
        <button
          key={key}
          onClick={() => setSelectedPalette(key)}
          className={`p-1 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors ${
            selectedPalette === key ? 'ring-2 ring-white/50 dark:ring-white/30' : ''
          }`}
        >
          <div 
            className="h-8 w-full rounded-md shadow-sm hover:shadow-md transition-shadow" 
            style={{ background: gradient }} 
          />
        </button>
      ))}
    </div>
  );
};

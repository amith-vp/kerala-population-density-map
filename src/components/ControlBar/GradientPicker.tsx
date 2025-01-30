import React from 'react';

export const colorPalettes = {
  redYellow: 'linear-gradient(to right, #e61c1c, #e6e61c)',
  deepOcean: 'linear-gradient(to right, #000033, #006994)', 
  purplePink: 'linear-gradient(to right, #e61c98, #d04ed6)',
  sunset: 'linear-gradient(to right, #f20c0c, #ebb0b0)',
  forest: 'linear-gradient(to right, #1a4314, #98fb98)', 
  greenBlue: 'linear-gradient(to right, #2193b0, #6dd5ed)',
};

export const GradientPicker = ({ selectedPalette, setSelectedPalette }: { selectedPalette: string, setSelectedPalette: (value: string) => void }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {Object.entries(colorPalettes).map(([key, gradient]) => (
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

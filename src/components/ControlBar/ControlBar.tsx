import React from 'react';
import { Slider } from './Slider';
import { GradientPicker } from './GradientPicker';
import { ViewToggle } from './ViewToggle';
import { ThemeToggle } from './ThemeToggle';

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
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[340px] p-2 rounded-xl bg-white/10 dark:bg-black/20 shadow-2xl backdrop-blur-lg border border-white/20 dark:border-white/10">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Slider value={[opacity]} onValueChange={(values) => setOpacity(values[0])} />
        </div>
        <div className="shadow-xl">
          <GradientPicker selectedPalette={selectedPalette} setSelectedPalette={setSelectedPalette} />
        </div>
        <div className="shadow-xl">
          <ViewToggle is3D={is3D} setIs3D={setIs3D} />
        </div>
        <div className="shadow-xl">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </div>
  );
};
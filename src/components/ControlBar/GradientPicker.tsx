import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

const colorPalettes = {
  redYellow: 'linear-gradient(to right, #e61c1c, #e6e61c)', // Updated gradient
  greenBlue: 'linear-gradient(to right, #2193b0, #6dd5ed)',
  purplePink: 'linear-gradient(to right, #e61c98, #d04ed6)',
  sunset: 'linear-gradient(to right, #f20c0c, #ebb0b0)',
};

export const GradientPicker = ({ selectedPalette, setSelectedPalette }: { selectedPalette: string, setSelectedPalette: (value: string) => void }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="inline-flex hover:opacity-90 transition-opacity">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm transition-colors border border-white/20 dark:border-white/10">
          <div 
            className="h-5 w-10 rounded-md shadow-sm" 
            style={{ background: colorPalettes[selectedPalette] || colorPalettes.redYellow }} 
          />
          <ChevronDown className="h-4 w-4 text-black/70 dark:text-white/90" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-10 min-w-[100px] p-2 shadow-lg animate-in fade-in-80 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg">
        {Object.entries(colorPalettes).map(([key, gradient]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setSelectedPalette(key)}
            className="cursor-pointer flex items-center px-2 py-2.5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
          >
            <div 
              className="h-6 w-full  shadow-sm hover:shadow-md transition-shadow" 
              style={{ background: gradient }} 
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

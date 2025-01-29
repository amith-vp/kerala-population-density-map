import React from 'react';
import { Box, Square } from 'lucide-react';

export const ViewToggle = ({ is3D, setIs3D }: { is3D: boolean, setIs3D: (value: boolean) => void }) => {
  return (
    <button
      onClick={() => setIs3D(!is3D)}
      className="relative p-2 rounded-md bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm transition-colors border border-white/20 dark:border-white/10"
    >
      {is3D ? (
        <span className="text-black/70 dark:text-white/90 font-medium">3D</span>
      ) : (
        <span className="text-black/70 dark:text-white/90 font-medium">2D</span>
      )}
    </button>
  );
};
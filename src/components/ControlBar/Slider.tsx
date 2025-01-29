import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

export const Slider = ({ value, onValueChange }: { value: number[], onValueChange: (value: number[]) => void }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-black/70 dark:text-white/90">
          Opacity: {Math.round(value[0] * 100)}%
        </label>
      </div>
      <SliderPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        max={1}
        step={0.01}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-200/20 dark:bg-white/20">
          <SliderPrimitive.Range className="absolute h-full bg-zinc-400/80 dark:bg-white/80" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-zinc-200/50 dark:border-white/50 bg-primary shadow-sm transition-colors hover:border-zinc-200/80 dark:hover:border-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200/50 dark:focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
};
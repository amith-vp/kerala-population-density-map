import React from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = ({ theme, setTheme }: { theme: 'light' | 'dark', setTheme: (value: 'light' | 'dark') => void }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2 rounded-md bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm transition-colors border border-white/20 dark:border-white/10"
    >
      {isDark ? (
        <Moon className="w-6 h-6 text-black/70 dark:text-white/90" />
      ) : (
        <Sun className="w-6 h-6 text-black/70 dark:text-white/90" />
      )}
    </button>
  );
};
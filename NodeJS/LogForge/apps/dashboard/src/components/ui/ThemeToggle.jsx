import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { IconButton } from './IconButton';

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      className={className}
      label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
    </IconButton>
  );
}

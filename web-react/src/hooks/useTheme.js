import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'osa-hr-theme';

export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return true; // Default to dark on SSR
        const saved = localStorage.getItem(THEME_KEY);
        // Default to dark mode if no preference saved
        if (saved === 'light') return false;
        if (saved === 'dark') return true;
        // No saved preference - default to dark
        return true;
    });

    useEffect(() => {
        // Apply dark class on mount and changes
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = useCallback(() => {
        document.documentElement.classList.add('theme-transitioning');
        setIsDark(prev => {
            const newValue = !prev;
            localStorage.setItem(THEME_KEY, newValue ? 'dark' : 'light');
            return newValue;
        });

        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 500);
    }, []);

    return { isDark, toggleTheme };
}

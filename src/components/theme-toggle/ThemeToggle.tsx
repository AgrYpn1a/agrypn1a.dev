'use client';

import { useTheme } from '@/components/theme/ThemeProvider';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            className={`${styles.toggle} ${isDark ? styles.dark : styles.light}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <span className={styles.toggleBtnLine}>───</span>
            <span className={styles.icon} aria-hidden="true">
                {isDark ? '◑' : '☼'}
            </span>
            <span className={styles.toggleBtnLine}>───</span>
        </button>
    );
};

export default ThemeToggle;

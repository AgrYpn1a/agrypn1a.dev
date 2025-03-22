'use client';

import { useEffect, useState } from 'react';
import CommandLine from '../command-line/CommandLine';
import styles from './Header.module.scss';
import { SiteVersion } from '../site-version/SiteVersion';
import ThemeToggle from '../theme-toggle/ThemeToggle';

type HeaderProps = {
    siteVersion: string;
};

const Header: React.FC<HeaderProps> = ({ siteVersion }) => {
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const [titleVisible, setTitleVisible] = useState(false);

    // Update time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toTimeString().slice(0, 8));
        };
        updateTime();
        const timerId = setInterval(updateTime, 1000);
        return () => clearInterval(timerId);
    }, []);

    // Show title with a slight delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleVisible(true);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.status}>
                <CommandLine />
                <div className={styles.statusTime}>{currentTime}</div>
            </div>

            <div className={styles.themeToggleContainer}>
                <ThemeToggle />
            </div>

            <div className={styles.titleContainer}>
                <div className={styles.asciiContainer}>
                    <div className={styles.asciiLine}>┌──────────────────────────────────┐</div>
                    <div className={styles.titleRow}>
                        <div className={`${styles.title} ${titleVisible ? styles.visible : ''}`}>
                            <span>▓▒░ </span>
                            <span>RASTKO&apos;S DIGITAL REALM</span>
                            <span> ░▒▓</span>
                        </div>
                    </div>
                    <div className={styles.asciiLine}>└──────────────────────────────────┘</div>
                </div>
                <SiteVersion version={siteVersion} />
                <div className={styles.quote}>
                    Maybe I'm just a bizarre little person who walks back and forth.
                    <span className={styles.quoteAuthor}>Terry A. Davis</span>
                </div>
            </div>
        </header>
    );
};

export { Header };

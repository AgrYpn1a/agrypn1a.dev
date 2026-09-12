'use client';

import { useEffect, useState } from 'react';
import CommandLine from '../command-line/CommandLine';
import styles from './Header.module.scss';
import ThemeToggle from '../theme-toggle/ThemeToggle';

const Header: React.FC = () => {
    const [currentTime, setCurrentTime] = useState('00:00:00');

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

    return (
        <header className={styles.header}>
            <div className={styles.topRow}>
                <div className={styles.titleContainer}>
                    <div className={styles.asciiContainer}>
                        <div className={styles.titleBox}>
                            <span className={styles.blocks}>▓▒░</span>
                            <span className={styles.title}>RASTKO&apos;S DIGITAL REALM</span>
                            <span className={styles.blocks}>░▒▓</span>
                        </div>
                    </div>
                </div>

                <ThemeToggle />
            </div>

            <div className={styles.status}>
                <CommandLine />
                <div className={styles.statusTime}>{currentTime}</div>
            </div>
        </header>
    );
};

export { Header };

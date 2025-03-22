'use client';

import { useState, useEffect } from 'react';
import styles from './CommandLine.module.scss';

const CommandLine = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = 'My name is Rastko, I code and I yaRrr and I brap..brap.. and more...';
    const [cursorVisible, setCursorVisible] = useState(true);

    // Typing animation effect
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayText(fullText.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50); // Adjust typing speed here

        return () => clearInterval(typingInterval);
    }, []);

    // Blinking cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className={styles.commandLine}>
            <span className={styles.prompt}>&gt;</span>
            <span className={styles.typedText}>{displayText}</span>
            <span className={`${styles.cursor} ${cursorVisible ? styles.visible : styles.hidden}`} />
        </div>
    );
};

export default CommandLine;

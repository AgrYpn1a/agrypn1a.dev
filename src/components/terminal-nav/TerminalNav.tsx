import Link from 'next/link';
import styles from './TerminalNav.module.scss';

const TerminalNav = () => {
    return (
        <nav className={styles.terminalMenu}>
            <span className={styles.prompt}>&gt;</span>
            <Link href="/" className={styles.menuItem}>
                ~
            </Link>
            <Link href="/blog" className={styles.menuItem}>
                BLOG
            </Link>
            <Link href="/notes" className={styles.menuItem}>
                NOTES
            </Link>
            <Link href="/org" className={styles.menuItem}>
                ORG DUMP
            </Link>
        </nav>
    );
};

export { TerminalNav };

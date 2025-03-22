import Link from 'next/link';
import styles from './TerminalNav.module.scss';

const TerminalNav = () => {
    return (
        <nav className={styles.terminalMenu}>
            <span className={styles.prompt}>&gt;</span>
            <Link href="/" className={styles.menuItem}>
                ~
            </Link>
            <Link href="/org" className={styles.menuItem}>
                ARTICLES
            </Link>
        </nav>
    );
};

export { TerminalNav };

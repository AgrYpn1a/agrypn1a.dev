import styles from "./StatusBar.module.scss";

interface StatusBarProps {
    leftText: string;
    rightText: string;
}

export default function StatusBar({ leftText, rightText }: StatusBarProps) {
    return (
        <div className={styles.statusBar}>
            <div className={styles.statusLeft}>{leftText}</div>
            <div className={styles.statusRight}>{rightText}</div>
        </div>
    );
}

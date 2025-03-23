import styles from './SiteVersion.module.scss';

type SiteVersionProps = {
    version: string;
};

const SiteVersion: React.FC<SiteVersionProps> = ({ version }) => {
    return <div className={styles.siteVersion}>v {version}</div>;
};

export { SiteVersion };

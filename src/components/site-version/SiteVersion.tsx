import styles from './SiteVersion.module.scss';

const SiteVersion = ({ version }) => {
    return <div className={styles.siteVersion}>v {version}</div>;
};

export { SiteVersion };

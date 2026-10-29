import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './page.module.scss';

type CategoryLinkProps = {
    href: string;
    empty: boolean;
    className?: string;
    children: ReactNode;
};

// Categories without notes yet are still listed, but greyed out and not clickable.
const CategoryLink = ({ href, empty, className, children }: CategoryLinkProps) => {
    if (empty) {
        return <span className={`${className ?? ''} ${styles.empty}`}>{children}</span>;
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
};

export { CategoryLink };

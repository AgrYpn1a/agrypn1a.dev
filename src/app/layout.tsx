import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Header } from '@/components/header/Header';
import getConfig from 'next/config';
import { TerminalNav } from '@/components/terminal-nav/TerminalNav';
import styles from './layout.module.scss';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: "Rastko's Digital Realm",
    description: 'Portfolio, blog and more...',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { publicRuntimeConfig } = getConfig();

    return (
        <html lang="en">
            <ThemeProvider>
                <body className={`${geistSans.variable} ${geistMono.variable}`}>
                    <div className={styles.container}>
                        <Header siteVersion={publicRuntimeConfig?.version} />
                        <TerminalNav />
                        <main className={styles.mainContent}>{children}</main>
                    </div>
                </body>
            </ThemeProvider>
        </html>
    );
}

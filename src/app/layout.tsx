import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.scss';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Header } from '@/components/header/Header';
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

// Runs before first paint to set the theme from localStorage (falling back to
// the OS preference), so pages never flash the default light theme before
// React hydrates. Keep this in sync with ThemeProvider's initialization.
const themeInitScript = `
(function () {
    try {
        var stored = localStorage.getItem('theme');
        var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();
`;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
            </head>
            <ThemeProvider>
                <body className={`${geistSans.variable} ${geistMono.variable}`}>
                    <div className={styles.container}>
                        <Header />
                        <TerminalNav />
                        <main className={styles.mainContent}>{children}</main>
                    </div>
                </body>
            </ThemeProvider>
        </html>
    );
}

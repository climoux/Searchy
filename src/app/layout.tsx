import { Metadata, Viewport } from "next";
// import CSS
import '../css/prettied/styles.css';

export const metadata: Metadata = {
    title: "Searchy - A simple web browser",
    description: "Searchy is a web browser designed to be as simple as possible - no annoying ads or trackers, only results. It is developed by Clément M., a French developer.",
    icons: {
        apple: [
            { url: '/favicon/apple-icon-57x57.png', sizes: '57x57' },
            { url: '/favicon/apple-icon-60x60.png', sizes: '60x60' },
            { url: '/favicon/apple-icon-72x72.png', sizes: '72x72' },
            { url: '/favicon/apple-icon-76x76.png', sizes: '76x76' },
            { url: '/favicon/apple-icon-114x114.png', sizes: '114x114' },
            { url: '/favicon/apple-icon-120x120.png', sizes: '120x120' },
            { url: '/favicon/apple-icon-144x144.png', sizes: '144x144' },
            { url: '/favicon/apple-icon-152x152.png', sizes: '152x152' },
            { url: '/favicon/apple-icon-180x180.png', sizes: '180x180' }
        ],
        icon: [
            { url: '/favicon/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
        ],
        shortcut: '/favicon/ms-icon-144x144.png'
    },
    manifest: '/favicon/manifest.json',
    twitter: {
        title: 'Searchy - A simple web browser',
        description: "Searchy is a web browser designed to be as simple as possible - no annoying ads or trackers, only results. It is developed by Clément M., a French developer.",
        site: '@searchy',
        images: '/large_icon.png',
        card: 'summary_large_image'
    },
    openGraph: {
        title: 'Searchy - A simple web browser',
        description: "Searchy is a web browser designed to be as simple as possible - no annoying ads or trackers, only results. It is developed by Clément M., a French developer.",
        type: 'website',
        siteName: 'Searchy',
        images: '/large_icon.png',
        //url: 'https://wevaw.com'
    },
    /*alternates: {
        canonical: 'https://wevaw.com',
        languages: {
            'en-gb': 'https://wevaw.com/en-gb',
            'fr': 'https://wevaw.com/fr',
        }
    },*/
};
 
export const viewport: Viewport = {
    themeColor: '#ffffff',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="msapplication-TileColor" content="#ffffff"/>
                <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"/>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
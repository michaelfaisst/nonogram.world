import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <title>nonogram.world</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className="bg-white dark:bg-gray-900 transition-colors">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

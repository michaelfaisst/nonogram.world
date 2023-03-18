import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head />
            <body className="bg-white dark:bg-gray-900 transition-colors">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

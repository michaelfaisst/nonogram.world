import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import "~/styles/globals.css";
import { api } from "~/utils/api";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"]
});

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps }
}) => {
    return (
        <div>
            <ThemeProvider>
                <SessionProvider session={session}>
                    <style jsx global>{`
                        html {
                            font-family: ${montserrat.style.fontFamily};
                        }
                    `}</style>
                    <Component {...pageProps} />
                </SessionProvider>
            </ThemeProvider>
        </div>
    );
};

export default api.withTRPC(MyApp);

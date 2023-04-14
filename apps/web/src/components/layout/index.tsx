import type { PropsWithChildren } from "react";

import Header from "../header";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="mx-auto max-w-6xl">
            <Header />
            <main>{children}</main>
        </div>
    );
};

export default Layout;

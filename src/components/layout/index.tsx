import type { PropsWithChildren } from "react";

import Header from "../header";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="max-w-6xl mx-auto">
            <Header />
            <main>{children}</main>
        </div>
    );
};

export default Layout;

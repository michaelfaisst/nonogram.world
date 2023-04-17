import type { PropsWithChildren } from "react";

import Header from "../header";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Header />
            <main className="mx-auto mt-6 max-w-6xl">{children}</main>
        </div>
    );
};

export default Layout;

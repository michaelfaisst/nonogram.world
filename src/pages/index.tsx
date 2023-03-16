import { type NextPage } from "next";
import Head from "next/head";

import Nonogram, { NonogramDefinition } from "~/components/nonogram";

const Home: NextPage = () => {
    const nonogramDefinition: NonogramDefinition = {
        name: "test",
        width: 10,
        height: 10,
        rowClues: [[2], [4], [3], [6], [8], [6, 1], [8], [6], [4], [10]],
        colClues: [
            [1],
            [5, 1],
            [8],
            [9],
            [9],
            [1, 7],
            [2, 5, 1],
            [1, 1, 1, 1],
            [3, 1],
            [1]
        ]
    };

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex items-center justify-center h-screen">
                <Nonogram definition={nonogramDefinition} />
            </main>
        </>
    );
};

export default Home;

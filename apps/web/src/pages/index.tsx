import { type NextPage } from "next";

import { api } from "~/utils/api";
import Layout from "~/components/layout";
import NonogramListItem from "~/components/nonogram-list-item";

const Home: NextPage = () => {
    const { data: nonograms, isLoading } = api.nonogram.getNonograms.useQuery({
        limit: 10,
        offset: 0
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <Layout>
            <div>
                <h1 className="mb-3 border-b border-b-slate-200 text-2xl font-light">
                    Nonograms
                </h1>
                <div className="flex flex-col gap-2">
                    {nonograms?.map((nonogram) => (
                        <NonogramListItem
                            key={nonogram.id}
                            nonogram={nonogram}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Home;

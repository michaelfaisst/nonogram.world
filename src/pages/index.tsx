import { type NextPage } from "next";

import NonogramListItem from "~/components/nonogram-list-item";
import { api } from "~/utils/api";

const Home: NextPage = () => {
    const { data: nonograms, isLoading } = api.nonogram.getNonograms.useQuery({
        limit: 10,
        offset: 0
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div>
                <h1 className="text-2xl font-light border-b border-b-slate-200 mb-3">
                    Nonograms
                </h1>
                {nonograms?.map((nonogram) => (
                    <div key={nonogram.id} className="flex flex-col gap-3">
                        <NonogramListItem nonogram={nonogram} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;

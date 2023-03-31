import { type NextPage } from "next";

import NonogramListItem from "~/components/nonogram-list-item";
import { api } from "~/utils/api";

const Home: NextPage = () => {
    const { data: nonograms, isLoading } =
        api.nonogram.getNonograms.useInfiniteQuery(
            {
                limit: 10
            },
            {
                getNextPageParam: (lastPage) => lastPage.nextCursor
            }
        );

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div>
                <h1 className="text-2xl font-light border-b border-b-slate-200 mb-3">
                    Nonograms
                </h1>
                {nonograms?.pages.map((page) => (
                    <div key={page.nextCursor} className="flex flex-col gap-3">
                        {page.nonograms.map((nonogram) => (
                            <div className="flex flex-col gap-3">
                                <NonogramListItem nonogram={nonogram} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;

import type { NextPage } from "next";
import { useRouter } from "next/router";

import Nonogram from "~/components/nonogram";
import { api } from "~/utils/api";

const NonogramPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: nonogram, isLoading } = api.nonogram.getById.useQuery({
        id: id as string
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!nonogram) {
        return <div>Nonogram not found</div>;
    }

    return (
        <div>
            <Nonogram definition={nonogram} />
        </div>
    );
};

export default NonogramPage;

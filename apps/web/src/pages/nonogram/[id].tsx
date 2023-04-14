import type { NextPage } from "next";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import Layout from "~/components/layout";
import Nonogram from "~/components/nonogram";

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
        <Layout>
            <Nonogram definition={nonogram} />
        </Layout>
    );
};

export default NonogramPage;

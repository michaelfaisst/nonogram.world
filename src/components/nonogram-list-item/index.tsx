import React from "react";

import Link from "next/link";

import type { NonogramListOutput } from "~/utils/types";

interface Props {
    nonogram: NonogramListOutput;
}

const NonogramListItem = (props: Props) => {
    const { nonogram } = props;

    return (
        <Link
            href={`/nonogram/${nonogram.id}`}
            className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800"
        >
            <h2 className="mb-2">#{nonogram.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
                Size: {nonogram.width}x{nonogram.height}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
                Created by: {nonogram.createdBy?.name}
            </p>
        </Link>
    );
};

export default NonogramListItem;

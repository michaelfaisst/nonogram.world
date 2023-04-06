import React from "react";

import Link from "next/link";

import type { Nonogram } from "~/db/schema";

interface Props {
    nonogram: Nonogram;
}

const NonogramListItem = (props: Props) => {
    const { nonogram } = props;

    return (
        <Link
            href={`/nonogram/${nonogram.id}`}
            className="bg-slate-50 p-3 rounded-xl border border-slate-100"
        >
            <h2 className="mb-1">{nonogram.title}</h2>
            <p className="text-slate-600">
                Size: {nonogram.width}x{nonogram.height}
            </p>
        </Link>
    );
};

export default NonogramListItem;

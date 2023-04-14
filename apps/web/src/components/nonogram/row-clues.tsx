import clsx from "clsx";

interface Props {
    clues: number[][];
    highlightedRow?: number;
}

const RowClues = ({ clues, highlightedRow }: Props) => {
    return (
        <div
            className="grid"
            style={{ gridTemplateRows: `repeat(${clues.length}, 28px)` }}
        >
            {clues.map((clue, index) => {
                return (
                    <div
                        key={index}
                        className={clsx(
                            "flex flex-row items-center justify-end",
                            {
                                "bg-slate-50 dark:bg-slate-900":
                                    index === highlightedRow
                            }
                        )}
                    >
                        {clue.map((clue, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-7 text-center text-sm text-slate-500 dark:text-slate-400"
                                >
                                    {clue}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default RowClues;

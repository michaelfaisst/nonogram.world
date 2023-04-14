import clsx from "clsx";

interface Props {
    clues: number[][];
    highlightedColumn?: number;
}

const ColumnClues = ({ clues, highlightedColumn }: Props) => {
    return (
        <div
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${clues.length}, 28px)`
            }}
        >
            {clues.map((clue, index) => {
                return (
                    <div
                        key={index}
                        className={clsx(
                            "flex flex-col items-center justify-end",
                            {
                                "bg-slate-50 dark:bg-slate-900":
                                    index === highlightedColumn
                            }
                        )}
                    >
                        {clue.map((clue, index) => {
                            return (
                                <div
                                    key={index}
                                    className="h-7 text-center text-sm text-slate-500 dark:text-slate-400"
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

export default ColumnClues;

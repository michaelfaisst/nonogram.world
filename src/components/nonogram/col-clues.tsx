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
                            "flex flex-col justify-end items-center",
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
                                    className="text-center h-7 text-slate-500 text-sm dark:text-slate-400"
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

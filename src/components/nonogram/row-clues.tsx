interface Props {
    clues: number[][];
}

const RowClues = ({ clues }: Props) => {
    return (
        <div
            className="grid"
            style={{ gridTemplateRows: `repeat(${clues.length}, 28px)` }}
        >
            {clues.map((clue, index) => {
                return (
                    <div
                        key={index}
                        className="flex flex-row justify-end items-center"
                    >
                        {clue.map((clue, index) => {
                            return (
                                <div
                                    key={index}
                                    className="text-center w-7 text-slate-500 text-sm"
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

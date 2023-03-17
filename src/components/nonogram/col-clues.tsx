interface Props {
    clues: number[][];
}

const ColumnClues = ({ clues }: Props) => {
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
                        className="flex flex-col justify-end items-center"
                    >
                        {clue.map((clue, index) => {
                            return (
                                <div
                                    key={index}
                                    className="text-center h-7 text-slate-500 text-sm"
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

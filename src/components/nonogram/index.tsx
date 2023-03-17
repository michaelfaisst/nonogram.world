import { useRef, useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import ColumnClues from "./col-clues";
import RowClues from "./row-clues";

export interface NonogramDefinition {
    name: string;
    width: number;
    height: number;
    rowClues: number[][];
    colClues: number[][];
}

interface Props {
    definition: NonogramDefinition;
}

enum CellState {
    Empty = 0,
    Filled = 1,
    Crossed = 2
}

const Nonogram = (props: Props) => {
    const { definition } = props;
    const { width, height, rowClues, colClues } = definition;

    const [grid, setGrid] = useState<CellState[]>(
        Array.from({ length: width * height }).map(() => CellState.Empty)
    );

    const [mouseDown, setMouseDown] = useState(false);
    const currentFill = useRef<CellState>(CellState.Filled);

    const toggleCellFill = (index: number) => {
        const newGrid = [...grid];
        const newFill =
            grid[index] === CellState.Empty || grid[index] === CellState.Crossed
                ? CellState.Filled
                : CellState.Empty;
        newGrid[index] = newFill;
        currentFill.current = newFill;
        setGrid(newGrid);
    };

    const toggleCellCrossed = (index: number) => {
        const newGrid = [...grid];
        const newFill =
            grid[index] === CellState.Empty || grid[index] === CellState.Filled
                ? CellState.Crossed
                : CellState.Empty;
        newGrid[index] = newFill;
        currentFill.current = newFill;
        setGrid(newGrid);
    };

    const fillCell = (index: number, fill: CellState) => {
        const newGrid = [...grid];
        newGrid[index] = fill;
        setGrid(newGrid);
    };

    const renderGrid = () => {
        return (
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${width}, 28px)`,
                    gridTemplateRows: `repeat(${height}, 28px)`
                }}
            >
                {Array.from({ length: width * height }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className={clsx(
                                "border border-slate-100 transition-colors",
                                {
                                    "bg-slate-400":
                                        grid[index] === CellState.Filled
                                }
                            )}
                            onMouseDown={(e) => {
                                if (e.button === 0) {
                                    toggleCellFill(index);
                                } else if (e.button === 2) {
                                    toggleCellCrossed(index);
                                }
                                setMouseDown(true);
                            }}
                            onMouseUp={() => setMouseDown(false)}
                            onMouseEnter={() => {
                                if (mouseDown) {
                                    fillCell(index, currentFill.current);
                                }
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {grid[index] === CellState.Crossed && (
                                <XMarkIcon className="text-slate-300" />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
            <div></div>
            <ColumnClues clues={colClues} />
            <RowClues clues={rowClues} />
            <div>{renderGrid()}</div>
        </div>
    );
};

export default Nonogram;
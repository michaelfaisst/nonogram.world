import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import clsx from "clsx";

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

    const renderColClues = () => {
        return (
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${colClues.length}, 28px)`
                }}
            >
                {definition.colClues.map((clue, index) => {
                    return (
                        <div key={index} className="flex flex-col justify-end items-center">
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

    const renderRowClues = () => {
        return (
            <div
                className="grid"
                style={{ gridTemplateRows: `repeat(${rowClues.length}, 28px)` }}
            >
                {definition.rowClues.map((clue, index) => {
                    return (
                        <div key={index} className="flex flex-row justify-end items-center">
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

    const toggleCellFill = (index: number) => {
        const newGrid = [...grid];
        newGrid[index] =
            grid[index] === CellState.Empty || grid[index] === CellState.Crossed
                ? CellState.Filled
                : CellState.Empty;
        setGrid(newGrid);
    };

    const toggleCellCrossed = (index: number) => {
        const newGrid = [...grid];
        newGrid[index] =
            grid[index] === CellState.Empty || grid[index] === CellState.Filled
                ? CellState.Crossed
                : CellState.Empty;
        setGrid(newGrid);
    }

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
                            className={clsx("border border-slate-100 transition-colors", {
                                "bg-slate-400": grid[index] === CellState.Filled,
                            })}
                            onClick={() => toggleCellFill(index)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                toggleCellCrossed(index);
                            }}
                        >
                            {grid[index] === CellState.Crossed && <XMarkIcon className="text-slate-300" /> }
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
            <div></div>
            <div>{renderColClues()}</div>
            <div>{renderRowClues()}</div>
            <div>{renderGrid()}</div>
        </div>
    );
};

export default Nonogram;

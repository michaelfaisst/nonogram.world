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
    solution: boolean[];
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
    const { width, height, rowClues, colClues, solution } = definition;

    const [grid, setGrid] = useState<CellState[]>(
        Array.from({ length: width * height }).map(() => CellState.Empty)
    );

    const [pathStart, setPathStart] = useState<number | undefined>(undefined);
    const [currentPath, setCurrentPath] = useState<number[]>([]);

    const [solved, setSolved] = useState(false);
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

    const checkSolution = () => {
        let errors = false;

        for (let i = 0; i < grid.length; i++) {
            if (
                (grid[i] === CellState.Filled && !solution[i]) ||
                ((grid[i] === CellState.Empty ||
                    grid[i] === CellState.Crossed) &&
                    solution[i])
            ) {
                errors = true;
                break;
            }
        }

        setSolved(!errors);
    };

    const calculatePath = (index: number) => {
        if (pathStart === undefined) return;

        const startRow = Math.floor(pathStart / width);
        const startCol = pathStart % width;

        const endRow = Math.floor(index / width);
        const endCol = index % width;

        const rowDiff = endRow - startRow;
        const colDiff = endCol - startCol;

        const direction =
            Math.abs(rowDiff) >= Math.abs(colDiff) ? "col" : "row";

        const path: number[] = [];

        if (direction === "row") {
            for (let i = 0; i <= Math.abs(colDiff); i++) {
                const col = startCol + i * Math.sign(colDiff);
                const index = startRow * width + col;

                path.push(index);
            }
        } else {
            for (let i = 0; i <= Math.abs(rowDiff); i++) {
                const row = startRow + i * Math.sign(rowDiff);
                const index = row * width + startCol;

                path.push(index);
            }
        }

        setCurrentPath(path);
    };

    const applyPath = () => {
        const newGrid = [...grid];
        currentPath.forEach((index) => {
            newGrid[index] = currentFill.current;
        });
        setGrid(newGrid);
        setCurrentPath([]);
        checkSolution();
    };

    const getCellColor = (index: number) => {
        if (currentPath.includes(index)) {
            return currentFill.current === CellState.Empty ||
                currentFill.current === CellState.Crossed
                ? "bg-white"
                : "bg-slate-400";
        }

        return grid[index] === CellState.Empty ||
            grid[index] === CellState.Crossed
            ? "bg-white"
            : "bg-slate-400";
    };

    const shouldRenderCross = (index: number) => {
        if (currentPath.includes(index)) {
            return currentFill.current === CellState.Crossed ? true : false;
        }

        return grid[index] === CellState.Crossed;
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
                    const row = Math.floor(index / width);
                    const col = index % width;

                    return (
                        <div
                            key={index}
                            className={clsx(
                                `border border-slate-100 transition-colors ${getCellColor(
                                    index
                                )}`,
                                {
                                    "border-r-slate-300":
                                        col % 5 === 4 && col < width - 1,
                                    "border-l-slate-300":
                                        col % 5 === 0 && col > 0,
                                    "border-b-slate-300":
                                        row % 5 === 4 && row < height - 1,
                                    "border-t-slate-300":
                                        row % 5 === 0 && row > 0
                                }
                            )}
                            onMouseDown={(e) => {
                                console.log(e.button);
                                if (e.button === 0) {
                                    toggleCellFill(index);
                                } else if (e.button === 2) {
                                    toggleCellCrossed(index);
                                }
                                setPathStart(index);
                            }}
                            onMouseUp={() => {
                                setPathStart(undefined);
                                applyPath();
                            }}
                            onMouseEnter={() => {
                                if (pathStart !== undefined) {
                                    calculatePath(index);
                                }
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {shouldRenderCross(index) && (
                                <XMarkIcon className="text-slate-300" />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
                <div></div>
                <ColumnClues clues={colClues} />
                <RowClues clues={rowClues} />
                <div>{renderGrid()}</div>
            </div>

            <button className="mt-4" type="button" onClick={checkSolution}>
                Check solution
            </button>

            <span>{JSON.stringify(solved)}</span>
        </div>
    );
};

export default Nonogram;

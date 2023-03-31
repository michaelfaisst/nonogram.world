import { Nonogram } from "@prisma/client";
import { useRef, useState } from "react";

import Cell from "./cell";
import ColumnClues from "./col-clues";
import RowClues from "./row-clues";
import {
    FillState,
    MouseButton,
    indexToRowCol
} from "./utils";

interface Props {
    definition: Nonogram;
}

const Nonogram = (props: Props) => {
    const { definition } = props;
    const { width, height, rowClues, colClues, solution } = definition;

    const [grid, setGrid] = useState<FillState[]>(
        Array.from({ length: width * height }).map(() => FillState.Empty)
    );

    const [pathStart, setPathStart] = useState<number | undefined>(undefined);
    const [currentPath, setCurrentPath] = useState<number[]>([]);

    const [solved, setSolved] = useState(false);
    const currentFill = useRef<FillState>(FillState.Filled);

    const toggleCellFill = (index: number, mouseButton: MouseButton) => {
        const newGrid = [...grid];
        let newFill: FillState;

        if (mouseButton === "left") {
            newFill =
                grid[index] === FillState.Empty ||
                grid[index] === FillState.Crossed
                    ? FillState.Filled
                    : FillState.Empty;
        } else {
            newFill =
                grid[index] === FillState.Empty ||
                grid[index] === FillState.Filled
                    ? FillState.Crossed
                    : FillState.Empty;
        }

        newGrid[index] = newFill;
        currentFill.current = newFill;
        setGrid(newGrid);
    };

    const checkSolution = () => {
        let errors = false;

        for (let i = 0; i < grid.length; i++) {
            if (
                (grid[i] === FillState.Filled && !solution[i]) ||
                ((grid[i] === FillState.Empty ||
                    grid[i] === FillState.Crossed) &&
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
        const [startRow, startCol] = indexToRowCol(pathStart, width);
        const [endRow, endCol] = indexToRowCol(index, width);

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

    const getCellFill = (index: number) => {
        if (currentPath.includes(index)) {
            return currentFill.current;
        }

        return grid[index] || FillState.Empty;
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
                        <Cell
                            key={index}
                            index={index}
                            gridWidth={width}
                            fillState={getCellFill(index)}
                            onMouseDown={(e) => {
                                toggleCellFill(
                                    index,
                                    e.button === 0 ? "left" : "right"
                                );
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
                        />
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

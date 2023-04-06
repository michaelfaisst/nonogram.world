import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { FillState, indexToRowCol } from "../utils";

export interface Props {
    index: number;
    fillState: FillState;
    gridWidth: number;
    highlight?: boolean;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseUp: () => void;
    onMouseEnter: () => void;
    onMouseOver: () => void;
}

const Cell = (props: Props) => {
    const {
        fillState,
        index,
        gridWidth,
        highlight,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseOver
    } = props;

    const [row, col] = indexToRowCol(gridWidth, props.index);
    return (
        <div
            test-id="cell"
            key={index}
            className={clsx(`border border-slate-100 dark:border-slate-800`, {
                "bg-slate-800 dark:bg-slate-300":
                    fillState === FillState.Filled,
                "border-r-slate-300 dark:border-r-slate-600":
                    col % 5 === 4 && col < gridWidth - 1,
                "border-l-slate-300 dark:border-l-slate-600":
                    col % 5 === 0 && col > 0,
                "border-b-slate-300 dark:border-b-slate-600":
                    row % 5 === 4 && row < gridWidth - 1,
                "border-t-slate-300 dark:border-t-slate-600":
                    row % 5 === 0 && row > 0,
                "bg-slate-50 dark:bg-slate-900":
                    highlight && fillState !== FillState.Filled
            })}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onMouseOver={onMouseOver}
            onContextMenu={(e) => {
                e.preventDefault();
            }}
        >
            {fillState === FillState.Crossed && (
                <XMarkIcon className="text-slate-300 dark:text-slate-700" />
            )}
        </div>
    );
};

export default Cell;

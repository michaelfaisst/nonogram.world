import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { FillState, indexToRowCol } from "../utils";

export interface Props {
    index: number;
    fillState: FillState;
    gridWidth: number;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseUp: () => void;
    onMouseEnter: () => void;
}

const Cell = (props: Props) => {
    const {
        fillState,
        index,
        gridWidth,
        onMouseDown,
        onMouseUp,
        onMouseEnter
    } = props;

    const [row, col] = indexToRowCol(props.index, gridWidth);
    return (
        <div
            test-id="cell"
            key={index}
            className={clsx(`border border-slate-100`, {
                "bg-slate-400": fillState === FillState.Filled,
                "border-r-slate-300": col % 5 === 4 && col < gridWidth - 1,
                "border-l-slate-300": col % 5 === 0 && col > 0,
                "border-b-slate-300": row % 5 === 4 && row < gridWidth - 1,
                "border-t-slate-300": row % 5 === 0 && row > 0
            })}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onContextMenu={(e) => {
                e.preventDefault();
            }}
        >
            {fillState === FillState.Crossed && (
                <XMarkIcon className="text-slate-300" />
            )}
        </div>
    );
};

export default Cell;

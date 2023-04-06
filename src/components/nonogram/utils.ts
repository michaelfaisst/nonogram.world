export interface NonogramDefinition {
    name: string;
    width: number;
    height: number;
    rowClues: number[][];
    colClues: number[][];
    solution: boolean[];
}

export enum FillState {
    Empty = 0,
    Filled = 1,
    Crossed = 2
}

export type MouseButton = "left" | "right";

export const indexToRowCol = (
    width: number,
    index?: number
): [number, number] => {
    if (index === undefined) {
        return [-1, -1];
    }

    return [Math.floor(index / width), index % width];
};

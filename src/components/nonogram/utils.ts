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
    index: number,
    width: number
): [number, number] => {
    return [Math.floor(index / width), index % width];
};

import type { RouterOutputs } from "./api";

export type NonogramListOutput = RouterOutputs["nonogram"]["getNonograms"][0];
export type NonogramOutput = RouterOutputs["nonogram"]["getById"];

import { type RouterOutputs } from "@nw/api";

export type NonogramListOutput = RouterOutputs["nonogram"]["getNonograms"][0];
export type NonogramOutput = RouterOutputs["nonogram"]["getById"];

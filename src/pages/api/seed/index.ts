import type { NextApiRequest, NextApiResponse } from "next";

import { createId } from "@paralleldrive/cuid2";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { db } from "~/db";
import { nonograms } from "~/db/schema";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const imageDirectory = path.join(process.cwd(), "seed-images");
        const files = fs.readdirSync(imageDirectory);

        for (const file of files) {
            const name = file.split(".")[0];

            if (!name) return;

            const { data, info } = await sharp(`${imageDirectory}/${file}`)
                .raw()
                .toBuffer({ resolveWithObject: true });

            const pixelArray = new Uint8ClampedArray(data.buffer);
            const solution = [];

            for (let i = 0; i < pixelArray.length; i++) {
                if (i % 4 === 3) {
                    solution.push(pixelArray[i] === 0 ? false : true);
                }
            }

            const rowClues = [];

            for (let i = 0; i < info.height; i++) {
                let count = 0;
                const row = [];

                for (let j = 0; j < info.width; j++) {
                    if (solution[i * info.width + j]) {
                        count++;
                    } else {
                        if (count > 0) {
                            row.push(count);
                            count = 0;
                        }
                    }
                }

                if (count > 0) {
                    row.push(count);
                }

                rowClues.push(row);
            }

            const columnClues = [];

            for (let i = 0; i < info.width; i++) {
                let count = 0;
                const column = [];

                for (let j = 0; j < info.height; j++) {
                    if (solution[j * info.width + i]) {
                        count++;
                    } else {
                        if (count > 0) {
                            column.push(count);
                            count = 0;
                        }
                    }
                }

                if (count > 0) {
                    column.push(count);
                }

                columnClues.push(column);
            }

            await db.insert(nonograms).values({
                id: createId(),
                type: "black_and_white",
                title: name,
                width: info.width,
                height: info.height,
                solution,
                rowClues,
                colClues: columnClues,
                createdBy: "kxeqhd9oshtq5gyjc1dw0uac"
            });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

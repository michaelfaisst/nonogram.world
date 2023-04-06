import { createId } from "@paralleldrive/cuid2";
import fs from "fs";
import sharp from "sharp";

import { db } from "../db";
import { nonograms } from "../db/schema";

async function main() {
    const files = fs.readdirSync("./seed-images");

    for (const file of files) {
        const name = file.split(".")[0];

        if (!name) return;

        const { data, info } = await sharp(`./prisma/seed-images/${file}`)
            .raw()
            .toBuffer({ resolveWithObject: true });

        const pixelArray = new Uint8ClampedArray(data.buffer);
        const solution: boolean[] = [];

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
            createdBy: "clfx38kjq000005kj12fjfppq"
        });
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});

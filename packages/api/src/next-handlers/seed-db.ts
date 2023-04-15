import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { db, nonograms } from "@nw/db";
import { createId } from "@paralleldrive/cuid2";
import { glob } from "glob";
import sharp from "sharp";

export const seedDatabase = async (_: NextApiRequest, res: NextApiResponse) => {
    try {
        const images = await glob("**/public/seed-images/**/*.png");

        for (const file of images) {
            let name = file.split(".")[0];
            name = name?.substring(name.lastIndexOf("/") + 1);

            if (!name) return;

            const { data, info } = await sharp(path.join(process.cwd(), file))
                .raw()
                .toBuffer({ resolveWithObject: true });

            const pixelArray = new Uint8ClampedArray(data.buffer);
            const solution = [];

            const chunkSize = 4;
            for (let i = 0; i < pixelArray.length; i += chunkSize) {
                const chunk = pixelArray.slice(i, i + chunkSize);
                const isEmpty =
                    (chunk[0] === 255 &&
                        chunk[1] === 255 &&
                        chunk[2] === 255) ||
                    chunk[3] === 0;

                solution.push(!isEmpty);
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

        res.status(200).json({ message: "Seeded database" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to seed database" });
    }
};

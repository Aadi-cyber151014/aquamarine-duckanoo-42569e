import { Noise } from "./Noise.js";
import { TreeGenerator } from "./TreeGenerator.js";

export class Chunk {

    constructor(x, z, size = 16, height = 128) {

        this.x = x;
        this.z = z;
        

        this.size = size;
        this.height = height;
        this.noise = new Noise();
        this.blocks = [];

        for (let x = 0; x < size; x++) {

            this.blocks[x] = [];

            for (let y = 0; y < height; y++) {

                this.blocks[x][y] = [];

                for (let z = 0; z < size; z++) {

                    this.blocks[x][y][z] = 0;

                }

            }

        }

    }

    generate() {

        for (let x = 0; x < this.size; x++) {

            for (let z = 0; z < this.size; z++) {

                const worldX = this.x * this.size + x;
const worldZ = this.z * this.size + z;

let h = this.noise.getHeight(
    worldX,
    worldZ
);

                h = Math.max(1, Math.min(h, this.height - 1));

                for (let y = 0; y < h; y++) {

                   if (y === h - 1) {

    this.blocks[x][y][z] = 1; // Grass

}
else if (y >= h - 4) {

    this.blocks[x][y][z] = 2; // Dirt

}
else {

    this.blocks[x][y][z] = 3; // Stone

}

                }
                // Don't generate trees near chunk borders
if (
    x > 2 &&
    x < this.size - 3 &&
    z > 2 &&
    z < this.size - 3
) {

    const worldX = this.x * this.size + x;
    const worldZ = this.z * this.size + z;

    // About 1 tree every 80 blocks
    if ((worldX * 17 + worldZ * 31) % 80 === 0) {

        TreeGenerator.generate(
            this,
            x,
            h,
            z
        );

    }

}

            }

        }

    }

    getBlock(x, y, z) {

        if (
            x < 0 ||
            x >= this.size ||
            y < 0 ||
            y >= this.height ||
            z < 0 ||
            z >= this.size
        ) {

            return 0;

        }

        return this.blocks[x][y][z];

    }

    setBlock(x, y, z, id) {

        if (
            x < 0 ||
            x >= this.size ||
            y < 0 ||
            y >= this.height ||
            z < 0 ||
            z >= this.size
        ) {

            return;

        }

        this.blocks[x][y][z] = id;

    }

    // NEW: Returns the highest solid block at a world position
    getBlockHeight(worldX, worldZ) {

        const localX =
            ((worldX % this.size) + this.size) % this.size;

        const localZ =
            ((worldZ % this.size) + this.size) % this.size;

        for (let y = this.height - 1; y >= 0; y--) {

            if (this.blocks[localX][y][localZ] !== 0) {

                return y;

            }

        }

        return 0;

    }

}
export class TreeGenerator {

    static generate(chunk, x, y, z) {

        // Trunk (4 blocks tall)

        for (let i = 0; i < 4; i++) {

            chunk.setBlock(x, y+i, z, 4); // trunk

        }

        // Leaves

        for (let lx = -2; lx <= 2; lx++) {

            for (let lz = -2; lz <= 2; lz++) {

                for (let ly = 3; ly <= 5; ly++) {

                    if (

                        Math.abs(lx) === 2 &&
                        Math.abs(lz) === 2 &&
                        ly !== 4

                    ) continue;

                    chunk.setBlock(

                        x + lx,

                        y + ly,

                        z + lz,

                        5

                    );

                }

            }

        }

    }

}
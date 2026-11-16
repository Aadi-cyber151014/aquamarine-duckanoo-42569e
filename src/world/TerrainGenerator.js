import { Noise } from "./Noise.js";

export class TerrainGenerator {

    static getHeight(x, z) {

        const base =
            Noise.getHeight(
                x * 0.003,
                z * 0.003
            ) * 35;

        const hills =
            Noise.getHeight(
                x * 0.01,
                z * 0.01
            ) * 10;

        const detail =
            Noise.getHeight(
                x * 0.05,
                z * 0.05
            ) * 2;

        return Math.floor(

            48 +
            base +
            hills +
            detail

        );

    }

}
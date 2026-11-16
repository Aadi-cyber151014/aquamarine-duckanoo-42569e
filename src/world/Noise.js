import FastNoiseLite from "fastnoise-lite";

export class Noise {

constructor(seed = 6728358) {

    this.continents = new FastNoiseLite();
    this.hills = new FastNoiseLite();
    this.peaks = new FastNoiseLite();
    this.detail = new FastNoiseLite();

    for (const noise of [

        this.continents,
        this.hills,
        this.peaks,
        this.detail

    ]) {

        noise.SetSeed(seed);

        noise.SetNoiseType(
            FastNoiseLite.NoiseType.OpenSimplex2
        );

        noise.SetFractalType(
            FastNoiseLite.FractalType.FBm
        );

        noise.SetFractalOctaves(5);

    }

    this.continents.SetFrequency(0.0012);

    this.hills.SetFrequency(0.004);

    this.peaks.SetFrequency(0.009);

    this.detail.SetFrequency(0.05);

}

getHeight(x, z) {

    const continents =

        this.continents.GetNoise(x, z);

    const hills =

        this.hills.GetNoise(x, z);

    const peaks =

        Math.max(

            0,

            this.peaks.GetNoise(x, z)

        );

    const detail =

        this.detail.GetNoise(x, z);

    const height =

        40 +

        continents * 28 +

        hills * 10 +

        peaks * 40 +

        detail * 2;

    return Math.floor(height);

}

}
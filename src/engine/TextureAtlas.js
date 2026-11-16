import * as THREE from "three";

export class TextureAtlas {

    constructor() {

        const loader = new THREE.TextureLoader();

        this.texture = loader.load(
            "/textures/atlas.png"
        );

        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.NearestMipmapNearestFilter;
        this.texture.generateMipmaps = true;

        this.tileSize = 16;
this.atlasSize = 64;

this.tilesPerRow = this.atlasSize / this.tileSize;

    }

    getUV(tileX, tileY, rotation = 0) {

    const tileSize = 1 / this.tilesPerRow;

    const u0 = tileX * tileSize;
    const v0 = 1 - (tileY + 1) * tileSize;

    const u1 = u0 + tileSize;
    const v1 = v0 + tileSize;

    const uv = [

        u0, v1,
        u0, v0,
        u1, v0,
        u1, v1

    ];

    switch(rotation){

        case 90:
            return [

                uv[6],uv[7],
                uv[0],uv[1],
                uv[2],uv[3],
                uv[4],uv[5]

            ];

        case 180:
            return [

                uv[4],uv[5],
                uv[6],uv[7],
                uv[0],uv[1],
                uv[2],uv[3]

            ];

        case 270:
            return [

                uv[2],uv[3],
                uv[4],uv[5],
                uv[6],uv[7],
                uv[0],uv[1]

            ];

        default:
            return uv;

    }

}

}
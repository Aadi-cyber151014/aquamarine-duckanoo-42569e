import * as THREE from "three";
import { TextureAtlas } from "./TextureAtlas.js";
import { BlockData } from "../world/BlockRegistry.js";

const FACES = [

{
    name: "top",

    normal: [0,1,0],

    check:[0,1,0],

    verts:(x,y,z)=>[

        [x,y+1,z],
        [x,y+1,z+1],
        [x+1,y+1,z+1],
        [x+1,y+1,z]

    ],

    texture:"top"

},

{
    name:"bottom",

    normal:[0,-1,0],

    check:[0,-1,0],

    verts:(x,y,z)=>[

        [x,y,z],
        [x+1,y,z],
        [x+1,y,z+1],
        [x,y,z+1]

    ],

    texture:"bottom"

},

{
    name:"left",

    normal:[-1,0,0],

    check:[-1,0,0],
    rotation: 180,

    verts:(x,y,z)=>[

        [x,y,z+1],
        [x,y+1,z+1],
        [x,y+1,z],
        [x,y,z]
        

    ],

    texture:"side"

},

{
    name:"right",

    normal:[1,0,0],

    check:[1,0,0],
    rotation: 180,

    verts:(x,y,z)=>[

        [x+1,y,z],
        [x+1,y+1,z],
        [x+1,y+1,z+1],
        [x+1,y,z+1]

    ],

    texture:"side"

},

{
    name:"front",

    normal:[0,0,1],

    check:[0,0,1],
    rotation: 180,

    verts:(x,y,z)=>[

        [x+1,y,z+1],
        [x+1,y+1,z+1],
        [x,y+1,z+1],
        [x,y,z+1]

    ],

    texture:"side"

},

{
    name:"back",

    normal:[0,0,-1],

    check:[0,0,-1],
    rotation: 180,

    verts:(x,y,z)=>[

        [x,y,z],
        [x,y+1,z],
        [x+1,y+1,z],
        [x+1,y,z]

    ],

    texture:"side"

}

];

export class MeshBuilder {

    constructor(scene) {

        this.scene = scene;

        this.atlas = new TextureAtlas();

        this.material = new THREE.MeshLambertMaterial({

            map: this.atlas.texture,
            side: THREE.FrontSide

        });

    }

    build(chunk, world) {

        const vertices = [];
        const normals = [];
        const uvs = [];
        const indices = [];

        let index = 0;
        

        const addQuad = (

    v1,
    v2,
    v3,
    v4,
    normal,
    tileX,
    tileY,
    rotation = 0

) => {

            vertices.push(

                ...v1,
                ...v2,
                ...v3,
                ...v4

            );

            for(let i=0;i<4;i++){

                normals.push(...normal);

            }

            const faceUV = this.atlas.getUV(

    tileX,
    tileY,
    rotation

);

            uvs.push(...faceUV);

            indices.push(

                index,
                index+1,
                index+2,

                index,
                index+2,
                index+3

            );

            index += 4;

        };
        
        
        
        const addFace = (

    face,
    worldX,
    y,
    worldZ,
    top,
    side,
    bottom

) => {

    

    const nx = worldX + face.check[0];
    const ny = y + face.check[1];
    const nz = worldZ + face.check[2];

    if(world.getBlock(nx, ny, nz) !== 0)
        return;

    let tex;

switch(face.texture){

    case "top":

        tex = top;
        break;

    case "bottom":

        tex = bottom;
        break;

    default:

        tex = side;

}

const verts = face.verts(
    worldX,
    y,
    worldZ
);

    addQuad(

    verts[0],
    verts[1],
    verts[2],
    verts[3],

    face.normal,

    tex[0],
    tex[1],

    face.rotation ?? 0

);

};

        for(let x=0;x<chunk.size;x++){

            for(let y=0;y<chunk.height;y++){

                for(let z=0;z<chunk.size;z++){

                    const id = chunk.getBlock(x,y,z);

                    if(id===0)
                        continue;

                    const worldX =
                        chunk.x * chunk.size + x;

                    const worldZ =
                        chunk.z * chunk.size + z;

                    //--------------------------------------------------
                    // TEXTURE SELECTION
                    //--------------------------------------------------

                    
                   const block = BlockData[id];


if (!block) continue;


const top =
    block.top ?? block.all;

const side =
    block.side ?? block.all;

const bottom =
    block.bottom ?? block.all;

                    // =============================
                    // PART 2 STARTS HERE
                    // =============================
                                        // ----------------------------
                    // TOP
                    // ----------------------------

                    for (const face of FACES) {

    addFace(

        face,

        worldX,

        y,

        worldZ,

        top,

        side,

        bottom

    );

}

                }

            }

        }

                const geometry = new THREE.BufferGeometry();

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(

                vertices,
                3

            )

        );

        geometry.setAttribute(

            "normal",

            new THREE.Float32BufferAttribute(

                normals,
                3

            )

        );

        geometry.setAttribute(

            "uv",

            new THREE.Float32BufferAttribute(

                uvs,
                2

            )

        );

        geometry.setIndex(indices);

        geometry.computeBoundingSphere();

        geometry.computeVertexNormals();

        const mesh = new THREE.Mesh(

            geometry,

            this.material

        );

        mesh.frustumCulled = true;

        return mesh;

    }

}
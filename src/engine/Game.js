import { Renderer } from "./renderer.js";
import { MeshBuilder } from "./MeshBuilder.js";

import { World } from "../world/World.js";
import { ChunkManager } from "../world/ChunkManager.js";

import { Player } from "../player/Player.js";
import { Controls } from "../player/Controls.js";
import { Physics } from "../player/Physics.js";
import { BlockInteraction } from "./BlockInteraction.js";
import { Hotbar } from "../player/Hotbar.js";

export class Game {

    constructor() {

        

        this.renderer = new Renderer();

        this.world = new World();

        this.hotbar = new Hotbar();

        // Pass the SCENE, not the texture
        this.meshBuilder = new MeshBuilder(
            this.renderer.scene
        );

        this.player = new Player(
            this.renderer.camera
        );

        this.controls = new Controls(
            this.renderer.camera,
            this.renderer.renderer
        );

        this.physics = new Physics(
            this.player,
            this.controls,
            this.world
        );

        this.chunkManager = new ChunkManager(
            this.world,
            this.meshBuilder

            
        );
        
        this.blockInteraction = new BlockInteraction(
    this.renderer.camera,
    this.world,
    this.chunkManager,
    this.renderer.scene,
    this.hotbar
);
       this.mouseDown = false;


window.addEventListener(
    "mousedown",
    (e)=>{

        if(e.button === 0){

            this.mouseDown = true;

        }

    }
);


window.addEventListener(
    "mouseup",
    (e)=>{

        if(e.button === 0){

            this.mouseDown = false;

        }

    }
);

this.mouseDown = false;


window.addEventListener(
    "mousedown",
    (e)=>{

        if(e.button === 0){

            this.mouseDown = true;

        }

    }
);


window.addEventListener(
    "mouseup",
    (e)=>{

        if(e.button === 0){

            this.mouseDown = false;

        }

    }
);

      const spawnX = 8;
const spawnZ = 20;

const chunkX = Math.floor(spawnX / 16);
const chunkZ = Math.floor(spawnZ / 16);

// Make sure the spawn chunk exists
const chunk = this.world.getOrCreateChunk(
    chunkX,
    chunkZ
);

// Ask the chunk for the highest block
const ground = chunk.getBlockHeight(
    spawnX,
    spawnZ
);

this.player.camera.position.set(

    spawnX,

    ground + 2,

    spawnZ

);

        this.lastTime = performance.now();

        window.addEventListener(
    "mousedown",
    (e)=>{

        if(e.button === 2){

            this.blockInteraction.placeBlock();

        }

    }
);

window.addEventListener(
    "contextmenu",
    (e)=>{

        e.preventDefault();

    }
);



    }

    update(delta) {

        this.player.update(delta);

        this.physics.update(delta);

        this.chunkManager.update(this.player);

        this.blockInteraction.updateBreaking(
    delta,
    this.mouseDown
);

    }

    start() {

    const loop = (time) => {

        requestAnimationFrame(loop);


        const delta = Math.min(
            (time - this.lastTime) / 1000,
            0.05
        );


        this.lastTime = time;


        this.update(delta);


        const target = this.blockInteraction.getTarget();

        if(target){

            console.clear();

            console.log(
                "Looking at:",
                target.x,
                target.y,
                target.z
            );

        }


        this.renderer.render();

    };


    requestAnimationFrame(loop);

}

}
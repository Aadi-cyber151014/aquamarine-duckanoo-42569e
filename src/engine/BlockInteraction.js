import * as THREE from "three";
import { BlockData } from "../world/BlockData.js";


export class BlockInteraction {


   constructor(camera, world, chunkManager, scene, hotbar){

    this.camera = camera;
    this.world = world;
    this.chunkManager = chunkManager;
    this.scene = scene;
    this.hotbar = hotbar;

    this.raycaster = new THREE.Raycaster();

    this.range = 4.5;

    this.breakProgress = 0;
    this.breakTarget = null;

    this.crackMesh = null;

}



    getTarget(){

        this.raycaster.setFromCamera(
            new THREE.Vector2(0,0),
            this.camera
        );


        const direction =
            this.raycaster.ray.direction.clone();


        const origin =
            this.raycaster.ray.origin.clone();


        let previous = origin.clone();



        for(
            let d = 0;
            d <= this.range;
            d += 0.05
        ){

            const p =
                origin.clone().add(
                    direction.clone()
                    .multiplyScalar(d)
                );


            const x = Math.floor(p.x);
            const y = Math.floor(p.y);
            const z = Math.floor(p.z);



            if(
                this.world.getBlock(
                    x,y,z
                ) !== 0
            ){

                return {

                    x:x,
                    y:y,
                    z:z,

                    place:{
                        x:Math.floor(previous.x),
                        y:Math.floor(previous.y),
                        z:Math.floor(previous.z)
                    }

                };

            }


            previous.copy(p);

        }


        return null;

    }




    updateBreaking(delta, mouseDown){


        const target = this.getTarget();



        if(!mouseDown || !target){

    this.breakProgress = 0;
    this.breakTarget = null;


    if(this.crackMesh){

        this.scene.remove(
            this.crackMesh
        );

        this.crackMesh = null;

    }


    return;

}



        if(
            !this.breakTarget ||
            this.breakTarget.x !== target.x ||
            this.breakTarget.y !== target.y ||
            this.breakTarget.z !== target.z
        ){

            this.breakProgress = 0;

            this.breakTarget = target;

        }



        const block =
            this.world.getBlock(
                target.x,
                target.y,
                target.z
            );



        const hardness =
            BlockData[block].hardness;



        this.breakProgress += delta;
        this.showCrack(target);



        if(
            this.breakProgress >= hardness
        ){


            this.world.setBlock(

                target.x,
                target.y,
                target.z,
                0

            );



            this.chunkManager.rebuildChunk(

                Math.floor(
                    target.x /
                    this.world.chunkSize
                ),

                Math.floor(
                    target.z /
                    this.world.chunkSize
                )

            );



            this.breakProgress = 0;

            this.breakTarget = null;
            if(this.crackMesh){

    this.scene.remove(
        this.crackMesh
    );

    this.crackMesh = null;

}
            

        }
        


    }

    showCrack(target){


    if(!this.crackMesh){


        const geometry =
            new THREE.BoxGeometry(
                1.01,
                1.01,
                1.01
            );


        const material =
            new THREE.MeshBasicMaterial({

                color:0x000000,

                transparent:true,

                opacity:0.2

            });


        this.crackMesh =
            new THREE.Mesh(
                geometry,
                material
            );


        this.scene.add(
            this.crackMesh
        );

    }


    this.crackMesh.position.set(

        target.x + 0.5,
        target.y + 0.5,
        target.z + 0.5

    );


    this.crackMesh.material.opacity =
        Math.min(
            this.breakProgress * 2,
            0.8
        );


}

placeBlock(){

    const target = this.getTarget();

    if(!target) return;


    const x = target.place.x;
    const y = target.place.y;
    const z = target.place.z;


    // Don't place inside player
    const playerPos = this.camera.position;


    if(
        Math.abs(playerPos.x - (x + 0.5)) < 0.8 &&
        Math.abs(playerPos.y - (y + 0.5)) < 1.8 &&
        Math.abs(playerPos.z - (z + 0.5)) < 0.8
    ){

        return;

    }


    // Place dirt for now
    this.world.setBlock(
    x,
    y,
    z,
    this.hotbar.getBlock()
);


    this.chunkManager.rebuildChunk(

        Math.floor(
            x / this.world.chunkSize
        ),

        Math.floor(
            z / this.world.chunkSize
        )

    );

}



}
import { Chunk } from "./Chunk.js";


export class World {


    constructor(){


        this.chunks=new Map();


        this.chunkSize=16;


    }





    chunkKey(x,z){

        return `${x},${z}`;

    }






    createChunk(chunkX,chunkZ){


        const chunk =
        new Chunk(
            chunkX,
            chunkZ,
            this.chunkSize
        );


        chunk.generate();


        this.chunks.set(
            this.chunkKey(chunkX,chunkZ),
            chunk
        );


        return chunk;


    }







    getChunk(x,z){


        return this.chunks.get(
            this.chunkKey(x,z)
        );


    }







    getBlock(x,y,z){



        const chunkX =
        Math.floor(
            x / this.chunkSize
        );



        const chunkZ =
        Math.floor(
            z / this.chunkSize
        );



        const chunk =
        this.getChunk(
            chunkX,
            chunkZ
        );



        // unloaded chunk = air

        if(!chunk){

            return 0;

        }




        const localX =
        x -
        chunkX*this.chunkSize;



        const localZ =
        z -
        chunkZ*this.chunkSize;





        return chunk.getBlock(
            localX,
            y,
            localZ
        );



    }

getOrCreateChunk(chunkX, chunkZ) {

    let chunk = this.getChunk(chunkX, chunkZ);

    if (!chunk) {

        chunk = this.createChunk(chunkX, chunkZ);

    }

    return chunk;

}






    setBlock(x,y,z,id){



        const chunkX =
        Math.floor(
            x / this.chunkSize
        );



        const chunkZ =
        Math.floor(
            z / this.chunkSize
        );



        const chunk =
        this.getChunk(
            chunkX,
            chunkZ
        );



        if(!chunk)
            return;




        const localX =
        x -
        chunkX*this.chunkSize;



        const localZ =
        z -
        chunkZ*this.chunkSize;




        chunk.setBlock(
            localX,
            y,
            localZ,
            id
        );



    }



}
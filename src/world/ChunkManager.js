export class ChunkManager {

    constructor(world, meshBuilder) {

        this.world = world;
        this.meshBuilder = meshBuilder;

        this.renderDistance = 2;

        this.loadedChunks = new Map();

    }

    chunkKey(chunkX, chunkZ) {

        return `${chunkX},${chunkZ}`;

    }

    update(player) {

        const chunkX = Math.floor(
            player.camera.position.x / this.world.chunkSize
        );

        const chunkZ = Math.floor(
            player.camera.position.z / this.world.chunkSize
        );

        // Load nearby chunks
        for (
            let x = chunkX - this.renderDistance;
            x <= chunkX + this.renderDistance;
            x++
        ) {

            for (
                let z = chunkZ - this.renderDistance;
                z <= chunkZ + this.renderDistance;
                z++
            ) {

                const key = this.chunkKey(x, z);

                if (this.loadedChunks.has(key))
                    continue;

                let chunk =
                    this.world.getChunk(x, z);

                if (!chunk) {

                    chunk =
                        this.world.createChunk(x, z);

                }

                const mesh =
                    this.meshBuilder.build(
                        chunk,
                        this.world
                    );

                // ***** THIS WAS MISSING *****
                this.meshBuilder.scene.add(mesh);

                this.loadedChunks.set(
                    key,
                    mesh
                );

            }

        }

        // Unload distant chunks
        for (const [key, mesh] of this.loadedChunks) {

            const [x, z] =
                key.split(",").map(Number);

            if (
                Math.abs(x - chunkX) > this.renderDistance ||
                Math.abs(z - chunkZ) > this.renderDistance
            ) {

                this.meshBuilder.scene.remove(mesh);

                mesh.geometry.dispose();

                if (mesh.material.map)
                    mesh.material.map.dispose();

                mesh.material.dispose();

                this.loadedChunks.delete(key);

            }

        }

    }

    rebuildChunk(chunkX, chunkZ){

    const key = this.chunkKey(
        chunkX,
        chunkZ
    );


    const oldMesh = this.loadedChunks.get(key);


    // Remove old mesh
    if(oldMesh){

        this.meshBuilder.scene.remove(oldMesh);

        oldMesh.geometry.dispose();

        if(oldMesh.material.map)
            oldMesh.material.map.dispose();

        oldMesh.material.dispose();

    }


    const chunk = this.world.getChunk(
        chunkX,
        chunkZ
    );


    if(!chunk) return;


    // Build new mesh
    const newMesh =
        this.meshBuilder.build(
            chunk,
            this.world
        );


    // Add to scene
    this.meshBuilder.scene.add(newMesh);


    // Replace old mesh
    this.loadedChunks.set(
        key,
        newMesh
    );

}

}
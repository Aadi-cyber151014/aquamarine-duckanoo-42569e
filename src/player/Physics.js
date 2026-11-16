import * as THREE from "three";

export class Physics {

    constructor(player, controls, world) {

        this.player = player;
        this.controls = controls;
        this.world = world;

        this.gravity = 35;
        this.jumpVelocity = 8.0;

        this.height = 1.8;

    }

    isSolid(x, y, z) {

        return this.world.getBlock(
            Math.floor(x),
            Math.floor(y),
            Math.floor(z)
        ) !== 0;

    }

    update(delta) {

        const camera = this.player.camera;

        // Jump
        if (
            this.player.keys["Space"] &&
            this.player.onGround
        ) {

            this.player.velocity.y = this.jumpVelocity;
            this.player.onGround = false;

        }

        // Gravity
        this.player.velocity.y -= this.gravity * delta;

        // ------------------------
        // Movement
        // ------------------------

        const move = new THREE.Vector3(
            this.player.velocity.x,
            0,
            this.player.velocity.z
        );

        // Rotate movement using camera rotation
        move.applyQuaternion(camera.quaternion);

        move.y = 0;

        if (move.lengthSq() > 0) {
            move.normalize().multiplyScalar(
                Math.sqrt(
                    this.player.velocity.x ** 2 +
                    this.player.velocity.z ** 2
                )
            );
        }

        // X
        let nextX =
            camera.position.x +
            move.x * delta;

        if (
            !this.isSolid(
                nextX,
                camera.position.y - 0.1,
                camera.position.z
            ) &&
            !this.isSolid(
                nextX,
                camera.position.y - 1,
                camera.position.z
            )
        ) {

            camera.position.x = nextX;

        }

        // Z
        let nextZ =
            camera.position.z +
            move.z * delta;

        if (
            !this.isSolid(
                camera.position.x,
                camera.position.y - 0.1,
                nextZ
            ) &&
            !this.isSolid(
                camera.position.x,
                camera.position.y - 1,
                nextZ
            )
        ) {

            camera.position.z = nextZ;

        }

        // Vertical
        let nextY =
            camera.position.y +
            this.player.velocity.y * delta;

        if (this.player.velocity.y <= 0) {

            const feet =
                nextY - this.height;

            if (
                this.isSolid(
                    camera.position.x,
                    feet,
                    camera.position.z
                )
            ) {

                camera.position.y =
                    Math.floor(feet) +
                    1 +
                    this.height;

                this.player.velocity.y = 0;
                this.player.onGround = true;

            } else {

                camera.position.y = nextY;
                this.player.onGround = false;

            }

        } else {

            if (
                this.isSolid(
                    camera.position.x,
                    nextY,
                    camera.position.z
                )
            ) {

                this.player.velocity.y = 0;

            } else {

                camera.position.y = nextY;

            }

        }

    }

}
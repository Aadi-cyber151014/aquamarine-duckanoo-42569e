import * as THREE from "three";

export class Player {

    constructor(camera) {

        this.camera = camera;

        this.keys = {};

        this.velocity = new THREE.Vector3();

        this.direction = new THREE.Vector3();

        this.speed = 6;
        this.sprintSpeed = 10;

        this.onGround = false;

        window.addEventListener("keydown", (e) => {

            this.keys[e.code] = true;

        });

        window.addEventListener("keyup", (e) => {

            this.keys[e.code] = false;

        });

    }

    update(delta) {

        this.direction.set(0, 0, 0);

        if (this.keys["KeyW"]) this.direction.z -= 1;
        if (this.keys["KeyS"]) this.direction.z += 1;
        if (this.keys["KeyA"]) this.direction.x -= 1;
        if (this.keys["KeyD"]) this.direction.x += 1;

        if (this.direction.length() > 0) {

            this.direction.normalize();

        }

        const speed = this.keys["ShiftLeft"]

            ? this.sprintSpeed

            : this.speed;

        this.velocity.x = this.direction.x * speed;
        this.velocity.z = this.direction.z * speed;

    }

}
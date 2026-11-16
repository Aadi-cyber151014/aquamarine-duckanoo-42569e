import * as THREE from "three";

export class Renderer {

    constructor() {

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x87CEEB);

        this.camera = new THREE.PerspectiveCamera(

            75,

            window.innerWidth / window.innerHeight,

            0.1,

            1000

        );

      

        this.camera.lookAt(

            0,

            0,

            0

        );

        this.renderer = new THREE.WebGLRenderer({

            antialias: true

        });

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        document
            .getElementById("game")
            .appendChild(this.renderer.domElement);

        const ambient = new THREE.AmbientLight(

            0xffffff,

            0.8

        );

        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(

            0xffffff,

            1

        );

        sun.position.set(

            30,

            40,

            20

        );

        this.scene.add(sun);

        window.addEventListener(

            "resize",

            () => {

                this.camera.aspect =
                    window.innerWidth /
                    window.innerHeight;

                this.camera.updateProjectionMatrix();

                this.renderer.setSize(

                    window.innerWidth,

                    window.innerHeight

                );

            }

        );

    }

    render() {

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

}
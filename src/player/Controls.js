import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

export class Controls{

    constructor(camera,renderer){

        this.controls=new PointerLockControls(

            camera,

            renderer.domElement

        );

        document.addEventListener("click",()=>{

            this.controls.lock();

        });

    }

    getDirection(){

        return this.controls;

    }

}
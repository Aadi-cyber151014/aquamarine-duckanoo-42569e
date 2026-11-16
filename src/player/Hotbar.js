import { BlockData } from "../world/BlockData.js";

export class Hotbar{

    constructor(){

        this.selected = 1;

        this.blocks = [
            1,2,3,4,5,6,7,8,9
        ];

        this.container =
            document.getElementById("hotbar");

        this.build();

        window.addEventListener(
            "keydown",
            (e)=>{

                const n = Number(e.key);

                if(
                    n>=1 &&
                    n<=9
                ){

                    this.selected=n;

                    this.update();

                }

            }
        );

        window.addEventListener(
    "wheel",
    (e)=>{

        if(e.deltaY > 0){

            this.selected++;

        }else{

            this.selected--;

        }


        if(this.selected > this.blocks.length)
            this.selected = 1;

        if(this.selected < 1)
            this.selected = this.blocks.length;


        this.update();

    },
    { passive: true }
);

    }

    build(){

        this.container.innerHTML="";

        this.selector = document.createElement("div");

this.selector.id = "selector";

this.container.appendChild(this.selector);

        for(let i=0;i<9;i++){

            const slot =
                document.createElement("div");

            slot.className="slot";

            if(i===0)
                slot.classList.add("selected");


            const icon =
                document.createElement("div");

            icon.className="icon";

            const block =
                BlockData[
                    this.blocks[i]
                ];

            const tx =
                block.icon[0];

            const ty =
                block.icon[1];

            icon.style.backgroundPosition=
                `${-tx*32}px ${-ty*32}px`;

            slot.appendChild(icon);

            this.container.appendChild(slot);

        }

    }

    update(){

    const slots =
        document.querySelectorAll(".slot");

    slots.forEach(
        s=>s.classList.remove("selected")
    );

    const slot =
        slots[this.selected-1];

    slot.classList.add("selected");

    this.selector.style.left = `${slot.offsetLeft}px`;
this.selector.style.top = "-3px";

}

    getBlock(){

    return this.blocks[
        this.selected - 1
    ];

}

}
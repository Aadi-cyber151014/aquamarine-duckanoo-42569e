export const Blocks = {

    AIR: 0,

    GRASS: 1,

    DIRT: 2,

    STONE: 3,

    LOG: 4,

    LEAVES: 5,

    PLANKS: 6,

    SAND: 7,

    GLASS: 8,

    WATER: 9

};

export const BlockData = {

    [Blocks.GRASS]: {

        top: [0,0],
        side: [1,0],
        bottom: [2,0],

        hardness: 0.6,

        solid: true

    },

    [Blocks.DIRT]: {

        all: [2,0],

        hardness: 0.5,

        solid: true

    },

    [Blocks.STONE]: {

        all: [3,0],

        hardness: 1.5,

        solid: true

    },

    [Blocks.LOG]: {

        top: [0,1],
        bottom: [0,1],
        side: [1,1],

        hardness: 2.0,

        solid: true

    },

    [Blocks.LEAVES]: {

        all: [3,1],

        hardness: 0.2,

        solid: true

    },

    [Blocks.PLANKS]: {

        all: [2,1],

        hardness: 2.0,

        solid: true

    },

    [Blocks.SAND]: {

        all: [0,2],

        hardness: 0.5,

        solid: true

    },

    [Blocks.GLASS]: {

        all: [1,2],

        hardness: 0.3,

        solid: true

    },

    [Blocks.WATER]: {

        all: [2,2],

        hardness: Infinity,

        solid: false

    }

};
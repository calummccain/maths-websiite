// Order n cubic

import { rt2, rt3, p, p2, p_1 } from "./constants.js";
import { boundaries } from "./geometry-decider.js";

const cubeData = (n) => {

    const metric = boundaries(n, 4, 6);
    const cos = Math.cos(2 * Math.PI / n);
    const cot = 1 / (Math.tan(Math.PI / n) ** 2);

    // for n = 4: factor of 1/2 is arbitrary but scales shapes nicely
    const f = (v) => [
        Math.sqrt(cot) * v[0],
        Math.sqrt(Math.abs((1 - cot) / 2)) * v[1],
        Math.sqrt(Math.abs((1 - cot) / 2)) * v[2],
        Math.sqrt(Math.abs((1 - cot) / 2)) * v[3]
    ];

    return {

        vertices: [
            [1, 1, 1, 0], [1, 1, 0, 1], [1, 0, 1, 1],
            [1, 1, -1, 0], [1, -1, 0, 1], [1, 0, 1, -1],
            [1, -1, 1, 0], [1, 1, 0, -1], [1, 0, -1, 1],
            [1, -1, -1, 0], [1, -1, 0, -1], [1, 0, -1, -1]
        ],

        edges: [
            [0, 1], [1, 2], [2, 0],
            [0, 5], [5, 7], [7, 0],
            [3, 7], [7, 11], [11, 3],
            [1, 3], [3, 8], [8, 1],
            [4, 8], [8, 9], [9, 4],
            [4, 6], [6, 10], [10, 4],
            [5, 6], [6, 10], [10, 5],
            [9, 10], [10, 11], [11, 9]
        ],

        faces: [
            [0, 1, 2], [0, 5, 7], [3, 7, 11], [1, 3, 8],
            [4, 8, 9], [4, 6, 10], [5, 6, 10], [9, 10, 11],
            [0, 2, 6, 5], [1, 2, 4, 8], [0, 1, 3, 7],
            [3, 8, 9, 11], [5, 7, 11, 10], [4, 6, 10, 9]
        ],

        numVertices: 8,

        numEdges: 24,

        numFaces: 14,

        // numSides: 4,

        // CFE
        // (0, 0, 0, 1)
        a: (v) => [v[0], v[1], v[2], -v[3]],

        // CFV
        // (0, 0, 1, -1)
        b: (v) => [v[0], v[1], v[3], v[2]],

        // CEV
        // (0, 1, -1, 0)
        c: (v) => [v[0], v[2], v[1], v[3]],

        // FEV
        // (cot ** 2 - 1, 2 cot ** 2, 0, 0)
        d: d,

        // Identity matrix
        e: (v) => v,

        f: f,

        faceReflections: ["bc", "c", "cbabc", "abc", "", "babc"],

        outerReflection: "d",

        // (1, 1, 1, 1)
        V: [1, 1, 1, 1],

        // (1, 1, 1, 0)
        E: [1, 1, 1, 0],

        // (1, 1, 0, 0)
        F: [1, 1, 0, 0],

        // (1, 0, 0, 0)
        C: [1, 0, 0, 0],

        // 3 4 5 6 7
        // s e h d u
        metric: metric,

        cellType: "spherical"

    }

}

export { cubeData };
// Order n cubic

import { p } from "./constants.js";
import { boundaries } from "./geometry-decider.js";

const cubeData = (n) => {

    return {

        vertices: [
            [1, 1, 1, 1], [1, 1, -1, 1],
            [1, -1, -1, 1], [1, -1, 1, 1],
            [1, 1, 1, -1], [1, 1, -1, -1],
            [1, -1, -1, -1], [1, -1, 1, -1]
        ],

        edges: [
            [0, 3], [3, 2], [2, 1], [1, 0],
            [7, 4], [4, 5], [5, 6], [6, 7],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ],

        faces: [
            [0, 3, 2, 1], [4, 7, 3, 0], [7, 6, 2, 3],
            [7, 4, 5, 6], [0, 1, 5, 4], [1, 2, 6, 5]
        ],

        numVertices: 8,

        numEdges: 12,

        numFaces: 6,

        numSides: 4,

        // CFE
        // (0, 0, 0, 1)
        a: (v) => {

            return [v[0], v[1], v[2], -v[3]];

        },

        // CFV
        // (0, 0, 1, -1)
        b: (v) => {

            return [v[0], v[1], v[3], v[2]];

        },

        // CEV
        // (0, 1, -1, 0)
        c: (v) => {

            return [v[0], v[2], v[1], v[3]];

        },

        // FEV
        // (cot ** 2 - 1, 2 cot ** 2, 0, 0)
        d: (v) => {

            if (n == 3) {

                return [v[1], v[0], v[2], v[3]];

            } else if (n == 4) {

                return [v[0], 2 * v[0] - 1 * v[1], v[2], v[3]];

            } else if (n == 5) {

                return [p * v[0] - v[1] / p, p ** 2 * v[0] - p * v[1], v[2], v[3]];

            } else if (n == 6) {

                return [2 * v[0] - v[1], 3 * v[0] - 2 * v[1], v[2], v[3]];

            } else {

                var cos = Math.cos(2 * Math.PI / n);
                return [(1 + 2 * cos) * v[0] - 2 * cos * v[1], 2 * (1 + cos) * v[0] - (1 + 2 * cos) * v[1], v[2], v[3]];

            }

        },

        // Identity matrix
        e: (v) => {

            return [v[0], v[1], v[2], v[3]];

        },

        f: (v) => {

            if (n == 3) {

                return [v[0] / 2, v[1] / 2, v[2] / 2, v[3] / 2];

            } else if (n == 4) {

                // factor of 1/2 is arbitrary but scales shapes nicely

                return [v[0], v[1] / 2, v[2] / 2, v[3] / 2];

            } else if (n == 5) {

                return [(p ** 2) / Math.sqrt(2) * v[0], Math.sqrt(p / 2) * v[1], Math.sqrt(p / 2) * v[2], Math.sqrt(p / 2) * v[3]];

            } else if (n == 6) {

                return [Math.sqrt(3) * v[0], v[1], v[2], v[3]];

            } else {

                var cot = 1 / (Math.tan(Math.PI / n) ** 2);

                var a = Math.sqrt(Math.abs(2 * cot / (3 - cot)));
                var b = Math.sqrt(Math.abs((cot - 1) / (3 - cot)));

                return [a * v[0], b * v[1], b * v[2], b * v[3]];
            }

        },

        faceReflections: ['bc', 'c', 'cbabc', 'abc', '', 'babc'],

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
        metric: () => {

            return boundaries(n, 4, 6);

        },

        cellType: "spherical"

    }

}

export { cubeData };
// ========================================================
// Order n dodecahderal rectified r{5,3,n}
// 
// Inputs: n
// Output: data
//
// Change history:
//     ??/??/?? Initial commit
//     21/05/21 Constants tidy up
//              Look into uncompact
//     24/05/21 Renamed
//     31/05/21 Added v-v distance
//     16/06/21 Corrected v-v distance for paracompact
//              added metrics for e and p
//=========================================================

import { p, p2, p3, p4, p5, p_1, p_2, p_3, p_4 } from "./constants.js";
import { boundaries } from "./geometry-decider.js";

const dodecahedronRectData = (n) => {

    const metric = boundaries(n, Math.PI / Math.atan(p), Infinity);
    const cos = Math.cos(Math.PI / n) ** 2;
    const rt = Math.sqrt(5);
    const cot = cos / (1 - cos);

    const d =
        (n == 3) ? (v) => [
            (p * v[0] + v[1] * p_3 + v[3] * p_4) / 2,
            (p3 * v[0] - v[1] * p_1 - p * v[3]) / 2,
            v[2],
            (p2 * v[0] - p * v[1] + v[3]) / 2
        ] : (n == 4) ? (v) => [
            p2 * v[0] - v[1] - v[3] * p_1,
            p3 * v[0] - p * v[1] - p * v[3],
            v[2],
            p2 * v[0] - p * v[1]
        ] : (n == 5) ? (v) => [
            ((4 * p + 1) * v[0] - (4 * p - 1) * p_1 * v[1] - (4 * p - 1) * p_2 * v[3]) / 2,
            (p5 * v[0] + (2 - p4) * v[1] - p3 * v[3]) / 2,
            v[2],
            (p4 * v[0] - p3 * v[1] - v[3] * p_1) / 2
        ] : (n == 6) ? (v) => [
            ((2 + p4) * v[0] - p3 * v[1] - p2 * v[3]) / 2,
            (3 * p3 * v[0] + (2 - 3 * p2) * v[1] - 3 * p * v[3]) / 2,
            v[2],
            (3 * p2 * v[0] - 3 * p * v[1] - v[3]) / 2
        ] : (v) => [
            (2 * p * rt * cos - 1) * v[0] - (2 * rt * cos - 2 * p_1) * v[1] - (2 * rt * cos * p_1 - 2 * p_2) * v[3],
            2 * p3 * cos * v[0] + (1 - 2 * p2 * cos) * v[1] - 2 * p * cos * v[3],
            v[2],
            2 * p2 * cos * v[0] - 2 * p * cos * v[1] + (1 - 2 * cos) * v[3]
        ];

    const f =
        (metric === "e") ? (v) => [
            v[0],
            v[1],
            v[2],
            v[3]
        ] : (v) => [
            p * Math.sqrt(Math.abs(cot)) * v[0],
            Math.sqrt(Math.abs(cot - p_2)) * v[1],
            Math.sqrt(Math.abs(cot - p_2)) * v[2],
            Math.sqrt(Math.abs(cot - p_2)) * v[3]
        ];

    return {

        vertices: [
            [1, p / 2, 1 / 2, p2 / 2], [1, p / 2, -1 / 2, p2 / 2], [1, p2 / 2, -p / 2, 1 / 2], [1, p, 0, 0], [1, p2 / 2, p / 2, 1 / 2],
            [1, 0, 0, p], [1, 1 / 2, -p2 / 2, p / 2], [1, p2 / 2, -p / 2, -1 / 2], [1, p2 / 2, p / 2, -1 / 2], [1, 1 / 2, p2 / 2, p / 2],
            [1, -p / 2, -1 / 2, p2 / 2], [1, -1 / 2, -p2 / 2, p / 2], [1, 0, -p, 0], [1, 1 / 2, -p2 / 2, -p / 2], [1, p / 2, -1 / 2, -p2 / 2],
            [1, p / 2, 1 / 2, -p2 / 2], [1, 1 / 2, p2 / 2, -p / 2], [1, 0, p, 0], [1, -1 / 2, p2 / 2, p / 2], [1, -p / 2, 1 / 2, p2 / 2],
            [1, -p2 / 2, -p / 2, 1 / 2], [1, -1 / 2, -p2 / 2, -p / 2], [1, 0, 0, -p], [1, -1 / 2, p2 / 2, -p / 2], [1, -p2 / 2, p / 2, 1 / 2],
            [1, -p2 / 2, -p / 2, -1 / 2], [1, -p / 2, -1 / 2, -p2 / 2], [1, -p / 2, 1 / 2, -p2 / 2], [1, -p2 / 2, p / 2, -1 / 2], [1, -p, 0, 0]
        ],

        edges: [
            [0, 1], [0, 4], [0, 5], [0, 9],
            [1, 5], [1, 2], [1, 6],
            [2, 6], [2, 7], [2, 3],
            [3, 7], [3, 8], [3, 4],
            [4, 8], [4, 9],
            [5, 10], [5, 19],
            [6, 11], [6, 12],
            [7, 13], [7, 14],
            [8, 15], [8, 16],
            [9, 17], [9, 18],
            [10, 11], [10, 20], [10, 19],
            [11, 20], [11, 12],
            [12, 13], [12, 21],
            [13, 21], [13, 14],
            [14, 15], [14, 22],
            [15, 16], [15, 22],
            [16, 17], [16, 23],
            [17, 18], [17, 23],
            [18, 19], [18, 24],
            [19, 24],
            [20, 29], [20, 25],
            [21, 25], [21, 26],
            [22, 26], [22, 27],
            [23, 27], [23, 28],
            [24, 28], [24, 29],
            [25, 26],
            [26, 27],
            [27, 28],
            [28, 29],
            [29, 25]
        ],

        faces: [
            [0, 1, 2, 3, 4], [0, 5, 19, 18, 9], [1, 6, 11, 10, 5], [2, 7, 13, 12, 6],
            [3, 8, 15, 14, 7], [4, 9, 17, 16, 8], [11, 12, 21, 25, 20], [13, 14, 22, 26, 21],
            [15, 16, 23, 27, 22], [17, 18, 24, 28, 23], [19, 10, 20, 29, 24], [25, 26, 27, 28, 29],
            [0, 1, 5], [1, 2, 6], [2, 3, 7], [3, 4, 8], [4, 0, 9],
            [5, 10, 19], [6, 11, 12], [7, 13, 14], [8, 15, 16], [9, 17, 18],
            [10, 11, 20], [12, 13, 21], [14, 15, 22], [16, 17, 23], [18, 19, 24],
            [20, 25, 29], [21, 25, 26], [22, 26, 27], [23, 27, 28], [24, 28, 29]
        ],

        numVertices: 30,

        numEdges: 60,

        numFaces: 32,

        // CFE
        // (0, 0, 1, 0)
        a: (v) => [v[0], v[1], -v[2], v[3]],
        // CFV
        // (0, 1, -p ** 2, p)
        b: (v) => [v[0], (p * v[1] + v[2] + v[3] * p_1) / 2, (v[1] - v[2] * p_1 - p * v[3]) / 2, (v[1] * p_1 - p * v[2] + v[3]) / 2],

        // CEV
        // (0, 0, 0, 1)
        c: (v) => [v[0], v[1], v[2], -v[3]],

        // FEV
        // ?????
        d: d,

        e: (v) => v,

        f: f,

        faceReflections: [""],

        outerReflection: "d",

        // (1, p, 1 / p, 0)
        V: [1, p, p_1, 0],

        // (1, p, 0, 0)
        E: [1, p, 0, 0],

        // (3 - p, p, 0, 1)
        F: [3 - p, p, 0, 1],

        // (1, 0, 0, 0)
        C: [1, 0, 0, 0],

        // 3 4 5 6 7
        // s h h p u
        metric: metric,

        cellType: "spherical",

        vv: cot / 2 + p / 2,

        metricValues: {
            'e': Math.PI / Math.atan(p),
            'p': Infinity
        }

    }

}

export { dodecahedronRectData };
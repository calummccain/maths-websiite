// order n icosahedral

import { p } from "./constants.js";
import { boundaries } from "./geometry-decider.js";

const icosahedronData = (n) => {

    const metric = boundaries(n, Math.PI / Math.atan(p ** 2), 10 / 3);

    const cos = Math.cos(Math.PI / n) ** 2;
    const cot = 1 / (Math.tan(Math.PI / n) ** 2);

    const d =
        (n == 3) ? (v) => [
            ((p ** 4 - 1) * v[0] - ((p ** 4) - 3) / p * v[2] - ((p ** 4) - 3) / (p ** 3) * v[3]) / 2,
            v[1],
            ((p ** 5) * v[0] + (2 - (p ** 4)) * v[2] - p ** 2 * v[3]) / 2,
            ((p ** 3) * v[0] - (p ** 2) * v[2] + v[3]) / 2
        ] : (v) => [
            (6 * (p ** 2) * cos - 1) * v[0] + (2 / p - 6 * p * cos) * v[2] + (2 / (p ** 3) - 6 * cos / p) * v[3],
            v[1],
            2 * (p ** 5) * cos * v[0] + (1 - 2 * (p ** 4) * cos) * v[2] - 2 * (p ** 2) * cos * v[3],
            2 * (p ** 3) * cos * v[0] - 2 * (p ** 2) * cos * v[2] + (1 - 2 * cos) * v[3]
        ];

    const f =
        (n == 3) ? (v) => [
            ((p ** 3) / 2) * v[0],
            (Math.sqrt(3 * p - 1) / 2) * v[1],
            (Math.sqrt(3 * p - 1) / 2) * v[2],
            (Math.sqrt(3 * p - 1) / 2) * v[3]
        ] : (v) => [
            (p ** 3) * Math.sqrt(cot / ((p ** 4) * cot - 1 - (p ** 2))) * v[0],
            Math.sqrt(((p ** 4) * cot - 1) / ((p ** 4) * cot - 1 - (p ** 2))) * v[1],
            Math.sqrt(((p ** 4) * cot - 1) / ((p ** 4) * cot - 1 - (p ** 2))) * v[2],
            Math.sqrt(((p ** 4) * cot - 1) / ((p ** 4) * cot - 1 - (p ** 2))) * v[3]
        ];

    return {

        vertices: [
            [1, 1, p, 0], [1, 1, -p, 0], [1, -1, p, 0],
            [1, -1, -p, 0], [1, p, 0, 1], [1, -p, 0, 1],
            [1, p, 0, -1], [1, -p, 0, -1], [1, 0, 1, p],
            [1, 0, 1, -p], [1, 0, -1, p], [1, 0, -1, -p]
        ],

        edges: [
            [0, 2], [0, 4], [0, 6], [0, 8],
            [0, 9], [1, 3], [1, 4], [1, 6],
            [1, 10], [1, 11], [2, 5], [2, 7],
            [2, 8], [2, 9], [3, 5], [3, 7],
            [3, 10], [3, 11], [4, 6], [4, 8],
            [4, 10], [5, 7], [5, 8], [5, 10],
            [6, 9], [6, 11], [7, 9], [7, 11],
            [8, 10], [9, 11]
        ],

        faces: [
            [0, 8, 2], [0, 2, 9], [0, 6, 4], [0, 4, 8],
            [0, 9, 6], [1, 3, 10], [1, 11, 3], [1, 4, 6],
            [1, 10, 4], [1, 6, 11], [2, 5, 7], [2, 8, 5],
            [2, 7, 9], [3, 7, 5], [3, 5, 10], [3, 11, 7],
            [4, 10, 8], [5, 8, 10], [6, 9, 11], [7, 11, 9]
        ],

        numVertices: 12,

        numEdges: 30,

        numFaces: 20,

        numSides: 3,

        // CFE
        // (0, 1, 0, 0)
        a: (v) => [v[0], -v[1], v[2], v[3]],

        // CFV
        // (0, p, -1, 1 / p)
        b: (v) => [v[0], (v[1] + v[2] / p - p * v[3]) / 2, (v[1] / p + p * v[2] + v[3]) / 2, (-p * v[1] + v[2] - v[3] / p) / 2],

        // CEV
        // (0, 0, 0, 1)
        c: (v) => [v[0], v[1], v[2], -v[3]],

        // FEV
        // (p cot ** 2 - 1 / p ** 3, 0, p ** 2, 1)
        d: d,

        // Identity matrix
        e: (v) => v,

        f: f,

        faceReflections: [
            "", "c", "bcbc", "bc", "cbc", "bacbcabacbc",
            "cbacbcabacbc", "bacabacbc", "bcabacbc",
            "cbcabacbc", "abcbc", "abc", "acbc",
            "abacabacbc", "abcabacbc", "bacaacbcabacbcbcbaca",
            "bacbc", "abacbc", "acabacbc", "cabacbc"
        ],

        outerReflection: "d",

        // (1, 1, p, 0)
        V: [1, 1, p, 0],

        // (1, 0, p, 0)
        E: [1, 0, p, 0],

        // (3, 0, p ** 3, p)
        F: [3, 0, p ** 3, p],

        // (1, 0, 0, 0)
        C: [1, 0, 0, 0],

        // 3 4 5 6 7
        // h u u u u
        metric: metric,

        cellType: "spherical"

    }

}

export { icosahedronData };
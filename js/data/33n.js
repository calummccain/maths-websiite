// Order n tetrahedral

import { boundaries } from "./geometry-decider.js";

const tetrahedronData = (n) => {

    const metric = boundaries(n, Math.PI / Math.atan(1 / Math.sqrt(2)), 6);
    const cos = Math.cos(Math.PI / n) ** 2;
    const sin = Math.sin(Math.PI / n) ** 2;
    const cot = cos / sin;
    const cos5 = (3 + Math.sqrt(5)) / 8;
    const sin5 = (5 - Math.sqrt(5)) / 8;

    const f =
        (n == 3) ? (v) => [
            v[0] / 4,
            Math.sqrt(5) * v[1] / 4,
            Math.sqrt(5) * v[2] / 4,
            Math.sqrt(5) * v[3] / 4
        ] : (n == 4) ? (v) => [
            v[0] / 2,
            v[1] / 2,
            v[2] / 2,
            v[3] / 2
        ] : (n == 5) ? (v) => [
            Math.sqrt(7 + 3 * Math.sqrt(3)) * v[0] / 4,
            Math.sqrt(3 - Math.sqrt(3)) * v[1] / 4,
            Math.sqrt(3 - Math.sqrt(3)) * v[2] / 4,
            Math.sqrt(3 - Math.sqrt(3)) * v[3] / 4
        ] : (n == 6) ? (v) => [
            Math.sqrt(3) * v[0],
            v[1],
            v[2],
            v[3]
        ] : (v) => [
            Math.sqrt(Math.abs(cot / (2 * (3 - cot)))) * v[0],
            Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot)))) * v[1],
            Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot)))) * v[2],
            Math.sqrt(Math.abs((cot - 2) / (2 * (3 - cot)))) * v[3]
        ];

    const d =
        (n == 3) ? (v) => [
            (-v[0] + 5 * v[1] + 5 * v[2] - 5 * v[3]) / 4,
            (v[0] + 3 * v[1] - v[2] + v[3]) / 4,
            (v[0] - v[1] + 3 * v[2] + v[3]) / 4,
            (-v[0] + v[1] + v[2] + 3 * v[3]) / 4
        ] : (n == 4) ? (v) => [
            (v[0] + v[1] + v[2] - v[3]) / 2,
            (v[0] + v[1] - v[2] + v[3]) / 2,
            (v[0] - v[1] + v[2] + v[3]) / 2,
            (-v[0] + v[1] + v[2] + v[3]) / 2
        ] : (n == 5) ? (v) => [
            (2 - 3 * sin5) * v[0] + (3 * sin5 - 1) * v[1] + (3 * sin5 - 1) * v[2] + (1 - 3 * sin5) * v[3],
            cos5 * v[0] + sin5 * v[1] - cos5 * v[2] + cos5 * v[3],
            cos5 * v[0] - cos5 * v[1] + sin5 * v[2] + cos5 * v[3],
            -cos5 * v[0] + cos5 * v[1] + cos5 * v[2] + sin5 * v[3]
        ] : (n == 6) ? (v) => [
            (5 * v[0] - v[1] - v[2] + v[3]) / 4,
            (3 * v[0] + v[1] - 3 * v[2] + 3 * v[3]) / 4,
            (3 * v[0] - 3 * v[1] + v[2] + 3 * v[3]) / 4,
            (-3 * v[0] + 3 * v[1] + 3 * v[2] + v[3]) / 4
        ] : (v) => [
            (2 - 3 * sin) * v[0] + (3 * sin - 1) * v[1] + (3 * sin - 1) * v[2] + (1 - 3 * sin) * v[3],
            cos * v[0] + sin * v[1] - cos * v[2] + cos * v[3],
            cos * v[0] - cos * v[1] + sin * v[2] + cos * v[3],
            -cos * v[0] + cos * v[1] + cos * v[2] + sin * v[3]
        ];

    return {

        vertices: [
            [1, 1, 1, 1],
            [1, 1, -1, -1],
            [1, -1, 1, -1],
            [1, -1, -1, 1]
        ],

        edges: [
            [0, 1], [0, 2], [0, 3],
            [1, 2], [1, 3], [2, 3]
        ],

        faces: [
            [0, 2, 1], [1, 2, 3],
            [2, 0, 3], [3, 0, 1]
        ],

        numVertices: 4,

        numEdges: 6,

        numFaces: 4,

        numSides: 3,

        // CFE
        // (0, 0, 1, 1) 
        a: (v) => [v[0], v[1], -v[3], -v[2]],

        // CVF
        // (0, 1, -1, 0)
        b: (v) => [v[0], v[2], v[1], v[3]],

        // CEV
        // (0, 0, 1, -1)
        c: (v) => [v[0], v[1], v[3], v[2]],

        // FEV
        // (cot^2-2, cot^2, 0, 0)
        d: d,

        // Identity matrix
        e: (v) => v,

        f: f,

        faceReflections: ["", "abc", "bc", "c"],

        outerReflection: "d",

        // (1, 1, 1, 1)
        V: [1, 1, 1, 1],

        // (1, 1, 0, 0)
        E: [1, 1, 0, 0],

        // (3, 1, 1, -1)
        F: [3, 1, 1, -1],

        // (1, 0, 0, 0)
        C: [1, 0, 0, 0],

        metric: metric,

        cellType: "spherical"

    }

}

export { tetrahedronData };
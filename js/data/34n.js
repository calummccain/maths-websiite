// Order n octahedral

const octahedronData = (n) => {

    const tan = Math.tan(Math.PI / n) ** 2;
    const cos = Math.cos(Math.PI / n) ** 2;
    const rt = Math.sqrt(2);
    const cot = 1 / tan;
    const cot2 = Math.sqrt(Math.abs(1 - 2 * cot));
    const cot3 = Math.sqrt(Math.abs(1 - cot));


    return {

        vertices: [
            [1, 1, 0, 0],
            [1, -1, 0, 0],
            [1, 0, 1, 0],
            [1, 0, -1, 0],
            [1, 0, 0, 1],
            [1, 0, 0, -1]
        ],

        edges: [
            [0, 2], [0, 3], [0, 4], [0, 5],
            [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 4], [4, 3], [3, 5], [5, 2]
        ],

        faces: [
            [0, 2, 4], [0, 5, 2], [0, 4, 3],
            [0, 3, 5], [1, 4, 2], [1, 2, 5],
            [1, 3, 4], [1, 5, 3]
        ],

        numVertices: 6,

        numEdges: 12,

        numFaces: 8,

        numSides: 3,

        a: (v) => {

            return [v[0], v[2], v[1], v[3]];

        },

        b: (v) => {

            return [v[0], v[1], v[3], v[2]];

        },

        c: (v) => {

            return [v[0], v[1], v[2], -v[3]];

        },

        //fev
        d: (v) => {

            if (n == 3) {

                return [
                    (v[0] + v[1] + v[2] + v[3]) / 2,
                    (v[0] + v[1] - v[2] - v[3]) / 2,
                    (v[0] - v[1] + v[2] - v[3]) / 2,
                    (v[0] - v[1] - v[2] + v[3]) / 2
                ];

            } else if (n == 4) {

                return [
                    2 * v[0] - v[1] - v[2] - v[3],
                    v[0] - v[2] - v[3],
                    v[0] - v[1] - v[3],
                    v[0] - v[1] - v[2]
                ];

            } else {

                return [
                    (6 * cos - 1) * v[0] + (2 - 6 * cos) * v[1] + (2 - 6 * cos) * v[2] + (2 - 6 * cos) * v[3],
                    2 * cos * v[0] + (1 - 2 * cos) * v[1] - 2 * cos * v[2] - 2 * cos * v[3],
                    2 * cos * v[0] - 2 * cos * v[1] + (1 - 2 * cos) * v[2] - 2 * cos * v[3],
                    2 * cos * v[0] - 2 * cos * v[1] - 2 * cos * v[2] + (1 - 2 * cos) * v[3]
                ];

            }

        },

        e: (v) => {

            return [v[0], v[1], v[2], v[3]];

        },

        f: (v) => {

            if (n == 3) {

                return [v[0] / rt, v[1] / rt, v[2] / rt, v[3] / rt]

            } else if (n == 4) {

                return v;

            } else {

                return [
                    v[0] / Math.sqrt(Math.abs(tan - 1)),
                    cot2 * v[1] / cot3,
                    cot2 * v[2] / cot3,
                    cot2 * v[3] / cot3,
                ];

            }

        },

        faceReflections: ['', 'c', 'bc', 'cbc', 'abc', 'cabc', 'bcabc', 'cbcabc'],

        outerReflection: "d",

        V: () => {

            return [1, 1, 0, 0];

        },

        E: () => {

            return [rt, 1 / rt, 1 / rt, 0];

        },

        F: () => {

            if (n == 3) {

                return [rt, 0, 0, 0];

            } else if (n == 4) {

                return [1, 0, 0, 0];

            } else {

                return [1 / cot2, 1 / (3 * cot2), 1 / (3 * cot2), 1 / (3 * cot2)];

            }

        },

        C: () => {

            if (n == 3) {

                return [rt, 0, 0, 0];

            } else if (n == 4) {

                return [1, 0, 0, 0];

            } else {

                return [Math.sqrt(Math.abs(tan - 1)), 0, 0, 0];

            }

        },

        // TODO what goes in the else columnn?
        metric: () => {

            if (n == 3) {

                return "spherical";

            } else if (n == 4) {

                return "hyperbolic";

            } else if (n == 5) {

                return "hyperbolic";

            } else if (n == 6) {

                return "hyperbolic";

            } else {

                return "";

            }

        },

        // TODO what goes in the else columnn?
        compact: () => {

            if (n == 3) {

                return "";

            } else if (n == 4) {

                return "paracompact";

            } else if (n == 5) {

                return "uncompact";

            } else if (n == 6) {

                return "uncompact";

            } else {

                return "uncompact";

            }

        },

        cellType: "spherical"

    }

}

export { octahedronData };
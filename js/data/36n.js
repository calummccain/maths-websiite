// Order n triangular

import { boundaries } from "./geometry-decider.js";

const triangleData = (n) => {

    return {

        vertices: [
            [252, -19, -7], [216, -19, -5], [192, -19, -3], [180, -19, -1],
            [180, -19, 1], [192, -19, 3], [216, -19, 5], [252, -19, 7],
            [180, -16, -6], [150, -16, -4], [132, -16, -2], [126, -16, 0],
            [132, -16, 2], [150, -16, 4], [180, -16, 6], [156, -13, -7],
            [120, -13, -5], [96, -13, -3], [84, -13, -1], [84, -13, 1],
            [96, -13, 3], [120, -13, 5], [156, -13, 7], [102, -10, -6],
            [72, -10, -4], [54, -10, -2], [48, -10, 0], [54, -10, 2],
            [72, -10, 4], [102, -10, 6], [96, -7, -7], [60, -7, -5],
            [36, -7, -3], [24, -7, -1], [24, -7, 1], [36, -7, 3],
            [60, -7, 5], [96, -7, 7], [60, -4, -6], [30, -4, -4],
            [12, -4, -2], [6, -4, 0], [12, -4, 2], [30, -4, 4],
            [60, -4, 6], [72, -1, -7], [36, -1, -5], [12, -1, -3],
            [0, -1, -1], [0, -1, 1], [12, -1, 3], [36, -1, 5],
            [72, -1, 7], [54, 2, -6], [24, 2, -4], [6, 2, -2],
            [0, 2, 0], [6, 2, 2], [24, 2, 4], [54, 2, 6],
            [84, 5, -7], [48, 5, -5], [24, 5, -3], [12, 5, -1],
            [12, 5, 1], [24, 5, 3], [48, 5, 5], [84, 5, 7],
            [84, 8, -6], [54, 8, -4], [36, 8, -2], [30, 8, 0],
            [36, 8, 2], [54, 8, 4], [84, 8, 6], [132, 11, -7],
            [96, 11, -5], [72, 11, -3], [60, 11, -1], [60, 11, 1],
            [72, 11, 3], [96, 11, 5], [132, 11, 7], [150, 14, -6],
            [120, 14, -4], [102, 14, -2], [96, 14, 0], [102, 14, 2],
            [120, 14, 4], [150, 14, 6], [216, 17, -7], [180, 17, -5],
            [156, 17, -3], [144, 17, -1], [144, 17, 1], [156, 17, 3],
            [180, 17, 5], [216, 17, 7], [252, 20, -6], [222, 20, -4],
            [204, 20, -2], [198, 20, 0], [204, 20, 2], [222, 20, 4],
            [252, 20, 6]
        ],

        edges: [
            [0, 1], [0, 8], [1, 2], [1, 8], [1, 9],
            [2, 3], [2, 9], [2, 10], [3, 4], [3, 10],
            [3, 11], [4, 5], [4, 11], [4, 12], [5, 6],
            [5, 12], [5, 13], [6, 7], [6, 13], [6, 14],
            [7, 14], [8, 9], [8, 15], [8, 16], [9, 10],
            [9, 16], [9, 17], [10, 11], [10, 17], [10, 18],
            [11, 12], [11, 18], [11, 19], [12, 13], [12, 19],
            [12, 20], [13, 14], [13, 20], [13, 21], [14, 21],
            [14, 22], [15, 16], [15, 23], [16, 17], [16, 23],
            [16, 24], [17, 18], [17, 24], [17, 25], [18, 19],
            [18, 25], [18, 26], [19, 20], [19, 26], [19, 27],
            [20, 21], [20, 27], [20, 28], [21, 22], [21, 28],
            [21, 29], [22, 29], [23, 24], [23, 30], [23, 31],
            [24, 25], [24, 31], [24, 32], [25, 26], [25, 32],
            [25, 33], [26, 27], [26, 33], [26, 34], [27, 28],
            [27, 34], [27, 35], [28, 29], [28, 35], [28, 36],
            [29, 36], [29, 37], [30, 31], [30, 38], [31, 32],
            [31, 38], [31, 39], [32, 33], [32, 39], [32, 40],
            [33, 34], [33, 40], [33, 41], [34, 35], [34, 41],
            [34, 42], [35, 36], [35, 42], [35, 43], [36, 37],
            [36, 43], [36, 44], [37, 44], [38, 39], [38, 45],
            [38, 46], [39, 40], [39, 46], [39, 47], [40, 41],
            [40, 47], [40, 48], [41, 42], [41, 48], [41, 49],
            [42, 43], [42, 49], [42, 50], [43, 44], [43, 50],
            [43, 51], [44, 51], [44, 52], [45, 46], [45, 53],
            [46, 47], [46, 53], [46, 54], [47, 48], [47, 54],
            [47, 55], [48, 49], [48, 55], [48, 56], [49, 50],
            [49, 56], [49, 57], [50, 51], [50, 57], [50, 58],
            [51, 52], [51, 58], [51, 59], [52, 59], [53, 54],
            [53, 60], [53, 61], [54, 55], [54, 61], [54, 62],
            [55, 56], [55, 62], [55, 63], [56, 57], [56, 63],
            [56, 64], [57, 58], [57, 64], [57, 65], [58, 59],
            [58, 65], [58, 66], [59, 66], [59, 67], [60, 61],
            [60, 68], [61, 62], [61, 68], [61, 69], [62, 63],
            [62, 69], [62, 70], [63, 64], [63, 70], [63, 71],
            [64, 65], [64, 71], [64, 72], [65, 66], [65, 72],
            [65, 73], [66, 67], [66, 73], [66, 74], [67, 74],
            [68, 69], [68, 75], [68, 76], [69, 70], [69, 76],
            [69, 77], [70, 71], [70, 77], [70, 78], [71, 72],
            [71, 78], [71, 79], [72, 73], [72, 79], [72, 80],
            [73, 74], [73, 80], [73, 81], [74, 81], [74, 82],
            [75, 76], [75, 83], [76, 77], [76, 83], [76, 84],
            [77, 78], [77, 84], [77, 85], [78, 79], [78, 85],
            [78, 86], [79, 80], [79, 86], [79, 87], [80, 81],
            [80, 87], [80, 88], [81, 82], [81, 88], [81, 89],
            [82, 89], [83, 84], [83, 90], [83, 91], [84, 85],
            [84, 91], [84, 92], [85, 86], [85, 92], [85, 93],
            [86, 87], [86, 93], [86, 94], [87, 88], [87, 94],
            [87, 95], [88, 89], [88, 95], [88, 96], [89, 96],
            [89, 97], [90, 91], [90, 98], [91, 92], [91, 98],
            [91, 99], [92, 93], [92, 99], [92, 100], [93, 94],
            [93, 100], [93, 101], [94, 95], [94, 101], [94, 102],
            [95, 96], [95, 102], [95, 103], [96, 97], [96, 103],
            [96, 104], [97, 104], [98, 99], [99, 100], [100, 101],
            [101, 102], [102, 103], [103, 104]
        ],

        faces: [
            [48, 49, 56], [49, 56, 57], [48, 55, 56], [41, 48, 49],
            [56, 57, 64], [49, 50, 57], [55, 56, 63], [47, 48, 55],
            [41, 42, 49], [56, 63, 64], [40, 41, 48], [57, 64, 65],
            [42, 49, 50], [50, 57, 58], [55, 62, 63], [40, 47, 48],
            [47, 54, 55], [34, 41, 42], [63, 64, 71], [57, 58, 65],
            [33, 40, 41], [64, 65, 72], [42, 43, 50], [54, 55, 62],
            [50, 51, 58], [62, 63, 70], [39, 40, 47], [33, 34, 41],
            [64, 71, 72], [46, 47, 54], [34, 35, 42], [63, 70, 71],
            [58, 65, 66], [43, 50, 51], [32, 33, 40], [65, 72, 73],
            [35, 42, 43], [54, 61, 62], [39, 46, 47], [51, 58, 59],
            [62, 69, 70], [32, 39, 40], [26, 33, 34], [71, 72, 79],
            [65, 66, 73], [46, 53, 54], [27, 34, 35], [70, 71, 78],
            [58, 59, 66], [43, 44, 51], [61, 62, 69], [25, 32, 33],
            [72, 73, 80], [35, 36, 43], [53, 54, 61], [38, 39, 46],
            [26, 27, 34], [71, 78, 79], [51, 52, 59], [69, 70, 77],
            [31, 32, 39], [25, 26, 33], [72, 79, 80], [66, 73, 74],
            [36, 43, 44], [45, 46, 53], [27, 28, 35], [70, 77, 78],
            [59, 66, 67], [44, 51, 52], [61, 68, 69], [31, 38, 39],
            [24, 25, 32], [73, 80, 81], [28, 35, 36], [53, 60, 61],
            [38, 45, 46], [19, 26, 27], [78, 79, 86], [66, 67, 74],
            [69, 76, 77], [24, 31, 32], [18, 25, 26], [79, 80, 87],
            [73, 74, 81], [36, 37, 44], [60, 61, 68], [20, 27, 28],
            [77, 78, 85], [68, 69, 76], [30, 31, 38], [18, 19, 26],
            [79, 86, 87], [17, 24, 25], [80, 81, 88], [28, 29, 36],
            [19, 20, 27], [78, 85, 86], [76, 77, 84], [23, 24, 31],
            [17, 18, 25], [80, 87, 88], [74, 81, 82], [29, 36, 37],
            [20, 21, 28], [77, 84, 85], [68, 75, 76], [23, 30, 31],
            [11, 18, 19], [86, 87, 94], [16, 17, 24], [81, 88, 89],
            [21, 28, 29], [12, 19, 20], [85, 86, 93], [76, 83, 84],
            [16, 23, 24], [10, 17, 18], [87, 88, 95], [81, 82, 89],
            [11, 12, 19], [86, 93, 94], [13, 20, 21], [84, 85, 92],
            [75, 76, 83], [10, 11, 18], [87, 94, 95], [9, 16, 17],
            [88, 89, 96], [21, 22, 29], [12, 13, 20], [85, 92, 93],
            [83, 84, 91], [15, 16, 23], [9, 10, 17], [88, 95, 96],
            [4, 11, 12], [93, 94, 101], [13, 14, 21], [84, 91, 92],
            [3, 10, 11], [94, 95, 102], [8, 9, 16], [89, 96, 97],
            [14, 21, 22], [5, 12, 13], [92, 93, 100], [3, 4, 11],
            [94, 101, 102], [83, 90, 91], [8, 15, 16], [2, 9, 10],
            [95, 96, 103], [4, 5, 12], [93, 100, 101], [6, 13, 14],
            [91, 92, 99], [2, 3, 10], [95, 102, 103], [1, 8, 9],
            [96, 97, 104], [5, 6, 13], [92, 99, 100], [90, 91, 98],
            [1, 2, 9], [96, 103, 104], [6, 7, 14], [91, 98, 99],
            [0, 1, 8]
        ],

        numVertices: 105,

        numEdges: 273,

        numFaces: 169,

        numSides: 3,

        // cfe
        a: (v) => {

            return [v[0], v[1], (-v[2] + 3 * v[3]) / 2, (v[2] + v[3]) / 2];

        },

        //cfv
        b: (v) => {

            return [v[0], v[1], v[2], -v[3]];

        },

        //fev
        c: (v) => {

            return [v[0], -v[1], v[2], v[3]];

        },

        //cev
        d: (v) => {

            if (n == 3) {

                var c = 1 / 4;

            } else {

                var c = Math.cos(Math.PI / n) ** 2;
            }

            return [
                (1 + 2 * c) * v[0] - 2 * (c ** 2) * v[1] - c * v[2] - 3 * c * v[3],
                2 * v[0] + (1 - 2 * c) * v[1] - v[2] - 3 * v[3],
                v[0] - c * v[1] + v[2] / 2 - 3 * v[3] / 2,
                v[0] - c * v[1] - v[2] / 2 - v[3] / 2
            ];

        },

        e: (v) => {

            return [v[0], v[1], v[2], v[3]];

        },

        f: (v) => {

            if (n == 3) {

                return [
                    v[0],
                    v[1] / 4,
                    v[2] / 2,
                    Math.sqrt(3) * v[3] / 2
                ];

            } else {

                const c = Math.cos(Math.PI / n) ** 2;
                const den = Math.sqrt(Math.abs(1 - 4 * c));
                return [
                    v[0] / den,
                    c * v[1] / den,
                    Math.sqrt(c) * v[2] / den,
                    Math.sqrt(3 * c) * v[3] / den
                ];

            }

        },

        conversion: (v) => {

            var c = Math.cos(Math.PI / n) ** 2;
            return [1 + c * v[0], v[0], v[1], v[2]];

        },

        face: () => {

            if (n == 3) {

                return [1, 0, 0, 0];

            } else {

                var c = Math.cos(Math.PI / n) ** 2;
                return [Math.sqrt(Math.abs(1 - 4 * c)), 0, 0, 0];

            }

        },

        faceReflections: [
            '', 'd', 'bd',
            'abd', 'dbd', 'dabd',
            'bdbd', 'bdabd', 'abdbd',
            'dbdbd', 'abdabd', 'dbdabd',
            'dabdbd', 'dabdabd', 'bdbdabd',
            'bdabdbd', 'bdabdabd', 'abdbdabd',
            'dbdbdabd', 'dbdabdbd', 'abdabdabd',
            'dbdabdabd', 'dabdbdabd', 'bdbdabdbd',
            'dabdabdabd', 'bdbdabdabd', 'bdabdbdabd',
            'abdbdabdbd', 'dbdbdabdbd', 'bdabdabdabd',
            'abdbdabdabd', 'dbdbdabdabd', 'dbdabdbdabd',
            'dabdbdabdbd', 'abdabdabdabd', 'dbdabdabdabd',
            'dabdbdabdabd', 'bdbdabdbdabd', 'bdabdbdabdbd',
            'dabdabdabdabd', 'bdbdabdabdabd', 'bdabdbdabdabd',
            'abdbdabdbdabd', 'dbdbdabdbdabd', 'dbdabdbdabdbd',
            'bdabdabdabdabd', 'abdbdabdabdabd', 'dbdbdabdabdabd',
            'dbdabdbdabdabd', 'dabdbdabdbdabd', 'bdbdabdbdabdbd',
            'abdabdabdabdabd', 'dbdabdabdabdabd', 'dabdbdabdabdabd',
            'bdbdabdbdabdabd', 'bdabdbdabdbdabd', 'abdbdabdbdabdbd',
            'dbdbdabdbdabdbd', 'dabdabdabdabdabd', 'bdbdabdabdabdabd',
            'bdabdbdabdabdabd', 'abdbdabdbdabdabd', 'dbdbdabdbdabdabd',
            'dbdabdbdabdbdabd', 'dabdbdabdbdabdbd', 'bdabdabdabdabdabd',
            'abdbdabdabdabdabd', 'dbdbdabdabdabdabd', 'dbdabdbdabdabdabd',
            'dabdbdabdbdabdabd', 'bdbdabdbdabdbdabd', 'bdabdbdabdbdabdbd',
            'abdabdabdabdabdabd', 'dbdabdabdabdabdabd', 'dabdbdabdabdabdabd',
            'bdbdabdbdabdabdabd', 'bdabdbdabdbdabdabd', 'abdbdabdbdabdbdabd',
            'dbdbdabdbdabdbdabd', 'dbdabdbdabdbdabdbd', 'bdbdabdabdabdabdabd',
            'bdabdbdabdabdabdabd', 'abdbdabdbdabdabdabd', 'dbdbdabdbdabdabdabd',
            'dbdabdbdabdbdabdabd', 'dabdbdabdbdabdbdabd', 'bdbdabdbdabdbdabdbd',
            'abdbdabdabdabdabdabd', 'dbdbdabdabdabdabdabd', 'bdbdabdbdabdbdabdabd',
            'bdabdbdabdbdabdbdabd', 'abdbdabdbdabdbdabdbd', 'dbdbdabdbdabdbdabdbd',
            'abdabdabdabdabdabdabd', 'dbdabdabdabdabdabdabd', 'dabdbdabdabdabdabdabd',
            'abdbdabdbdabdbdabdabd', 'dbdbdabdbdabdbdabdabd', 'bdbdabdabdabdabdabdabd',
            'bdabdbdabdabdabdabdabd',
            'abdbdabdbdabdabdabdabd',
            'dbdbdabdbdabdabdabdabd',
            'dbdabdbdabdbdabdabdabd',
            'dabdbdabdbdabdbdabdabd',
            'abdbdabdabdabdabdabdabd',
            'dbdbdabdabdabdabdabdabd',
            'bdbdabdbdabdbdabdabdabd',
            'bdabdbdabdbdabdbdabdabd',
            'abdbdabdbdabdbdabdbdabd',
            'dbdbdabdbdabdbdabdbdabd',
            'abdabdabdabdabdabdabdabd',
            'dbdabdabdabdabdabdabdabd',
            'dabdbdabdabdabdabdabdabd',
            'abdbdabdbdabdbdabdabdabd',
            'dbdbdabdbdabdbdabdabdabd',
            'bdbdabdabdabdabdabdabdabd',
            'bdabdbdabdabdabdabdabdabd',
            'abdbdabdbdabdabdabdabdabd',
            'dbdbdabdbdabdabdabdabdabd',
            'dbdabdbdabdbdabdabdabdabd',
            'abdbdabdbdabdbdabdbdabdbd',
            'dbdbdabdbdabdbdabdbdabdbd',
            'abdbdabdabdabdabdabdabdabd',
            'dbdbdabdabdabdabdabdabdabd',
            'bdbdabdbdabdbdabdabdabdabd',
            'abdbdabdbdabdbdabdbdabdabd',
            'dbdbdabdbdabdbdabdbdabdabd',
            'abdabdabdabdabdabdabdabdabd',
            'dbdabdabdabdabdabdabdabdabd',
            'dabdbdabdabdabdabdabdabdabd',
            'abdbdabdbdabdbdabdabdabdabd',
            'dbdbdabdbdabdbdabdabdabdabd',
            'bdbdabdabdabdabdabdabdabdabd',
            'bdabdbdabdabdabdabdabdabdabd',
            'abdbdabdbdabdabdabdabdabdabd',
            'dbdbdabdbdabdabdabdabdabdabd',
            'abdbdabdbdabdbdabdbdabdbdabd',
            'dbdbdabdbdabdbdabdbdabdbdabd',
            'abdbdabdabdabdabdabdabdabdabd',
            'dbdbdabdabdabdabdabdabdabdabd',
            'abdbdabdbdabdbdabdbdabdabdabd',
            'dbdbdabdbdabdbdabdbdabdabdabd',
            'abdabdabdabdabdabdabdabdabdabd',
            'dbdabdabdabdabdabdabdabdabdabd',
            'dabdbdabdabdabdabdabdabdabdabd',
            'abdbdabdbdabdbdabdabdabdabdabd',
            'dbdbdabdbdabdbdabdabdabdabdabd',
            'abdbdabdbdabdbdabdbdabdbdabdbd',
            'dbdbdabdbdabdbdabdbdabdbdabdbd',
            'bdbdabdabdabdabdabdabdabdabdabd',
            'bdabdbdabdabdabdabdabdabdabdabd',
            'abdbdabdbdabdabdabdabdabdabdabd',
            'dbdbdabdbdabdabdabdabdabdabdabd',
            'abdbdabdbdabdbdabdbdabdbdabdabd',
            'dbdbdabdbdabdbdabdbdabdbdabdabd',
            'abdbdabdabdabdabdabdabdabdabdabd',
            'dbdbdabdabdabdabdabdabdabdabdabd',
            'abdbdabdbdabdbdabdbdabdabdabdabd',
            'dbdbdabdbdabdbdabdbdabdabdabdabd',
            'abdabdabdabdabdabdabdabdabdabdabd',
            'dbdabdabdabdabdabdabdabdabdabdabd',
            'abdbdabdbdabdbdabdabdabdabdabdabd',
            'dbdbdabdbdabdbdabdabdabdabdabdabd',
            'bdbdabdabdabdabdabdabdabdabdabdabd',
            'abdbdabdbdabdabdabdabdabdabdabdabd',
            'dbdbdabdbdabdabdabdabdabdabdabdabd',
            'abdbdabdabdabdabdabdabdabdabdabdabd',
            'dbdbdabdabdabdabdabdabdabdabdabdabd',
            'abdabdabdabdabdabdabdabdabdabdabdabd'
        ],

        outerReflection: "c",

        center: [1, 1, 0, 0],

        // 3 4 5 6 7
        // p u u u u
        metric: () => {

            return boundaries(n, 2, 3)

        },

        cellType: "euclidean",

        flip: (v) => {

            return [v[0], v[2], v[3], v[1]];

        }

    }

}


export { triangleData };
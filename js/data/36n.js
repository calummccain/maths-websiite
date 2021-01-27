// Order n triangular

const triangularData = {

    vertices: [
        [252, -19, -7], [232.5, -19, -6], [216, -19, -5], [202.5, -19, -4],
        [192, -19, -3], [184.5, -19, -2], [180, -19, -1], [178.5, -19, 0],
        [180, -19, 1], [184.5, -19, 2], [192, -19, 3], [202.5, -19, 4],
        [216, -19, 5], [232.5, -19, 6], [252, -19, 7], [199.5, -16, -7],
        [180, -16, -6], [163.5, -16, -5], [150, -16, -4], [139.5, -16, -3],
        [132, -16, -2], [127.5, -16, -1], [126, -16, 0], [127.5, -16, 1],
        [132, -16, 2], [139.5, -16, 3], [150, -16, 4], [163.5, -16, 5],
        [180, -16, 6], [199.5, -16, 7], [156, -13, -7], [136.5, -13, -6],
        [120, -13, -5], [106.5, -13, -4], [96, -13, -3], [88.5, -13, -2],
        [84, -13, -1], [82.5, -13, 0], [84, -13, 1], [88.5, -13, 2],
        [96, -13, 3], [106.5, -13, 4], [120, -13, 5], [136.5, -13, 6],
        [156, -13, 7], [121.5, -10, -7], [102, -10, -6], [85.5, -10, -5],
        [72, -10, -4], [61.5, -10, -3], [54, -10, -2], [49.5, -10, -1],
        [48, -10, 0], [49.5, -10, 1], [54, -10, 2], [61.5, -10, 3],
        [72, -10, 4], [85.5, -10, 5], [102, -10, 6], [121.5, -10, 7],
        [96, -7, -7], [76.5, -7, -6], [60, -7, -5], [46.5, -7, -4],
        [36, -7, -3], [28.5, -7, -2], [24, -7, -1], [22.5, -7, 0],
        [24, -7, 1], [28.5, -7, 2], [36, -7, 3], [46.5, -7, 4],
        [60, -7, 5], [76.5, -7, 6], [96, -7, 7], [79.5, -4, -7],
        [60, -4, -6], [43.5, -4, -5], [30, -4, -4], [19.5, -4, -3],
        [12, -4, -2], [7.5, -4, -1], [6, -4, 0], [7.5, -4, 1],
        [12, -4, 2], [19.5, -4, 3], [30, -4, 4], [43.5, -4, 5],
        [60, -4, 6], [79.5, -4, 7], [72, -1, -7], [52.5, -1, -6],
        [36, -1, -5], [22.5, -1, -4], [12, -1, -3], [4.5, -1, -2],
        [0, -1, -1], [-1.5, -1, 0], [0, -1, 1],
        [4.5, -1, 2], [12, -1, 3], [22.5, -1, 4], [36, -1, 5],
        [52.5, -1, 6], [72, -1, 7], [73.5, 2, -7], [54, 2, -6],
        [37.5, 2, -5], [24, 2, -4], [13.5, 2, -3], [6, 2, -2],
        [1.5, 2, -1], [0, 2, 0], [1.5, 2, 1], [6, 2, 2],
        [13.5, 2, 3], [24, 2, 4], [37.5, 2, 5], [54, 2, 6],
        [73.5, 2, 7], [84, 5, -7], [64.5, 5, -6], [48, 5, -5],
        [34.5, 5, -4], [24, 5, -3], [16.5, 5, -2], [12, 5, -1],
        [10.5, 5, 0], [12, 5, 1], [16.5, 5, 2], [24, 5, 3],
        [34.5, 5, 4], [48, 5, 5], [64.5, 5, 6], [84, 5, 7],
        [103.5, 8, -7], [84, 8, -6], [67.5, 8, -5], [54, 8, -4],
        [43.5, 8, -3], [36, 8, -2], [31.5, 8, -1], [30, 8, 0],
        [31.5, 8, 1], [36, 8, 2], [43.5, 8, 3], [54, 8, 4],
        [67.5, 8, 5], [84, 8, 6], [103.5, 8, 7], [132, 11, -7],
        [112.5, 11, -6], [96, 11, -5], [82.5, 11, -4], [72, 11, -3],
        [64.5, 11, -2], [60, 11, -1], [58.5, 11, 0], [60, 11, 1],
        [64.5, 11, 2], [72, 11, 3], [82.5, 11, 4], [96, 11, 5],
        [112.5, 11, 6], [132, 11, 7], [169.5, 14, -7], [150, 14, -6],
        [133.5, 14, -5], [120, 14, -4], [109.5, 14, -3], [102, 14, -2],
        [97.5, 14, -1], [96, 14, 0], [97.5, 14, 1], [102, 14, 2],
        [109.5, 14, 3], [120, 14, 4], [133.5, 14, 5], [150, 14, 6],
        [169.5, 14, 7], [216, 17, -7], [196.5, 17, -6], [180, 17, -5],
        [166.5, 17, -4], [156, 17, -3], [148.5, 17, -2], [144, 17, -1],
        [142.5, 17, 0], [144, 17, 1], [148.5, 17, 2], [156, 17, 3],
        [166.5, 17, 4], [180, 17, 5], [196.5, 17, 6], [216, 17, 7],
        [271.5, 20, -7], [252, 20, -6], [235.5, 20, -5], [222, 20, -4],
        [211.5, 20, -3], [204, 20, -2], [199.5, 20, -1], [198, 20, 0],
        [199.5, 20, 1], [204, 20, 2], [211.5, 20, 3], [222, 20, 4],
        [235.5, 20, 5], [252, 20, 6], [271.5, 20, 7]
    ],

    faces: [
        [96, 98, 112], [98, 112, 114], [96, 110, 112], [82, 96, 98],
        [112, 114, 128], [98, 100, 114], [110, 112, 126], [94, 96, 110],
        [82, 84, 98], [112, 126, 128], [80, 82, 96], [114, 128, 130],
        [84, 98, 100], [100, 114, 116], [110, 124, 126], [80, 94, 96],
        [94, 108, 110], [68, 82, 84], [126, 128, 142], [114, 116, 130],
        [66, 80, 82], [128, 130, 144], [84, 86, 100], [108, 110, 124],
        [100, 102, 116], [124, 126, 140], [78, 80, 94], [66, 68, 82],
        [128, 142, 144], [92, 94, 108], [68, 70, 84], [126, 140, 142],
        [116, 130, 132], [86, 100, 102], [64, 66, 80], [130, 144, 146],
        [70, 84, 86], [108, 122, 124], [78, 92, 94], [102, 116, 118],
        [124, 138, 140], [64, 78, 80], [52, 66, 68], [142, 144, 158],
        [130, 132, 146], [92, 106, 108], [54, 68, 70], [140, 142, 156],
        [116, 118, 132], [86, 88, 102], [122, 124, 138], [50, 64, 66],
        [144, 146, 160], [70, 72, 86], [106, 108, 122], [76, 78, 92],
        [52, 54, 68], [142, 156, 158], [102, 104, 118], [138, 140, 154],
        [62, 64, 78], [50, 52, 66], [144, 158, 160], [132, 146, 148],
        [72, 86, 88], [90, 92, 106], [54, 56, 70], [140, 154, 156],
        [118, 132, 134], [88, 102, 104], [122, 136, 138], [62, 76, 78],
        [48, 50, 64], [146, 160, 162], [56, 70, 72], [106, 120, 122],
        [76, 90, 92], [38, 52, 54], [156, 158, 172], [132, 134, 148],
        [138, 152, 154], [48, 62, 64], [36, 50, 52], [158, 160, 174],
        [146, 148, 162], [72, 74, 88], [120, 122, 136], [40, 54, 56],
        [154, 156, 170], [136, 138, 152], [60, 62, 76], [36, 38, 52],
        [158, 172, 174], [34, 48, 50], [160, 162, 176], [56, 58, 72],
        [38, 40, 54], [156, 170, 172], [152, 154, 168],
        [46, 48, 62], [34, 36, 50], [160, 174, 176],
        [148, 162, 164], [58, 72, 74], [40, 42, 56],
        [154, 168, 170], [136, 150, 152], [46, 60, 62],
        [22, 36, 38], [172, 174, 188], [32, 34, 48],
        [162, 176, 178], [42, 56, 58], [24, 38, 40],
        [170, 172, 186], [152, 166, 168], [32, 46, 48],
        [20, 34, 36], [174, 176, 190], [162, 164, 178],
        [22, 24, 38], [172, 186, 188], [26, 40, 42],
        [168, 170, 184], [150, 152, 166], [20, 22, 36],
        [174, 188, 190], [18, 32, 34], [176, 178, 192],
        [42, 44, 58], [24, 26, 40], [170, 184, 186],
        [166, 168, 182], [30, 32, 46], [18, 20, 34],
        [176, 190, 192], [8, 22, 24], [186, 188, 202],
        [26, 28, 42], [168, 182, 184], [6, 20, 22],
        [188, 190, 204], [16, 18, 32], [178, 192, 194],
        [28, 42, 44], [10, 24, 26], [184, 186, 200],
        [6, 8, 22], [188, 202, 204], [166, 180, 182],
        [16, 30, 32], [4, 18, 20], [190, 192, 206],
        [8, 10, 24], [186, 200, 202], [12, 26, 28],
        [182, 184, 198], [4, 6, 20], [190, 204, 206],
        [2, 16, 18], [192, 194, 208], [10, 12, 26],
        [184, 198, 200], [180, 182, 196], [2, 4, 18],
        [192, 206, 208], [12, 14, 28], [182, 196, 198],
        [0, 2, 16]
    ],

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
    d: (n, v) => {

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

    f: (n, v) => {

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

    conversion: (n, v) => {

        var c = Math.cos(Math.PI / n) ** 2;
        return [1 + c * v[0], v[0], v[1], v[2]];

    },

    matrixDict: (order, letter, vector) => {

        var newVector;

        switch (letter) {
            case 'a':
                newVector = a(vector);
                break;
            case 'b':
                newVector = b(vector);
                break;
            case 'c':
                newVector = c(vector);
                break;
            case 'd':
                newVector = d(order, vector);
                break;
            case 'e':
                newVector = e(vector);
                break;
            case 'f':
                newVector = f(order, vector);
                break;
        }

        return newVector;

    },

    face: (n) => {

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

    center: [1, 1, 0, 0],

    // TODO what goes in the else columnn?
    metric: (n) => {

        if (n == 3) {

            return "hyperbolic";

        } else if (n == 4) {

            return "hyperbolic";

        } else if (n == 5) {

            return "hyperbolic";

        } else if (n == 6) {

            return "hyperbolic";

        } else {

            return "";

        }

    }

}


export { triangularData };

//console.log(faces.length)
// const numOfPoints = 7;

// function generatePoints(n) {

//     var vertices = [];

//     for (var i = -3 * numOfPoints + 2; i <= 3 * numOfPoints - 1; i++) {

//         for (var j = -numOfPoints; j <= numOfPoints; j++) {

//             if (i % 3 == 2 || i % 3 == -1) {

//                 const x = ((i ** 2) + 3 * (j ** 2) - 4) / 2;
//                 vertices.push([x, i, j]);

//             }

//         }

//     }

//     return vertices;

// }

// function generateFaces(n, number) {
//     var faces = [];
//     var names = [""];
//     const eps = 1e-5;

//     faces.push(face(n));

//     function isIn(v) {
//         for (var i = 0; i < faces.length; i++) {
//             if (
//                 (Math.abs(v[0] - faces[i][0]) < eps) &&
//                 (Math.abs(v[1] - faces[i][1]) < eps) &&
//                 (Math.abs(v[2] - faces[i][2]) < eps) &&
//                 (Math.abs(v[3] - faces[i][3]) < eps)
//             ) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     var i = 1;
//     while (i <= number) {
//         for (var j = 0; j < i; j++) {
//             if (!isIn(a(faces[j]))) {
//                 faces.push(a(faces[j]));
//                 names.push("a" + names[j]);
//             }
//             if (!isIn(b(faces[j]))) {
//                 faces.push(b(faces[j]));
//                 names.push("b" + names[j]);
//             }
//             if (!isIn(d(n, faces[j]))) {
//                 faces.push(d(n, faces[j]));
//                 names.push("d" + names[j]);
//             }
//         }
//         i = names.length;

//     }
//     return [names, faces];

// }

// var points = generatePoints(3);
// //console.log(points.slice(0, 99));
// //console.log(points.slice(99, 198));
// //console.log(points.slice(198));
// var [names, centers] = generateFaces(3, 600)
// //console.log(names)
// //console.log(centers)

// function generateFaceVertex() {
//     var grouping = [];
//     var newNames = [];
//     for (var i = 0; i < centers.length; i++) {
//         var corners = [];
//         for (var j = 0; j < points.length; j++) {
//             if (Math.abs(points[j][1] - centers[i][2]) + Math.abs(points[j][2] - centers[i][3]) == 2) {
//                 corners.push(j);
//             }
//         }

//         if (corners.length == 3) {
//             console.log(i, centers[i], corners);
//             //corners.forEach((elem) => { console.log(elem, points[elem]) });
//             grouping.push(corners);
//             newNames.push(names[i]);
//         }
//     }

//     return newNames;
// }

// var nom = generateFaceVertex();
// console.log(nom.slice(0, 99))
// console.log(nom.slice(99))


// function tidyFaces() {
//     var tidy = [];
//     faces.forEach((face) => {
//         console.log(face)
//         var newList = [0, 0, 0, 0];
//         var v1 = vertices[face[0]], v2 = vertices[face[1]], v3 = vertices[face[2]], v4 = vertices[face[3]];
//         var v = [v1, v2, v3, v4];
//         var cx = (v1[2] + v2[2] + v3[2]) / 3;
//         var cy = (v1[3] + v2[3] + v3[3]) / 3;
//         for (var i = 0; i < 4; i++) {
//             if (v[i][2] - cx == 1) {
//                 newList[0] = face[i];
//             } else if (v[i][2] - cx == -1) {
//                 newList[2] = face[i];
//             } else if (v[i][3] - cy == 1) {
//                 newList[1] = face[i];
//             } else if (v[i][3] - cy == -1) {
//                 newList[3] = face[i];
//             }
//         }
//         tidy.push(newList);

//     })
//     return tidy;
// }

//console.log(tidyFaces());
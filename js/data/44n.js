// Order n square

const squareData = (n) => {

    return {
        vertices: [
            [43, 84, -7, -6], [33, 64, -7, -4], [27, 52, -7, -2], [25, 48, -7, 0],
            [27, 52, -7, 2], [33, 64, -7, 4], [43, 84, -7, 6], [43, 84, -6, -7],
            [31, 60, -6, -5], [23, 44, -6, -3], [19, 36, -6, -1], [19, 36, -6, 1],
            [23, 44, -6, 3], [31, 60, -6, 5], [43, 84, -6, 7], [31, 60, -5, -6],
            [21, 40, -5, -4], [15, 28, -5, -2], [13, 24, -5, 0], [15, 28, -5, 2],
            [21, 40, -5, 4], [31, 60, -5, 6], [33, 64, -4, -7], [21, 40, -4, -5],
            [13, 24, -4, -3], [9, 16, -4, -1], [9, 16, -4, 1], [13, 24, -4, 3],
            [21, 40, -4, 5], [33, 64, -4, 7], [23, 44, -3, -6], [13, 24, -3, -4],
            [7, 12, -3, -2], [5, 8, -3, 0], [7, 12, -3, 2], [13, 24, -3, 4],
            [23, 44, -3, 6], [27, 52, -2, -7], [15, 28, -2, -5], [7, 12, -2, -3],
            [3, 4, -2, -1], [3, 4, -2, 1], [7, 12, -2, 3], [15, 28, -2, 5],
            [27, 52, -2, 7], [19, 36, -1, -6], [9, 16, -1, -4], [3, 4, -1, -2],
            [1, 0, -1, 0], [3, 4, -1, 2], [9, 16, -1, 4], [19, 36, -1, 6],
            [25, 48, 0, -7], [13, 24, 0, -5], [5, 8, 0, -3], [1, 0, 0, -1],
            [1, 0, 0, 1], [5, 8, 0, 3], [13, 24, 0, 5], [25, 48, 0, 7],
            [19, 36, 1, -6], [9, 16, 1, -4], [3, 4, 1, -2], [1, 0, 1, 0],
            [3, 4, 1, 2], [9, 16, 1, 4], [19, 36, 1, 6], [27, 52, 2, -7],
            [15, 28, 2, -5], [7, 12, 2, -3], [3, 4, 2, -1], [3, 4, 2, 1],
            [7, 12, 2, 3], [15, 28, 2, 5], [27, 52, 2, 7], [23, 44, 3, -6],
            [13, 24, 3, -4], [7, 12, 3, -2], [5, 8, 3, 0], [7, 12, 3, 2],
            [13, 24, 3, 4], [23, 44, 3, 6], [33, 64, 4, -7], [21, 40, 4, -5],
            [13, 24, 4, -3], [9, 16, 4, -1], [9, 16, 4, 1], [13, 24, 4, 3],
            [21, 40, 4, 5], [33, 64, 4, 7], [31, 60, 5, -6], [21, 40, 5, -4],
            [15, 28, 5, -2], [13, 24, 5, 0], [15, 28, 5, 2], [21, 40, 5, 4],
            [31, 60, 5, 6], [43, 84, 6, -7], [31, 60, 6, -5], [23, 44, 6, -3],
            [19, 36, 6, -1], [19, 36, 6, 1], [23, 44, 6, 3], [31, 60, 6, 5],
            [43, 84, 6, 7], [43, 84, 7, -6], [33, 64, 7, -4], [27, 52, 7, -2],
            [25, 48, 7, 0], [27, 52, 7, 2], [33, 64, 7, 4], [43, 84, 7, 6]
        ],

        edges: [
            [0, 7], [0, 8], [1, 8], [1, 9], [2, 9],
            [2, 10], [3, 10], [3, 11], [4, 11], [4, 12],
            [5, 12], [5, 13], [6, 13], [6, 14], [7, 15],
            [8, 15], [8, 16], [9, 16], [9, 17], [10, 17],
            [10, 18], [11, 18], [11, 19], [12, 19], [12, 20],
            [13, 20], [13, 21], [14, 21], [15, 22], [15, 23],
            [16, 23], [16, 24], [17, 24], [17, 25], [18, 25],
            [18, 26], [19, 26], [19, 27], [20, 27], [20, 28],
            [21, 28], [21, 29], [22, 30], [23, 30], [23, 31],
            [24, 31], [24, 32], [25, 32], [25, 33], [26, 33],
            [26, 34], [27, 34], [27, 35], [28, 35], [28, 36],
            [29, 36], [30, 37], [30, 38], [31, 38], [31, 39],
            [32, 39], [32, 40], [33, 40], [33, 41], [34, 41],
            [34, 42], [35, 42], [35, 43], [36, 43], [36, 44],
            [37, 45], [38, 45], [38, 46], [39, 46], [39, 47],
            [40, 47], [40, 48], [41, 48], [41, 49], [42, 49],
            [42, 50], [43, 50], [43, 51], [44, 51], [45, 52],
            [45, 53], [46, 53], [46, 54], [47, 54], [47, 55],
            [48, 55], [48, 56], [49, 56], [49, 57], [50, 57],
            [50, 58], [51, 58], [51, 59], [52, 60], [53, 60],
            [53, 61], [54, 61], [54, 62], [55, 62], [55, 63],
            [56, 63], [56, 64], [57, 64], [57, 65], [58, 65],
            [58, 66], [59, 66], [60, 67], [60, 68], [61, 68],
            [61, 69], [62, 69], [62, 70], [63, 70], [63, 71],
            [64, 71], [64, 72], [65, 72], [65, 73], [66, 73],
            [66, 74], [67, 75], [68, 75], [68, 76], [69, 76],
            [69, 77], [70, 77], [70, 78], [71, 78], [71, 79],
            [72, 79], [72, 80], [73, 80], [73, 81], [74, 81],
            [75, 82], [75, 83], [76, 83], [76, 84], [77, 84],
            [77, 85], [78, 85], [78, 86], [79, 86], [79, 87],
            [80, 87], [80, 88], [81, 88], [81, 89], [82, 90],
            [83, 90], [83, 91], [84, 91], [84, 92], [85, 92],
            [85, 93], [86, 93], [86, 94], [87, 94], [87, 95],
            [88, 95], [88, 96], [89, 96], [90, 97], [90, 98],
            [91, 98], [91, 99], [92, 99], [92, 100], [93, 100],
            [93, 101], [94, 101], [94, 102], [95, 102], [95, 103],
            [96, 103], [96, 104], [97, 105], [98, 105], [98, 106],
            [99, 106], [99, 107], [100, 107], [100, 108], [101, 108],
            [101, 109], [102, 109], [102, 110], [103, 110], [103, 111],
            [104, 111]
        ],

        faces: [
            [63, 56, 48, 55], [71, 64, 56, 63], [70, 63, 55, 62],
            [56, 49, 41, 48], [78, 71, 63, 70], [55, 48, 40, 47],
            [64, 57, 49, 56], [79, 72, 64, 71], [62, 55, 47, 54],
            [77, 70, 62, 69], [48, 41, 33, 40], [86, 79, 71, 78],
            [49, 42, 34, 41], [85, 78, 70, 77], [72, 65, 57, 64],
            [47, 40, 32, 39], [57, 50, 42, 49], [69, 62, 54, 61],
            [87, 80, 72, 79], [54, 47, 39, 46], [41, 34, 26, 33],
            [93, 86, 78, 85], [84, 77, 69, 76], [40, 33, 25, 32],
            [94, 87, 79, 86], [65, 58, 50, 57], [42, 35, 27, 34],
            [92, 85, 77, 84], [80, 73, 65, 72], [61, 54, 46, 53],
            [39, 32, 24, 31], [50, 43, 35, 42], [76, 69, 61, 68],
            [33, 26, 18, 25], [101, 94, 86, 93], [95, 88, 80, 87],
            [46, 39, 31, 38], [34, 27, 19, 26], [100, 93, 85, 92],
            [73, 66, 58, 65], [91, 84, 76, 83], [32, 25, 17, 24],
            [102, 95, 87, 94], [58, 51, 43, 50], [68, 61, 53, 60],
            [35, 28, 20, 27], [99, 92, 84, 91], [88, 81, 73, 80],
            [53, 46, 38, 45], [26, 19, 11, 18], [108, 101, 93, 100],
            [31, 24, 16, 23], [43, 36, 28, 35], [83, 76, 68, 75],
            [25, 18, 10, 17], [109, 102, 94, 101], [66, 59, 51, 58],
            [103, 96, 88, 95], [38, 31, 23, 30], [27, 20, 12, 19],
            [107, 100, 92, 99], [81, 74, 66, 73], [60, 53, 45, 52],
            [98, 91, 83, 90], [24, 17, 9, 16], [110, 103, 95, 102],
            [51, 44, 36, 43], [75, 68, 60, 67], [18, 11, 3, 10],
            [28, 21, 13, 20], [106, 99, 91, 98], [96, 89, 81, 88],
            [45, 38, 30, 37], [19, 12, 4, 11], [23, 16, 8, 15],
            [36, 29, 21, 28], [90, 83, 75, 82], [17, 10, 2, 9],
            [111, 104, 96, 103], [30, 23, 15, 22], [20, 13, 5, 12],
            [105, 98, 90, 97], [16, 9, 1, 8], [21, 14, 6, 13],
            [15, 8, 0, 7]
        ],

        numVertices: 112,

        numEdges: 196,

        numFaces: 85,

        numSides: 4,

        // cfe
        a: (v) => {

            return [v[0], v[1], v[3], v[2]];

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

            if (n == 4) {

                return [
                    2 * v[0] - v[1] / 2 - v[2] - v[3],
                    2 * v[0] - 2 * v[2] - 2 * v[3],
                    v[0] - v[1] / 2 - v[3],
                    v[0] - v[1] / 2 - v[2]
                ];

            } else {

                const c = Math.cos(Math.PI / n) ** 2;
                return [
                    (1 + 2 * c) * v[0] - 2 * (c ** 2) * v[1] - 2 * c * v[2] - 2 * c * v[3],
                    2 * v[0] + (1 - 2 * c) * v[1] - 2 * v[2] - 2 * v[3],
                    v[0] - c * v[1] - v[3],
                    v[0] - c * v[1] - v[2]
                ];

            }

        },

        e: (v) => {

            return [v[0], v[1], v[2], v[3]];

        },

        f: (v) => {

            if (n == 4) {

                return [
                    v[0],
                    v[1] / 2,
                    v[2],
                    v[3]
                ];

            } else {

                const c = Math.cos(Math.PI / n) ** 2;
                const den = Math.sqrt(Math.abs(1 - 2 * c));
                return [
                    v[0] / den,
                    c * v[1] / den,
                    Math.sqrt(2 * c) * v[2] / den,
                    Math.sqrt(2 * c) * v[3] / den
                ];

            }

        },

        conversion: (v) => {

            var c = Math.cos(Math.PI / n) ** 2;
            return [1 + c * v[1], v[1], v[2], v[3]];

        },

        face: () => {

            if (n == 4) {

                return [1, 0, 0, 0];

            } else {

                var c = Math.cos(Math.PI / n) ** 2;
                return [Math.sqrt(Math.abs(1 - 2 * c)), 0, 0, 0];

            }

        },

        faceReflections: [
            '',
            'd',
            'bd',
            'abd',
            'dbd',
            'babd',
            'dabd',
            'dbabd',
            'bdabd',
            'bdbabd',
            'abdabd',
            'dbdabd',
            'abdbabd',
            'dbdbabd',
            'dabdabd',
            'babdbabd',
            'dabdbabd',
            'bdabdabd',
            'dbabdbabd',
            'bdabdbabd',
            'abdabdabd',
            'dbdabdabd',
            'bdbabdbabd',
            'abdabdbabd',
            'dbdabdbabd',
            'dabdabdabd',
            'abdbabdbabd',
            'dbdbabdbabd',
            'dabdabdbabd',
            'bdabdabdabd',
            'babdbabdbabd',
            'dabdbabdbabd',
            'bdabdabdbabd',
            'abdabdabdabd',
            'dbdabdabdabd',
            'dbabdbabdbabd',
            'bdabdbabdbabd',
            'abdabdabdbabd',
            'dbdabdabdbabd',
            'dabdabdabdabd',
            'bdbabdbabdbabd',
            'abdabdbabdbabd',
            'dbdabdbabdbabd',
            'dabdabdabdbabd',
            'bdabdabdabdabd',
            'abdbabdbabdbabd',
            'dbdbabdbabdbabd',
            'dabdabdbabdbabd',
            'bdabdabdabdbabd',
            'abdabdabdabdabd',
            'dbdabdabdabdabd',
            'babdbabdbabdbabd',
            'dabdbabdbabdbabd',
            'bdabdabdbabdbabd',
            'abdabdabdabdbabd',
            'dbdabdabdabdbabd',
            'dabdabdabdabdabd',
            'dbabdbabdbabdbabd',
            'bdabdbabdbabdbabd',
            'abdabdabdbabdbabd',
            'dbdabdabdbabdbabd',
            'dabdabdabdabdbabd',
            'bdabdabdabdabdabd',
            'bdbabdbabdbabdbabd',
            'abdabdbabdbabdbabd',
            'dbdabdbabdbabdbabd',
            'dabdabdabdbabdbabd',
            'bdabdabdabdabdbabd',
            'abdabdabdabdabdabd',
            'abdbabdbabdbabdbabd',
            'dbdbabdbabdbabdbabd',
            'dabdabdbabdbabdbabd',
            'bdabdabdabdbabdbabd',
            'abdabdabdabdabdbabd',
            'babdbabdbabdbabdbabd',
            'dabdbabdbabdbabdbabd',
            'bdabdabdbabdbabdbabd',
            'abdabdabdabdbabdbabd',
            'dbabdbabdbabdbabdbabd',
            'bdabdbabdbabdbabdbabd',
            'abdabdabdbabdbabdbabd',
            'bdbabdbabdbabdbabdbabd',
            'abdabdbabdbabdbabdbabd',
            'abdbabdbabdbabdbabdbabd',
            'babdbabdbabdbabdbabdbabd'
        ],

        outerReflection: "c",

        center: [1, 1, 0, 0],

        // TODO what goes in the else columnn?
        metric: () => {

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

        },

        // TODO what goes in the else columnn?
        compact: () => {

            if (n == 3) {

                return "compact";

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

        cellType: "euclidean"

    }

}


export { squareData };

// const data = squareData(6);

// console.log(data.vertices.length)
// console.log(data.edges.length)
// console.log(data.faces.length)

// var usedVerts = [];

// for (var i = 0; i < data.numFaces; i++) {
//     data.faces[i].forEach((num) => {
//         if (!usedVerts.includes(num)) {
//             usedVerts.push(num);
//         }
//     })
// }

// usedVerts.sort((a, b) => a - b);

//console.log(usedVerts, usedVerts.length)

// var newVerts = [];
// usedVerts.forEach((num) => {
//     newVerts.push(data.vertices[num]);
// })
// console.log(newVerts.slice(0, 99))
// console.log(newVerts.slice(99, 200))

// var newEdges = [];
// data.edges.forEach((edge) => {
//     var newEdge = [usedVerts.indexOf(edge[0]), usedVerts.indexOf(edge[1])];
//     if ((newEdge[0] !== -1) && newEdge[1] !== -1) {
//         newEdges.push(newEdge)
//     }
// })

// console.log(newEdges.slice(0, 100));
// console.log(newEdges.slice(100, 200));
// console.log(newEdges.slice(200, 300));

// var newFaces = [];
// data.faces.forEach((face) => {
//     newFaces.push([
//         usedVerts.indexOf(face[0]),
//         usedVerts.indexOf(face[1]),
//         usedVerts.indexOf(face[2]),
//         usedVerts.indexOf(face[3]),
//     ]);
// })

//console.log(newFaces);

// const edges = [];
// for (var i = 0; i < data.vertices.length; i++) {
//     for (var j = i + 1; j < data.vertices.length; j++) {
//         if ((Math.abs(data.vertices[i][2] - data.vertices[j][2]) == 1) && (Math.abs(data.vertices[i][3] - data.vertices[j][3]) == 1)) {
//             edges.push([i, j]);
//         }

//     }

// }
// console.log(edges.slice(0, 100))
// console.log(edges.slice(100, 200))
// console.log(edges.slice(195, 200))
// // console.log(edges.length)
// const numOfPoints = 7;

// function generatePoints(n) {

//     if (n == 4) {

//         var c = 1 / 2;

//     } else {

//         var c = Math.cos(Math.PI / n) ** 2;

//     }

//     var vertices = [];

//     for (var i = -numOfPoints; i <= numOfPoints; i++) {

//         for (var j = -numOfPoints; j <= numOfPoints; j++) {

//             if (i % 2 != j % 2) {

//                 const x = i ** 2 + j ** 2 - 1;
//                 vertices.push([1 + c * x, x, i, j]);

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

// var points = generatePoints(4);
// //console.log(points.slice(0, 99));
// //console.log(points.slice(99));
// var [names, centers] = generateFaces(4, 400)

// function generateFaceVertex() {
//     var grouping = [];
//     var newNames = [];
//     for (var i = 0; i < centers.length; i++) {
//         if ((Math.abs(centers[i][2]) < numOfPoints) && (Math.abs(centers[i][3]) < numOfPoints)) {
//             var corners = [];
//             newNames.push(names[i]);
//             for (var j = 0; j < points.length; j++) {
//                 if (((Math.abs(points[j][2] - centers[i][2]) == 1) && (points[j][3] == centers[i][3])) ||
//                     ((Math.abs(points[j][3] - centers[i][3]) == 1) && (points[j][2] == centers[i][2]))) {
//                     corners.push(j);
//                 }
//             }

//             console.log(i, centers[i], corners)
//             corners.forEach((elem) => { console.log(elem, points[elem]) })
//             grouping.push(corners);
//         }
//     }

//     return newNames;
// }

// //console.log(generateFaceVertex());


// function tidyFaces() {
//     var tidy = [];
//     faces.forEach((face) => {
//         console.log(face)
//         var newList = [0, 0, 0, 0];
//         var v1 = vertices[face[0]], v2 = vertices[face[1]], v3 = vertices[face[2]], v4 = vertices[face[3]];
//         var v = [v1, v2, v3, v4];
//         var cx = (v1[2] + v2[2] + v3[2] + v4[2]) / 4;
//         var cy = (v1[3] + v2[3] + v3[3] + v4[3]) / 4;
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

// console.log(tidyFaces());
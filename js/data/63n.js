// Order n hexagonal

const hexagonData = (n) => {

    return {
        vertices: [
            [205, 272, -11, -7], [151, 200, -11, -5], [115, 152, -11, -3],
            [97, 128, -11, -1], [97, 128, -11, 1], [115, 152, -11, 3],
            [151, 200, -11, 5], [205, 272, -11, 7], [223, 296, -10, -8],
            [160, 212, -10, -6], [115, 152, -10, -4], [88, 116, -10, -2],
            [79, 104, -10, 0], [88, 116, -10, 2], [115, 152, -10, 4],
            [160, 212, -10, 6], [223, 296, -10, 8], [196, 260, -8, -8],
            [133, 176, -8, -6], [88, 116, -8, -4], [61, 80, -8, -2],
            [52, 68, -8, 0], [61, 80, -8, 2], [88, 116, -8, 4],
            [133, 176, -8, 6], [196, 260, -8, 8], [151, 200, -7, -7],
            [97, 128, -7, -5], [61, 80, -7, -3], [43, 56, -7, -1],
            [43, 56, -7, 1], [61, 80, -7, 3], [97, 128, -7, 5],
            [151, 200, -7, 7], [133, 176, -5, -7], [79, 104, -5, -5],
            [43, 56, -5, -3], [25, 32, -5, -1], [25, 32, -5, 1],
            [43, 56, -5, 3], [79, 104, -5, 5], [133, 176, -5, 7],
            [160, 212, -4, -8], [97, 128, -4, -6], [52, 68, -4, -4],
            [25, 32, -4, -2], [16, 20, -4, 0], [25, 32, -4, 2],
            [52, 68, -4, 4], [97, 128, -4, 6], [160, 212, -4, 8],
            [151, 200, -2, -8], [88, 116, -2, -6], [43, 56, -2, -4],
            [16, 20, -2, -2], [7, 8, -2, 0], [16, 20, -2, 2],
            [43, 56, -2, 4], [88, 116, -2, 6], [151, 200, -2, 8],
            [115, 152, -1, -7], [61, 80, -1, -5], [25, 32, -1, -3],
            [7, 8, -1, -1], [7, 8, -1, 1], [25, 32, -1, 3],
            [61, 80, -1, 5], [115, 152, -1, 7], [115, 152, 1, -7],
            [61, 80, 1, -5], [25, 32, 1, -3], [7, 8, 1, -1],
            [7, 8, 1, 1], [25, 32, 1, 3], [61, 80, 1, 5],
            [115, 152, 1, 7], [151, 200, 2, -8], [88, 116, 2, -6],
            [43, 56, 2, -4], [16, 20, 2, -2], [7, 8, 2, 0],
            [16, 20, 2, 2], [43, 56, 2, 4], [88, 116, 2, 6],
            [151, 200, 2, 8], [160, 212, 4, -8], [97, 128, 4, -6],
            [52, 68, 4, -4], [25, 32, 4, -2], [16, 20, 4, 0],
            [25, 32, 4, 2], [52, 68, 4, 4], [97, 128, 4, 6],
            [160, 212, 4, 8], [133, 176, 5, -7], [79, 104, 5, -5],
            [43, 56, 5, -3], [25, 32, 5, -1], [25, 32, 5, 1],
            [43, 56, 5, 3], [79, 104, 5, 5], [133, 176, 5, 7],
            [151, 200, 7, -7], [97, 128, 7, -5], [61, 80, 7, -3],
            [43, 56, 7, -1], [43, 56, 7, 1], [61, 80, 7, 3],
            [97, 128, 7, 5], [151, 200, 7, 7], [196, 260, 8, -8],
            [133, 176, 8, -6], [88, 116, 8, -4], [61, 80, 8, -2],
            [52, 68, 8, 0], [61, 80, 8, 2], [88, 116, 8, 4],
            [133, 176, 8, 6], [196, 260, 8, 8], [223, 296, 10, -8],
            [160, 212, 10, -6], [115, 152, 10, -4], [88, 116, 10, -2],
            [79, 104, 10, 0], [88, 116, 10, 2], [115, 152, 10, 4],
            [160, 212, 10, 6], [223, 296, 10, 8], [205, 272, 11, -7],
            [151, 200, 11, -5], [115, 152, 11, -3], [97, 128, 11, -1],
            [97, 128, 11, 1], [115, 152, 11, 3], [151, 200, 11, 5],
            [205, 272, 11, 7], [241, 320, 13, -7], [187, 248, 13, -5],
            [151, 200, 13, -3], [133, 176, 13, -1], [133, 176, 13, 1],
            [151, 200, 13, 3], [187, 248, 13, 5], [241, 320, 13, 7],
            [232, 308, 14, -6], [187, 248, 14, -4], [160, 212, 14, -2],
            [151, 200, 14, 0], [160, 212, 14, 2], [187, 248, 14, 4],
            [232, 308, 14, 6]
        ],

        edges: [
            [0, 8], [0, 9], [1, 9], [1, 10], [2, 10],
            [2, 11], [3, 11], [3, 12], [4, 12], [4, 13],
            [5, 13], [5, 14], [6, 14], [6, 15], [7, 15],
            [7, 16], [8, 17], [9, 18], [10, 19], [11, 20],
            [12, 21], [13, 22], [14, 23], [15, 24], [16, 25],
            [17, 26], [18, 26], [18, 27], [19, 27], [19, 28],
            [20, 28], [20, 29], [21, 29], [21, 30], [22, 30],
            [22, 31], [23, 31], [23, 32], [24, 32], [24, 33],
            [25, 33], [26, 34], [27, 35], [28, 36], [29, 37],
            [30, 38], [31, 39], [32, 40], [33, 41], [34, 42],
            [34, 43], [35, 43], [35, 44], [36, 44], [36, 45],
            [37, 45], [37, 46], [38, 46], [38, 47], [39, 47],
            [39, 48], [40, 48], [40, 49], [41, 49], [41, 50],
            [42, 51], [43, 52], [44, 53], [45, 54], [46, 55],
            [47, 56], [48, 57], [49, 58], [50, 59], [51, 60],
            [52, 60], [52, 61], [53, 61], [53, 62], [54, 62],
            [54, 63], [55, 63], [55, 64], [56, 64], [56, 65],
            [57, 65], [57, 66], [58, 66], [58, 67], [59, 67],
            [60, 68], [61, 69], [62, 70], [63, 71], [64, 72],
            [65, 73], [66, 74], [67, 75], [68, 76], [68, 77],
            [69, 77], [69, 78], [70, 78], [70, 79], [71, 79],
            [71, 80], [72, 80], [72, 81], [73, 81], [73, 82],
            [74, 82], [74, 83], [75, 83], [75, 84], [76, 85],
            [77, 86], [78, 87], [79, 88], [80, 89], [81, 90],
            [82, 91], [83, 92], [84, 93], [85, 94], [86, 94],
            [86, 95], [87, 95], [87, 96], [88, 96], [88, 97],
            [89, 97], [89, 98], [90, 98], [90, 99], [91, 99],
            [91, 100], [92, 100], [92, 101], [93, 101], [94, 102],
            [95, 103], [96, 104], [97, 105], [98, 106], [99, 107],
            [100, 108], [101, 109], [102, 110], [102, 111], [103, 111],
            [103, 112], [104, 112], [104, 113], [105, 113], [105, 114],
            [106, 114], [106, 115], [107, 115], [107, 116], [108, 116],
            [108, 117], [109, 117], [109, 118], [110, 119], [111, 120],
            [112, 121], [113, 122], [114, 123], [115, 124], [116, 125],
            [117, 126], [118, 127], [119, 128], [120, 128], [120, 129],
            [121, 129], [121, 130], [122, 130], [122, 131], [123, 131],
            [123, 132], [124, 132], [124, 133], [125, 133], [125, 134],
            [126, 134], [126, 135], [127, 135], [128, 136], [129, 137],
            [130, 138], [131, 139], [132, 140], [133, 141], [134, 142],
            [135, 143], [136, 144], [137, 144], [137, 145], [138, 145],
            [138, 146], [139, 146], [139, 147], [140, 147], [140, 148],
            [141, 148], [141, 149], [142, 149], [142, 150], [143, 150]
        ],

        faces: [
            [80, 72, 64, 55, 63, 71],
            [98, 90, 81, 72, 80, 89],
            [97, 89, 80, 71, 79, 88],
            [81, 73, 65, 56, 64, 72],
            [79, 71, 63, 54, 62, 70],
            [64, 56, 47, 38, 46, 55],
            [114, 106, 98, 89, 97, 105],
            [63, 55, 46, 37, 45, 54],
            [99, 91, 82, 73, 81, 90],
            [115, 107, 99, 90, 98, 106],
            [96, 88, 79, 70, 78, 87],
            [113, 105, 97, 88, 96, 104],
            [65, 57, 48, 39, 47, 56],
            [82, 74, 66, 57, 65, 73],
            [62, 54, 45, 36, 44, 53],
            [78, 70, 62, 53, 61, 69],
            [46, 38, 30, 21, 29, 37],
            [132, 124, 115, 106, 114, 123],
            [47, 39, 31, 22, 30, 38],
            [131, 123, 114, 105, 113, 122],
            [116, 108, 100, 91, 99, 107],
            [45, 37, 29, 20, 28, 36],
            [100, 92, 83, 74, 82, 91],
            [112, 104, 96, 87, 95, 103],
            [133, 125, 116, 107, 115, 124],
            [95, 87, 78, 69, 77, 86],
            [66, 58, 49, 40, 48, 57],
            [130, 122, 113, 104, 112, 121],
            [48, 40, 32, 23, 31, 39],
            [61, 53, 44, 35, 43, 52],
            [83, 75, 67, 58, 66, 74],
            [44, 36, 28, 19, 27, 35],
            [30, 22, 13, 4, 12, 21],
            [147, 140, 132, 123, 131, 139],
            [77, 69, 61, 52, 60, 68],
            [29, 21, 12, 3, 11, 20],
            [148, 141, 133, 124, 132, 140],
            [117, 109, 101, 92, 100, 108],
            [31, 23, 14, 5, 13, 22],
            [146, 139, 131, 122, 130, 138],
            [134, 126, 117, 108, 116, 125],
            [111, 103, 95, 86, 94, 102],
            [28, 20, 11, 2, 10, 19],
            [101, 93, 84, 75, 83, 92],
            [129, 121, 112, 103, 111, 120],
            [49, 41, 33, 24, 32, 40],
            [149, 142, 134, 125, 133, 141],
            [94, 86, 77, 68, 76, 85],
            [67, 59, 50, 41, 49, 58],
            [43, 35, 27, 18, 26, 34],
            [145, 138, 130, 121, 129, 137],
            [32, 24, 15, 6, 14, 23],
            [60, 52, 43, 34, 42, 51],
            [27, 19, 10, 1, 9, 18],
            [135, 127, 118, 109, 117, 126],
            [128, 120, 111, 102, 110, 119],
            [150, 143, 135, 126, 134, 142],
            [144, 137, 129, 120, 128, 136],
            [33, 25, 16, 7, 15, 24],
            [26, 18, 9, 0, 8, 17]
        ],

        numVertices: 151,

        numEdges: 210,

        numFaces: 60,

        numSides: 6,

        // cfe
        a: (v) => {

            return [v[0], v[1], (v[2] + 3 * v[3]) / 2, (v[2] - v[3]) / 2];

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

            if (n == 6) {

                var c = 3 / 4;

            } else {

                var c = Math.cos(Math.PI / n) ** 2;

            }

            return [
                (1 + 2 * c) * v[0] - 2 * (c ** 2) * v[1] - c * v[2] - c * v[3],
                2 * v[0] + (1 - 2 * c) * v[1] - v[2] - v[3],
                3 * v[0] - 3 * c * v[1] - v[2] / 2 - 3 * v[3] / 2,
                v[0] - c * v[1] - v[2] / 2 + v[3] / 2
            ];

        },

        e: (v) => {

            return [v[0], v[1], v[2], v[3]];

        },

        f: (v) => {

            if (n == 6) {

                return [
                    Math.sqrt(3) * v[0],
                    Math.sqrt(27 / 16) * v[1],
                    Math.sqrt(3 / 4) * v[2],
                    Math.sqrt(9 / 4) * v[3]
                ];

            } else {

                const c = Math.cos(Math.PI / n) ** 2;
                const den = Math.sqrt(Math.abs(3 - 4 * c));

                return [
                    Math.sqrt(3) * v[0] / den,
                    Math.sqrt(3) * c * v[1] / den,
                    Math.sqrt(c) * v[2] / den,
                    Math.sqrt(3 * c) * v[3] / den
                ];

            }

        },

        faceReflections: [
            '',
            'd',
            'bd',
            'abd',
            'babd',
            'ababd',
            'dbabd',
            'bababd',
            'dababd',
            'dbababd',
            'bdababd',
            'bdbababd',
            'abdababd',
            'abdbababd',
            'babdababd',
            'babdbababd',
            'ababdababd',
            'dbabdababd',
            'ababdbababd',
            'dbabdbababd',
            'dababdababd',
            'bababdbababd',
            'dababdbababd',
            'bdababdababd',
            'dbababdbababd',
            'bdababdbababd',
            'abdababdababd',
            'bdbababdbababd',
            'abdababdbababd',
            'babdababdababd',
            'abdbababdbababd',
            'babdababdbababd',
            'ababdababdababd',
            'dbabdababdababd',
            'babdbababdbababd',
            'ababdababdbababd',
            'dbabdababdbababd',
            'dababdababdababd',
            'ababdbababdbababd',
            'dbabdbababdbababd',
            'dababdababdbababd',
            'bdababdababdababd',
            'bababdbababdbababd',
            'dababdbababdbababd',
            'bdababdababdbababd',
            'abdababdababdababd',
            'dbababdbababdbababd',
            'bdababdbababdbababd',
            'abdababdababdbababd',
            'babdababdababdababd',
            'bdbababdbababdbababd',
            'abdababdbababdbababd',
            'babdababdababdbababd',
            'babdababdbababdbababd',
            'dababdababdababdababd',
            'bdababdababdababdababd',
            'dababdababdbababdbababd',
            'bdababdababdbababdbababd',
            'abdababdababdababdbababd',
            'babdababdababdababdbababd'
        ],

        outerReflection: "c",

        conversion: (v) => {

            var c = Math.cos(Math.PI / n) ** 2;
            return [1 + c * (v[1] - 8) / 6, (v[1] - 8) / 6, v[2], v[3]];

        },

        center: [1, 1, 0, 0],

        face: () => {

            if (n == 6) {

                return [1, 0, 0, 0];

            } else {

                var c = Math.cos(Math.PI / n) ** 2;
                return [Math.sqrt(Math.abs(1 - 4 * c / 3)), 0, 0, 0];

            }

        },

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

                return "hyperbolic";

            }

        },

        // TODO what goes in the else columnn?
        compact: () => {

            if (n == 3) {

                return "paracompact";

            } else if (n == 4) {

                return "paracompact";

            } else if (n == 5) {

                return "paracompact";

            } else if (n == 6) {

                return "paracompact";

            } else {

                return "uncompact";

            }

        },

        cellType: "euclidean"

    }

}

export { hexagonData };

// const data = hexagonData(6);

// console.log(data.vertices.length)
// console.log(data.edges.length)
// console.log(data.faces.length)

// var usedVerts = [];

// for (var i = 0; i < data.numFaces; i++) {
//     data.faces[i].forEach((num) => {
//         console.log(num)
//         if (!usedVerts.includes(num)) {
//             usedVerts.push(num);
//         }
//     })
// }

// usedVerts.sort((a, b) => a - b);

// // console.log(usedVerts, usedVerts.length)

// var newVerts = [];
// usedVerts.forEach((num) => {
//     newVerts.push(data.vertices[num]);
// })
// //console.log(newVerts.slice(0, 99))
// //console.log(newVerts.slice(99, 200))

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
//         usedVerts.indexOf(face[4]),
//         usedVerts.indexOf(face[5])
//     ]);
// })

// console.log(newFaces);


// const edges = [];
// for (var i = 0; i < data.vertices.length; i++) {
//     for (var j = i + 1; j < data.vertices.length; j++) {
//         if ((Math.abs(data.vertices[i][2] - data.vertices[j][2]) == 2) && (Math.abs(data.vertices[i][3] - data.vertices[j][3]) == 0)) {
//             edges.push([i, j]);
//         } else if ((Math.abs(data.vertices[i][2] - data.vertices[j][2]) == 1) && (Math.abs(data.vertices[i][3] - data.vertices[j][3]) == 1)) {
//             edges.push([i, j]);
//         }

//     }

// }
// console.log(edges.slice(0, 100))
// console.log(edges.slice(100, 200))
// console.log(edges.slice(200, 300))
// console.log(edges.slice(300, 400))
// console.log(edges.slice(400, 500))
// console.log(hexagonData.vertices.length)
// console.log(edges.length)
// console.log(hexagonData.faces.length)

// const numOfPoints = 4;

// function generatePoints(n) {

//     if (n == 6) {

//         var c = 3 / 4;

//     } else {

//         var c = Math.cos(Math.PI / n) ** 2;

//     }

//     var vertices = [];

//     for (var i = 1 - 3 * numOfPoints; i <= 3 * numOfPoints + 2; i++) {

//         for (var j = -2 * numOfPoints; j <= 2 * numOfPoints; j++) {

//             if (i % 3 != 0) {

//                 const x = i ** 2 + 3 * j ** 2 + 4;
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

// var points = generatePoints(6);
// //console.log(points.slice(0, 99));
// //console.log(points.slice(99, 198));
// //console.log(points.slice(198, 297));
// //console.log(points.slice(297));
// var [names, centers] = generateFaces(6, 200);
// //console.log(names, centers)

// function generateFaceVertex() {
//     var grouping = [];
//     var newNames = [];
//     for (var i = 0; i < centers.length; i++) {
//         var corners = [];
//         for (var j = 0; j < points.length; j++) {
//             if (Math.abs(points[j][2] - centers[i][2]) + Math.abs(points[j][3] - centers[i][3]) == 2) {
//                 corners.push(j);
//             }
//         }

//         if (corners.length == 6) {
//             console.log(i, centers[i], corners);
//             corners.forEach((elem) => { console.log(elem, points[elem]) });
//             grouping.push(corners);
//             newNames.push(names[i]);
//         }
//     }

//     return [grouping, newNames];
// }

// var fauxFaces = generateFaceVertex();
// console.log(fauxFaces[1])


// function tidyFaces() {
//     var tidy = [];
//     data.faces.forEach((face) => {
//         console.log(face)
//         var newList = [0, 0, 0, 0, 0, 0];
//         var v1 = data.vertices[face[0]], v2 = data.vertices[face[1]], v3 = data.vertices[face[2]], v4 = data.vertices[face[3]], v5 = data.vertices[face[4]], v6 = data.vertices[face[5]];
//         var v = [v1, v2, v3, v4, v5, v6];
//         var cx = (v1[2] + v2[2] + v3[2] + v4[2] + v5[2] + v6[2]) / 6;
//         var cy = (v1[3] + v2[3] + v3[3] + v4[3] + v5[3] + v6[3]) / 6;
//         for (var i = 0; i < 6; i++) {
//             if (v[i][2] - cx == 2) {
//                 newList[0] = face[i];
//             } else if (v[i][2] - cx == -2) {
//                 newList[3] = face[i];
//             } else if (v[i][2] - cx == 1) {
//                 if (v[i][3] - cy == 1) {
//                     newList[1] = face[i];
//                 } else {
//                     newList[5] = face[i];
//                 }
//             } else if (v[i][2] - cx == -1) {
//                 if (v[i][3] - cy == 1) {
//                     newList[2] = face[i];
//                 } else {
//                     newList[4] = face[i];
//                 }
//             }
//         }
//         tidy.push(newList);

//     })
//     return tidy;
// }

// console.log(tidyFaces());

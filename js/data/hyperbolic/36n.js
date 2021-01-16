// Order n triangular

const vertices = [
    [121.5, 2, -9], [96, 2, -8], [73.5, 2, -7], [54, 2, -6],
    [37.5, 2, -5], [24, 2, -4], [13.5, 2, -3], [6, 2, -2],
    [1.5, 2, -1], [0, 2, 0], [1.5, 2, 1], [6, 2, 2],
    [13.5, 2, 3], [24, 2, 4], [37.5, 2, 5], [54, 2, 6],
    [73.5, 2, 7], [96, 2, 8], [121.5, 2, 9], [132, 5, -9],
    [106.5, 5, -8], [84, 5, -7], [64.5, 5, -6], [48, 5, -5],
    [34.5, 5, -4], [24, 5, -3], [16.5, 5, -2], [12, 5, -1],
    [10.5, 5, 0], [12, 5, 1], [16.5, 5, 2], [24, 5, 3],
    [34.5, 5, 4], [48, 5, 5], [64.5, 5, 6], [84, 5, 7],
    [106.5, 5, 8], [132, 5, 9], [151.5, 8, -9], [126, 8, -8],
    [103.5, 8, -7], [84, 8, -6], [67.5, 8, -5], [54, 8, -4],
    [43.5, 8, -3], [36, 8, -2], [31.5, 8, -1], [30, 8, 0],
    [31.5, 8, 1], [36, 8, 2], [43.5, 8, 3], [54, 8, 4],
    [67.5, 8, 5], [84, 8, 6], [103.5, 8, 7], [126, 8, 8],
    [151.5, 8, 9], [180, 11, -9], [154.5, 11, -8], [132, 11, -7],
    [112.5, 11, -6], [96, 11, -5], [82.5, 11, -4], [72, 11, -3],
    [64.5, 11, -2], [60, 11, -1], [58.5, 11, 0], [60, 11, 1],
    [64.5, 11, 2], [72, 11, 3], [82.5, 11, 4], [96, 11, 5],
    [112.5, 11, 6], [132, 11, 7], [154.5, 11, 8], [180, 11, 9],
    [217.5, 14, -9], [192, 14, -8], [169.5, 14, -7], [150, 14, -6],
    [133.5, 14, -5], [120, 14, -4], [109.5, 14, -3], [102, 14, -2],
    [97.5, 14, -1], [96, 14, 0], [97.5, 14, 1], [102, 14, 2],
    [109.5, 14, 3], [120, 14, 4], [133.5, 14, 5], [150, 14, 6],
    [169.5, 14, 7], [192, 14, 8], [217.5, 14, 9], [264, 17, -9],
    [238.5, 17, -8], [216, 17, -7], [196.5, 17, -6],
    [180, 17, -5], [166.5, 17, -4], [156, 17, -3],
    [148.5, 17, -2], [144, 17, -1], [142.5, 17, 0],
    [144, 17, 1], [148.5, 17, 2], [156, 17, 3],
    [166.5, 17, 4], [180, 17, 5], [196.5, 17, 6],
    [216, 17, 7], [238.5, 17, 8], [264, 17, 9],
    [319.5, 20, -9], [294, 20, -8], [271.5, 20, -7],
    [252, 20, -6], [235.5, 20, -5], [222, 20, -4],
    [211.5, 20, -3], [204, 20, -2], [199.5, 20, -1],
    [198, 20, 0], [199.5, 20, 1], [204, 20, 2],
    [211.5, 20, 3], [222, 20, 4], [235.5, 20, 5],
    [252, 20, 6], [271.5, 20, 7], [294, 20, 8],
    [319.5, 20, 9], [384, 23, -9], [358.5, 23, -8],
    [336, 23, -7], [316.5, 23, -6], [300, 23, -5],
    [286.5, 23, -4], [276, 23, -3], [268.5, 23, -2],
    [264, 23, -1], [262.5, 23, 0], [264, 23, 1],
    [268.5, 23, 2], [276, 23, 3], [286.5, 23, 4],
    [300, 23, 5], [316.5, 23, 6], [336, 23, 7],
    [358.5, 23, 8], [384, 23, 9], [457.5, 26, -9],
    [432, 26, -8], [409.5, 26, -7], [390, 26, -6],
    [373.5, 26, -5], [360, 26, -4], [349.5, 26, -3],
    [342, 26, -2], [337.5, 26, -1], [336, 26, 0],
    [337.5, 26, 1], [342, 26, 2], [349.5, 26, 3],
    [360, 26, 4], [373.5, 26, 5], [390, 26, 6],
    [409.5, 26, 7], [432, 26, 8], [457.5, 26, 9]
];


const faces = [
    [9, 11, 29], [7, 9, 27], [9, 27, 29], [11, 29, 31],
    [7, 25, 27], [27, 29, 47], [11, 13, 31], [29, 31, 49],
    [5, 7, 25], [25, 27, 45], [29, 47, 49], [27, 45, 47],
    [13, 31, 33], [31, 49, 51], [5, 23, 25], [25, 43, 45],
    [47, 49, 67], [31, 33, 51], [45, 47, 65], [13, 15, 33],
    [23, 25, 43], [49, 51, 69], [3, 5, 23], [47, 65, 67],
    [43, 45, 63], [49, 67, 69], [33, 51, 53], [45, 63, 65],
    [15, 33, 35], [23, 41, 43], [51, 69, 71], [3, 21, 23],
    [65, 67, 85], [33, 35, 53], [43, 61, 63], [67, 69, 87],
    [51, 53, 71], [21, 23, 41], [63, 65, 83], [15, 17, 35],
    [41, 43, 61], [67, 85, 87], [69, 71, 89], [1, 3, 21],
    [65, 83, 85], [35, 53, 55], [61, 63, 81], [69, 87, 89],
    [53, 71, 73], [21, 39, 41], [63, 81, 83], [17, 35, 37],
    [41, 59, 61], [85, 87, 105], [53, 55, 73], [71, 89, 91],
    [1, 19, 21], [83, 85, 103], [35, 37, 55], [39, 41, 59],
    [61, 79, 81], [87, 89, 107], [71, 73, 91], [19, 21, 39],
    [85, 103, 105], [81, 83, 101], [59, 61, 79], [87, 105, 107],
    [55, 73, 75], [89, 91, 109], [83, 101, 103], [39, 57, 59],
    [79, 81, 99], [89, 107, 109], [73, 91, 93], [103, 105, 123],
    [81, 99, 101], [59, 77, 79], [105, 107, 125], [73, 75, 93],
    [91, 109, 111], [101, 103, 121], [57, 59, 77], [105, 123, 125],
    [79, 97, 99], [107, 109, 127], [91, 93, 111], [103, 121, 123],
    [99, 101, 119], [77, 79, 97], [107, 125, 127], [109, 111, 129],
    [101, 119, 121], [123, 125, 143], [97, 99, 117], [109, 127, 129],
    [93, 111, 113], [121, 123, 141], [99, 117, 119],
    [77, 95, 97], [125, 127, 145],
    [123, 141, 143], [111, 129, 131],
    [119, 121, 139], [125, 143, 145],
    [97, 115, 117], [127, 129, 147],
    [111, 113, 131], [121, 139, 141],
    [117, 119, 137], [95, 97, 115],
    [127, 145, 147], [141, 143, 161],
    [129, 131, 149], [119, 137, 139],
    [143, 145, 163], [115, 117, 135],
    [129, 147, 149], [139, 141, 159],
    [143, 161, 163], [117, 135, 137],
    [145, 147, 165], [141, 159, 161],
    [131, 149, 151], [137, 139, 157],
    [145, 163, 165], [115, 133, 135],
    [147, 149, 167], [139, 157, 159],
    [135, 137, 155], [147, 165, 167],
    [149, 151, 169], [137, 155, 157],
    [133, 135, 153], [149, 167, 169],
    [135, 153, 155]
];


// cfe
function a(v) {

    return [v[0], v[1], (-v[2] + 3 * v[3]) / 2, (v[2] + v[3]) / 2];

}


//cfv
function b(v) {

    return [v[0], v[1], v[2], -v[3]];

}


//fev
function c(v) {

    return [v[0], -v[1], v[2], v[3]];

}


//cev

// CHANGE
function d(n, v) {

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

}


function e(v) {

    return [v[0], v[1], v[2], v[3]];

}


function f(n, v) {

    if (n == 4) {

        return [
            v[0],
            v[1] / 4,
            v[2] / 2,
            3 * v[3] / 2
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

}


function conversion(n, v) {

    var c = Math.cos(Math.PI / n) ** 2;
    return [1 + c * v[0], v[0], v[1], v[2]];

}


function matrixDict(order, letter, vector) {

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

}


function face(n) {

    if (n == 3) {

        return [1, 0, 0, 0];

    } else {

        var c = Math.cos(Math.PI / n) ** 2;
        return [Math.sqrt(Math.abs(1 - 4 * c)), 0, 0, 0];

    }

}


const faceReflections = [
    'dbd',
    'bdbd',
    'dbdbd',
    'dbdabd',
    'bdbdabd',
    'dbdbdabd',
    'dbdabdbd',
    'dbdabdabd',
    'bdbdabdbd',
    'bdbdabdabd',
    'dbdbdabdbd',
    'dbdbdabdabd',
    'dbdabdbdabd',
    'dbdabdabdabd',
    'bdbdabdbdabd',
    'bdbdabdabdabd',
    'dbdbdabdbdabd',
    'dbdabdbdabdbd',
    'dbdbdabdabdabd',
    'dbdabdbdabdabd',
    'bdbdabdbdabdbd',
    'dbdabdabdabdabd',
    'bdbdabdbdabdabd',
    'dbdbdabdbdabdbd',
    'bdbdabdabdabdabd',
    'dbdbdabdbdabdabd',
    'dbdabdbdabdbdabd',
    'dbdbdabdabdabdabd',
    'dbdabdbdabdabdabd',
    'bdbdabdbdabdbdabd',
    'dbdabdabdabdabdabd',
    'bdbdabdbdabdabdabd',
    'dbdbdabdbdabdbdabd',
    'dbdabdbdabdbdabdbd',
    'bdbdabdabdabdabdabd',
    'dbdbdabdbdabdabdabd',
    'dbdabdbdabdbdabdabd',
    'bdbdabdbdabdbdabdbd',
    'dbdbdabdabdabdabdabd',
    'dbdabdbdabdabdabdabd',
    'bdbdabdbdabdbdabdabd',
    'dbdbdabdbdabdbdabdbd',
    'dbdabdabdabdabdabdabd',
    'bdbdabdbdabdabdabdabd',
    'dbdbdabdbdabdbdabdabd',
    'dbdabdbdabdbdabdbdabd',
    'bdbdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabd',
    'dbdabdbdabdbdabdabdabd',
    'bdbdabdbdabdbdabdbdabd',
    'dbdbdabdabdabdabdabdabd',
    'dbdabdbdabdabdabdabdabd',
    'bdbdabdbdabdbdabdabdabd',
    'dbdbdabdbdabdbdabdbdabd',
    'dbdabdbdabdbdabdbdabdbd',
    'dbdabdabdabdabdabdabdabd',
    'bdbdabdbdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdabdabd',
    'dbdabdbdabdbdabdbdabdabd',
    'bdbdabdbdabdbdabdbdabdbd',
    'bdbdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabdabd',
    'dbdabdbdabdbdabdabdabdabd',
    'bdbdabdbdabdbdabdbdabdabd',
    'dbdbdabdbdabdbdabdbdabdbd',
    'dbdbdabdabdabdabdabdabdabd',
    'bdbdabdbdabdbdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdabd',
    'dbdabdbdabdbdabdbdabdbdabd',
    'dbdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdabdabdabd',
    'bdbdabdbdabdbdabdbdabdbdabd',
    'bdbdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabdabdabd',
    'dbdabdbdabdbdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabd',
    'dbdbdabdabdabdabdabdabdabdabd',
    'bdbdabdbdabdbdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdabdabd',
    'dbdabdbdabdbdabdbdabdbdabdabd',
    'dbdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdabdabdabdabd',
    'bdbdabdbdabdbdabdbdabdbdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbd',
    'bdbdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabdabdabdabd',
    'dbdabdbdabdbdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdabd',
    'dbdbdabdabdabdabdabdabdabdabdabd',
    'bdbdabdbdabdbdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdabdabdabd',
    'dbdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbdabd',
    'bdbdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabdabdabdabdabd',
    'dbdabdbdabdbdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdabdabd',
    'dbdbdabdabdabdabdabdabdabdabdabdabd',
    'bdbdabdbdabdbdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbdabdbd',
    'dbdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbdabdabd',
    'bdbdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabdabdabdabdabdabd',
    'dbdabdbdabdbdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdabdabdabd',
    'dbdbdabdabdabdabdabdabdabdabdabdabdabd',
    'bdbdabdbdabdbdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbdabdbdabd',
    'dbdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbdabdabdabd',
    'bdbdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbdabdbdabdbd',
    'dbdbdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbdabdbdabdabd',
    'dbdabdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdbdabdabdabdabd',
    'bdbdabdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdbdabdabdabdabdabdabd',
    'dbdbdabdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdbdabdabdabdabdabdabdabdabd',
    'dbdabdabdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdbdabdabdabdabdabdabdabdabdabdabd',
    'bdbdabdabdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdbdabdabdabdabdabdabdabdabdabdabdabdabd',
    'dbdbdabdabdabdabdabdabdabdabdabdabdabdabdabdabd'
];


const center = [1, 1, 0, 0];


export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center, face, conversion };
//console.log(faces.length)
// const numOfPoints = 9;

// function generatePoints(n) {

//     var vertices = [];

//     for (var i = -3 * numOfPoints + 2; i <= 3 * numOfPoints - 1; i++) {

//         for (var j = -numOfPoints; j <= numOfPoints; j++) {

//             if (i % 3 == 2) {

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
// //console.log(points.slice(99));
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

//     return grouping;
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

// console.log(tidyFaces());
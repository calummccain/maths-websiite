// Order n square

const vertices = [
    [43, 84, -7, -6], [33, 64, -7, -4], [27, 52, -7, -2],
    [25, 48, -7, 0], [25.5, 49, -7, 1], [27, 52, -7, 2],
    [29.5, 57, -7, 3], [33, 64, -7, 4], [37.5, 73, -7, 5],
    [43, 84, -7, 6], [49.5, 97, -7, 7], [43, 84, -6, -7],
    [31, 60, -6, -5], [23, 44, -6, -3], [19, 36, -6, -1],
    [19, 36, -6, 1], [23, 44, -6, 3], [31, 60, -6, 5],
    [43, 84, -6, 7], [31, 60, -5, -6], [21, 40, -5, -4],
    [15, 28, -5, -2], [13, 24, -5, 0], [13.5, 25, -5, 1],
    [15, 28, -5, 2], [17.5, 33, -5, 3], [21, 40, -5, 4],
    [25.5, 49, -5, 5], [31, 60, -5, 6], [37.5, 73, -5, 7],
    [33, 64, -4, -7], [21, 40, -4, -5], [13, 24, -4, -3],
    [9, 16, -4, -1], [9, 16, -4, 1], [13, 24, -4, 3],
    [21, 40, -4, 5], [33, 64, -4, 7], [23, 44, -3, -6],
    [13, 24, -3, -4], [7, 12, -3, -2], [5, 8, -3, 0],
    [5.5, 9, -3, 1], [7, 12, -3, 2], [9.5, 17, -3, 3],
    [13, 24, -3, 4], [17.5, 33, -3, 5], [23, 44, -3, 6],
    [29.5, 57, -3, 7], [27, 52, -2, -7], [15, 28, -2, -5],
    [7, 12, -2, -3], [3, 4, -2, -1], [3, 4, -2, 1],
    [7, 12, -2, 3], [15, 28, -2, 5], [27, 52, -2, 7],
    [19, 36, -1, -6], [9, 16, -1, -4], [3, 4, -1, -2],
    [1, 0, -1, 0], [1.5, 1, -1, 1], [3, 4, -1, 2],
    [5.5, 9, -1, 3], [9, 16, -1, 4], [13.5, 25, -1, 5],
    [19, 36, -1, 6], [25.5, 49, -1, 7], [25, 48, 0, -7],
    [13, 24, 0, -5], [5, 8, 0, -3], [1, 0, 0, -1],
    [1, 0, 0, 1], [5, 8, 0, 3], [13, 24, 0, 5],
    [25, 48, 0, 7], [25.5, 49, 1, -7], [19, 36, 1, -6],
    [13.5, 25, 1, -5], [9, 16, 1, -4], [5.5, 9, 1, -3],
    [3, 4, 1, -2], [1.5, 1, 1, -1], [1, 0, 1, 0],
    [3, 4, 1, 2], [9, 16, 1, 4], [19, 36, 1, 6],
    [27, 52, 2, -7], [15, 28, 2, -5], [7, 12, 2, -3],
    [3, 4, 2, -1], [3, 4, 2, 1], [7, 12, 2, 3],
    [15, 28, 2, 5], [27, 52, 2, 7], [29.5, 57, 3, -7],
    [23, 44, 3, -6], [17.5, 33, 3, -5], [13, 24, 3, -4],
    [9.5, 17, 3, -3], [7, 12, 3, -2], [5.5, 9, 3, -1],
    [5, 8, 3, 0], [7, 12, 3, 2], [13, 24, 3, 4],
    [23, 44, 3, 6], [33, 64, 4, -7], [21, 40, 4, -5],
    [13, 24, 4, -3], [9, 16, 4, -1], [9, 16, 4, 1],
    [13, 24, 4, 3], [21, 40, 4, 5], [33, 64, 4, 7],
    [37.5, 73, 5, -7], [31, 60, 5, -6], [25.5, 49, 5, -5],
    [21, 40, 5, -4], [17.5, 33, 5, -3], [15, 28, 5, -2],
    [13.5, 25, 5, -1], [13, 24, 5, 0], [15, 28, 5, 2],
    [21, 40, 5, 4], [31, 60, 5, 6], [43, 84, 6, -7],
    [31, 60, 6, -5], [23, 44, 6, -3], [19, 36, 6, -1],
    [19, 36, 6, 1], [23, 44, 6, 3], [31, 60, 6, 5],
    [43, 84, 6, 7], [49.5, 97, 7, -7], [43, 84, 7, -6],
    [37.5, 73, 7, -5], [33, 64, 7, -4], [29.5, 57, 7, -3],
    [27, 52, 7, -2], [25.5, 49, 7, -1], [25, 48, 7, 0],
    [27, 52, 7, 2], [33, 64, 7, 4], [43, 84, 7, 6]
];


const faces = [
    [83, 72, 60, 71], [91, 84, 72, 83], [90, 83, 71, 81],
    [72, 62, 53, 60], [102, 91, 83, 90], [71, 60, 52, 59],
    [84, 73, 62, 72], [103, 92, 84, 91], [81, 71, 59, 70],
    [100, 90, 81, 89], [60, 53, 41, 52], [110, 103, 91, 102],
    [62, 54, 43, 53], [109, 102, 90, 100], [92, 85, 73, 84],
    [59, 52, 40, 51], [73, 64, 54, 62], [89, 81, 70, 79],
    [111, 104, 92, 103], [70, 59, 51, 58], [53, 43, 34, 41],
    [121, 110, 102, 109], [108, 100, 89, 98], [52, 41, 33, 40],
    [122, 111, 103, 110], [85, 74, 64, 73], [54, 45, 35, 43],
    [119, 109, 100, 108], [104, 93, 85, 92], [79, 70, 58, 69],
    [51, 40, 32, 39], [64, 55, 45, 54], [98, 89, 79, 88],
    [41, 34, 22, 33], [129, 122, 110, 121], [123, 112, 104, 111],
    [58, 51, 39, 50], [43, 35, 24, 34], [128, 121, 109, 119],
    [93, 86, 74, 85], [117, 108, 98, 107], [40, 33, 21, 32],
    [130, 123, 111, 122], [74, 66, 55, 64], [88, 79, 69, 77],
    [45, 36, 26, 35], [127, 119, 108, 117], [112, 105, 93, 104],
    [69, 58, 50, 57], [34, 24, 15, 22], [140, 129, 121, 128],
    [39, 32, 20, 31], [55, 47, 36, 45], [107, 98, 88, 96],
    [33, 22, 14, 21], [141, 130, 122, 129], [86, 75, 66, 74],
    [131, 124, 112, 123], [50, 39, 31, 38], [35, 26, 16, 24],
    [138, 128, 119, 127], [105, 94, 86, 93], [77, 69, 57, 68],
    [126, 117, 107, 115], [32, 21, 13, 20], [142, 131, 123, 130],
    [66, 56, 47, 55], [96, 88, 77, 87], [22, 15, 3, 14],
    [36, 28, 17, 26], [136, 127, 117, 126], [124, 113, 105, 112],
    [57, 50, 38, 49], [24, 16, 5, 15], [31, 20, 12, 19],
    [47, 37, 28, 36], [115, 107, 96, 106], [21, 14, 2, 13],
    [143, 132, 124, 131], [38, 31, 19, 30], [26, 17, 7, 16],
    [134, 126, 115, 125], [20, 13, 1, 12], [28, 18, 9, 17],
    [19, 12, 0, 11]
];


// cfe
function a(v) {

    return [v[0], v[1], v[3], v[2]];

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
function d(n, v) {

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

}


function e(v) {

    return [v[0], v[1], v[2], v[3]];

}


function f(n, v) {

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

}


function conversion(n, v) {

    var c = Math.cos(Math.PI / n) ** 2;
    return [1 + c * v[1], v[1], v[2], v[3]];

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

    if (n == 4) {

        return [1, 0, 0, 0];

    } else {

        var c = Math.cos(Math.PI / n) ** 2;
        return [Math.sqrt(Math.abs(1 - 2 * c)), 0, 0, 0];

    }

}


const faceReflections = [
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
];


const center = [1, 1, 0, 0];


export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center, face, conversion };

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
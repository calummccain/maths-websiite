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
    [60, 71, 72, 83], [72, 83, 84, 91], [71, 81, 83, 90],
    [53, 60, 62, 72], [83, 90, 91, 102], [52, 59, 60, 71],
    [62, 72, 73, 84], [84, 91, 92, 103], [59, 70, 71, 81],
    [81, 89, 90, 100], [41, 52, 53, 60], [91, 102, 103, 110],
    [43, 53, 54, 62], [90, 100, 102, 109], [73, 84, 85, 92],
    [40, 51, 52, 59], [54, 62, 64, 73], [70, 79, 81, 89],
    [92, 103, 104, 111], [51, 58, 59, 70], [34, 41, 43, 53],
    [102, 109, 110, 121], [89, 98, 100, 108], [33, 40, 41, 52],
    [103, 110, 111, 122], [64, 73, 74, 85], [35, 43, 45, 54],
    [100, 108, 109, 119], [85, 92, 93, 104], [58, 69, 70, 79],
    [32, 39, 40, 51], [45, 54, 55, 64], [79, 88, 89, 98],
    [22, 33, 34, 41], [110, 121, 122, 129], [104, 111, 112, 123],
    [39, 50, 51, 58], [24, 34, 35, 43], [109, 119, 121, 128],
    [74, 85, 86, 93], [98, 107, 108, 117], [21, 32, 33, 40],
    [111, 122, 123, 130], [55, 64, 66, 74], [69, 77, 79, 88],
    [26, 35, 36, 45], [108, 117, 119, 127], [93, 104, 105, 112],
    [50, 57, 58, 69], [15, 22, 24, 34], [121, 128, 129, 140],
    [20, 31, 32, 39], [36, 45, 47, 55], [88, 96, 98, 107],
    [14, 21, 22, 33], [122, 129, 130, 141], [66, 74, 75, 86],
    [112, 123, 124, 131], [31, 38, 39, 50], [16, 24, 26, 35],
    [119, 127, 128, 138], [86, 93, 94, 105], [57, 68, 69, 77],
    [107, 115, 117, 126], [13, 20, 21, 32], [123, 130, 131, 142],
    [47, 55, 56, 66], [77, 87, 88, 96], [3, 14, 15, 22],
    [17, 26, 28, 36], [117, 126, 127, 136], [105, 112, 113, 124],
    [38, 49, 50, 57], [5, 15, 16, 24], [12, 19, 20, 31],
    [28, 36, 37, 47], [96, 106, 107, 115], [2, 13, 14, 21],
    [124, 131, 132, 143], [19, 30, 31, 38], [7, 16, 17, 26],
    [115, 125, 126, 134], [1, 12, 13, 20], [9, 17, 18, 28],
    [0, 11, 12, 19]
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

    }

    const c = Math.cos(Math.PI / n) ** 2;
    return [
        (1 + 2 * c) * v[0] - 2 * (c ** 2) * v[1] - 2 * c * v[2] - 2 * c * v[3],
        2 * v[0] + (1 - 2 * c) * v[1] - 2 * v[2] - 2 * v[3],
        v[0] - c * v[1] - v[3],
        v[0] - c * v[1] - v[2]
    ];

}

function e(v) {

    return [v[0], v[1], v[2], v[3]];

}

function f(n, v) {

    const c = Math.cos(Math.PI / n) ** 2;

    if (n == 4) {
        return [
            v[0],
            c * v[1],
            Math.sqrt(2 * c) * v[2],
            Math.sqrt(2 * c) * v[3]
        ];
    } else {
        const den = Math.sqrt(1 - 2 * c);
        return [
            v[0] / den,
            c * v[1] / den,
            Math.sqrt(2 * c) * v[2] / den,
            Math.sqrt(2 * c) * v[3] / den
        ];
    }

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

};

function face(n) {

    if (n == 4) {

        return [1, 0, 0, 0];

    } else {

        var c = Math.cos(Math.PI / n) ** 2;
        return [Math.sqrt(1 - 2 * c), 0, 0, 0];


    }

};

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

export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center, face };

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

// console.log(generateFaceVertex());

// Order n hexagonal

const l = 3;
const m = 3;
const n = 9;

const testData = () => {

    const cl = (i) => Math.cos(Math.PI * i / l);
    const cm = (i) => Math.cos(Math.PI * i / m);
    const cn = (i) => Math.cos(Math.PI * i / n);

    const sl = (i) => Math.sin(Math.PI * i / l);
    const sm = (i) => Math.sin(Math.PI * i / m);
    const sn = (i) => Math.sin(Math.PI * i / n);

    return {
        vertices: [
            [1, 0, cn(1), sn(1)],
            [1, 0, cn(3), sn(3)],
            [1, 0, cn(5), sn(5)],
            [1, 0, cn(7), sn(7)],
            [1, 0, cn(9), sn(9)],
            [1, 0, cn(11), sn(11)],
            [1, 0, cn(13), sn(13)],
            [1, 0, cn(15), sn(15)],
            [1, 0, cn(17), sn(17)]
        ],

        edges: [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]
        ],

        faces: [
            [0, 1, 2, 3, 4, 5, 6, 7, 8]
        ],

        numVertices: 9,

        numEdges: 9,

        numFaces: 1,

        numSides: 9,

        // cfe
        a: (v) => {

            return [v[0], v[1], v[2], -v[3]];

        },

        //cfv
        b: (v) => {

            const c = Math.cos(2 * Math.PI / n);
            const s = Math.sin(2 * Math.PI / n);

            return [v[0], v[1], c * v[2] + s * v[3], s * v[2] - c * v[3]];

        },

        //cev
        c: (v) => {

            const clc = cl(1);
            const smc = sm(1);
            const snc = sn(1);
            const cmc = cm(1);

            const rad = Math.sqrt(Math.abs(clc ** 2 - smc ** 2 * snc ** 2));
            //return v;
            return [
                (1 + 2 * (clc ** 2 / snc ** 2 - smc ** 2)) * v[0] - (2 * rad * cmc / snc) * v[1] - (2 * rad * clc / snc ** 2) * v[2],
                (2 * rad * cmc / snc) * v[0] + (1 - 2 * cmc ** 2) * v[1] - (2 * cmc * clc / snc) * v[2],
                (2 * rad * clc / snc ** 2) * v[0] - (2 * cmc * clc / snc) * v[1] + (1 - 2 * clc ** 2 / snc ** 2) * v[2],
                v[3]
            ];

        },

        // fev
        d: (v) => {

            return [v[0], -v[1], v[2], v[3]];

        },

        e: (v) => {

            return v;

        },

        f: (v) => {

            const den = sn(1) * Math.sqrt(Math.abs(sm(1) ** 2 - cl(1) ** 2));

            return [
                cn(1) * cl(1) * v[0] / den,
                Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[1] / den,
                Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[2] / den,
                Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[3] / den
            ];

        },

        faceReflections: [
            ""
        ],

        // outerReflection: "c",

        // center: [1, 1, 0, 0],

        // face: () => {

        //     if (n == 6) {

        //         return [1, 0, 0, 0];

        //     } else {

        //         var c = Math.cos(Math.PI / n) ** 2;
        //         return [Math.sqrt(Math.abs(1 - 4 * c / 3)), 0, 0, 0];

        //     }

        // },

        // TODO what goes in the else columnn?
        metric: () => {

            return "hyperbolic";

        },

        // TODO what goes in the else columnn?
        compact: () => {

            return "compact";

        },

        // cellType: "euclidean",

        flip: (v) => {

            return [v[0], v[2], v[3], v[1]];

        },

        cellType: "euclidean",

        conversion: (v) => {

            return v;

        }

    }

}

export { testData };

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

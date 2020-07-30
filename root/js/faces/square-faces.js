// import * as VF from "../maths-functions/vector-functions.js";
// import * as HF from "../maths-functions/hyperbolic-functions.js"

// function hyperboloidFace(a, b, c, d, n) {

//     var j = 0;
//     var coords = [a, b, c, d];
//     var faces = [[0, 1, 2, 3]];

//     while (j < n) {
//         var newCoords = [];
//         var newFaces = [];
//         for (var i = 0; i < faces.length; i++) {

//             var u = VF.vectorSum(coords[faces[i][0]], coords[faces[i][1]]);
//             var v = VF.vectorSum(coords[faces[i][1]], coords[faces[i][2]]);
//             var w = VF.vectorSum(coords[faces[i][2]], coords[faces[i][3]]);
//             var x = VF.vectorSum(coords[faces[i][3]], coords[faces[i][0]]);
//             var y = VF.vectorSum(u, w);

//             newCoords = newCoords.concat([
//                 coords[faces[i][0]],
//                 coords[faces[i][1]],
//                 coords[faces[i][2]],
//                 coords[faces[i][3]],
//                 VF.vectorScale(u, 1 / Math.sqrt(HF.hyperbolicNorm(u))),
//                 VF.vectorScale(v, 1 / Math.sqrt(HF.hyperbolicNorm(v))),
//                 VF.vectorScale(w, 1 / Math.sqrt(HF.hyperbolicNorm(w))),
//                 VF.vectorScale(x, 1 / Math.sqrt(HF.hyperbolicNorm(x))),
//                 VF.vectorScale(y, 1 / Math.sqrt(HF.hyperbolicNorm(y)))
//             ]);

//             newFaces = newFaces.concat([
//                 [9 * i, 9 * i + 4, 9 * i + 8, 9 * i + 7],
//                 [9 * i + 1, 9 * i + 5, 9 * i + 8, 9 * i + 4],
//                 [9 * i + 2, 9 * i + 6, 9 * i + 8, 9 * i + 5],
//                 [9 * i + 3, 9 * i + 7, 9 * i + 8, 9 * i + 6]
//             ]);
//         }

//         faces = newFaces;
//         coords = newCoords;
//         j++;
//     }

//     var triangularFaces = [];

//     for (var i = 0; i < faces.length; i++) {
//         triangularFaces = triangularFaces.concat([
//             [faces[i][0], faces[i][1], faces[i][2]],
//             [faces[i][0], faces[i][2], faces[i][3]]]);
//     }

//     return [triangularFaces, coords];
// }

import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js"

function hyperboloidFace(a, b, c, d, n) {


    //centre of face
    var eUnscaled = VF.vectorSum(a, VF.vectorSum(b, VF.vectorSum(c, d)));
    var e = VF.vectorScale(eUnscaled, HF.hyperbolicNorm(eUnscaled));

    var coords = [a, b, c, d, e];
    var faces = [[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];

    var j = 0;

    while (j < n) {

        var newCoords = [];
        var newFaces = [];

        for (var i = 0; i < faces.length; i++) {

            var u = VF.vectorSum(coords[faces[i][0]], coords[faces[i][1]]);
            var v = VF.vectorSum(coords[faces[i][1]], coords[faces[i][2]]);
            var w = VF.vectorSum(coords[faces[i][2]], coords[faces[i][0]]);

            newCoords = newCoords.concat([
                coords[faces[i][0]],
                coords[faces[i][1]],
                coords[faces[i][2]],
                VF.vectorScale(u, 1 / Math.sqrt(HF.hyperbolicNorm(u))),
                VF.vectorScale(v, 1 / Math.sqrt(HF.hyperbolicNorm(v))),
                VF.vectorScale(w, 1 / Math.sqrt(HF.hyperbolicNorm(w)))
            ]);

            newFaces = newFaces.concat([
                [6 * i, 6 * i + 3, 6 * i + 5],
                [6 * i + 3, 6 * i + 1, 6 * i + 4],
                [6 * i + 5, 6 * i + 4, 6 * i + 2],
                [6 * i + 3, 6 * i + 4, 6 * i + 5]
            ]);
        }

        faces = newFaces;
        coords = newCoords;
        j++;
    }

    var triangularFaces = faces;

    return [triangularFaces, coords];
}

function hyperboloidFaceIdeal(a, b, c, d, n, k) {


    //centre of face
    var eUnscaled = VF.vectorSum(a, VF.vectorSum(b, VF.vectorSum(c, d)));
    var e = VF.vectorScale(eUnscaled, 1 / Math.sqrt(HF.hyperbolicNorm(eUnscaled)));

    var coords = [a, b, c, d, e];
    var faces = [[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]];

    var j = 0;

    while (j <= n) {

        if (n == 0) {

            var newCoords = [];
            var newFaces = [];

            for (var i = 0; i < faces.length; i++) {

                var u = VF.vectorSum(coords[faces[i][0]], coords[faces[i][1]]);
                var v = VF.vectorSum(VF.vectorScale(coords[faces[i][1]], k), VF.vectorScale(coords[faces[i][2]], 1 / k));
                var w = VF.vectorSum(VF.vectorScale(coords[faces[i][0]], k), VF.vectorScale(coords[faces[i][2]], 1 / k));

                newCoords = newCoords.concat([
                    coords[faces[i][0]],
                    coords[faces[i][1]],
                    coords[faces[i][2]],
                    VF.vectorScale(u, 1 / Math.sqrt(HF.hyperbolicNorm(u))),
                    VF.vectorScale(v, 1 / Math.sqrt(HF.hyperbolicNorm(v))),
                    VF.vectorScale(w, 1 / Math.sqrt(HF.hyperbolicNorm(w)))
                ]);

                newFaces = newFaces.concat([
                    [6 * i, 6 * i + 3, 6 * i + 5],
                    [6 * i + 3, 6 * i + 1, 6 * i + 4],
                    [6 * i + 5, 6 * i + 4, 6 * i + 2],
                    [6 * i + 3, 6 * i + 4, 6 * i + 5]
                ]);
            }

            faces = newFaces;
            coords = newCoords;
            j++;

        } else {

            var newCoords = [];
            var newFaces = [];

            for (var i = 0; i < faces.length; i++) {

                if (HF.hyperbolicNorm(coords[faces[i][0]]) < 0.001) {

                    var u = VF.vectorSum(VF.vectorScale(coords[faces[i][0]], k), VF.vectorScale(coords[faces[i][1]], 1 / k));
                    var v = VF.vectorSum(coords[faces[i][1]], coords[faces[i][2]]);
                    var w = VF.vectorSum(VF.vectorScale(coords[faces[i][2]], 1 / k), VF.vectorScale(coords[faces[i][0]], k));

                } else if (HF.hyperbolicNorm(coords[faces[i][1]]) < 0.001) {

                    var u = VF.vectorSum(VF.vectorScale(coords[faces[i][0]], 1 / k), VF.vectorScale(coords[faces[i][1]], k));
                    var v = VF.vectorSum(VF.vectorScale(coords[faces[i][1]], k), VF.vectorScale(coords[faces[i][2]], 1 / k));
                    var w = VF.vectorSum(coords[faces[i][2]], coords[faces[i][0]]);

                } else if (HF.hyperbolicNorm(coords[faces[i][2]]) < 0.001) {

                    var u = VF.vectorSum(coords[faces[i][0]], coords[faces[i][1]]);
                    var v = VF.vectorSum(VF.vectorScale(coords[faces[i][1]], 1 / k), VF.vectorScale(coords[faces[i][2]], k));
                    var w = VF.vectorSum(VF.vectorScale(coords[faces[i][2]], k), VF.vectorScale(coords[faces[i][0]], 1 / k));

                } else {

                    var u = VF.vectorSum(coords[faces[i][0]], coords[faces[i][1]]);
                    var v = VF.vectorSum(coords[faces[i][1]], coords[faces[i][2]]);
                    var w = VF.vectorSum(coords[faces[i][2]], coords[faces[i][0]]);

                }

                newCoords = newCoords.concat([
                    coords[faces[i][0]],
                    coords[faces[i][1]],
                    coords[faces[i][2]],
                    VF.vectorScale(u, 1 / Math.sqrt(HF.hyperbolicNorm(u))),
                    VF.vectorScale(v, 1 / Math.sqrt(HF.hyperbolicNorm(v))),
                    VF.vectorScale(w, 1 / Math.sqrt(HF.hyperbolicNorm(w)))
                ]);

                newFaces = newFaces.concat([
                    [6 * i, 6 * i + 3, 6 * i + 5],
                    [6 * i + 3, 6 * i + 1, 6 * i + 4],
                    [6 * i + 5, 6 * i + 4, 6 * i + 2],
                    [6 * i + 3, 6 * i + 4, 6 * i + 5]
                ]);
            }

            faces = newFaces;
            coords = newCoords;
            j++;
        }
    }

    var triangularFaces = faces;

    return [triangularFaces, coords];
}

export { hyperboloidFace, hyperboloidFaceIdeal };

//export { hyperboloidFace };
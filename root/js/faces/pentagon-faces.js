import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js"

function hyperboloidFace(a, b, c, d, e, n) {


    //centre of face
    var fUnscaled = VF.vectorSum(a, VF.vectorSum(b, VF.vectorSum(c, VF.vectorSum(d, e))));
    var f = VF.vectorScale(fUnscaled, HF.hyperbolicNorm(fUnscaled));

    var coords = [a, b, c, d, e, f];
    var faces = [[0, 1, 5], [1, 2, 5], [2, 3, 5], [3, 4, 5], [4, 0, 5]];

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
                [6 * i, 6 * i + 5, 6 * i + 3],
                [6 * i + 3, 6 * i + 4, 6 * i + 1],
                [6 * i + 5, 6 * i + 2, 6 * i + 4],
                [6 * i + 3, 6 * i + 5, 6 * i + 4]
            ]);
        }

        faces = newFaces;
        coords = newCoords;
        j++;
    }

    var triangularFaces = faces;

    return [triangularFaces, coords];
}

function hyperboloidFaceIdeal(a, b, c, d, e, n, k) {


    //centre of face
    var fUnscaled = VF.vectorSum(a, VF.vectorSum(b, VF.vectorSum(c, VF.vectorSum(d, e))));
    var f = VF.vectorScale(fUnscaled, HF.hyperbolicNorm(fUnscaled));

    var coords = [a, b, c, d, e, f];
    var faces = [[0, 1, 5], [1, 2, 5], [2, 3, 5], [3, 4, 5], [4, 0, 5]];

    var j = 0;

    while (j < n) {

        if (n == 0) {

            var newCoords = [];
            var newFaces = [];

            for (var i = 0; i < faces.length; i++) {

                var u = VF.vectorSum(coords[faces[i][0]], coords[faces[i][1]]);
                var v = VF.vectorSum(VF.vectorScale(coords[faces[i][0]], k), VF.vectorScale(coords[faces[i][2]], 1 / k));
                var w = VF.vectorSum(VF.vectorScale(coords[faces[i][1]], k), VF.vectorScale(coords[faces[i][2]], 1 / k));

                newCoords = newCoords.concat([
                    coords[faces[i][0]],
                    coords[faces[i][1]],
                    coords[faces[i][2]],
                    VF.vectorScale(u, 1 / Math.sqrt(HF.hyperbolicNorm(u))),
                    VF.vectorScale(v, 1 / Math.sqrt(HF.hyperbolicNorm(v))),
                    VF.vectorScale(w, 1 / Math.sqrt(HF.hyperbolicNorm(w)))
                ]);

                newFaces = newFaces.concat([
                    [6 * i, 6 * i + 5, 6 * i + 3],
                    [6 * i + 3, 6 * i + 4, 6 * i + 1],
                    [6 * i + 5, 6 * i + 2, 6 * i + 4],
                    [6 * i + 3, 6 * i + 5, 6 * i + 4]
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
                    [6 * i, 6 * i + 5, 6 * i + 3],
                    [6 * i + 3, 6 * i + 4, 6 * i + 1],
                    [6 * i + 5, 6 * i + 2, 6 * i + 4],
                    [6 * i + 3, 6 * i + 5, 6 * i + 4]
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
import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js"

function hyperboloidFace(a, b, c, d, n) {

    var j = 0;
    var coords = [a, b, c, d];
    var faces = [[0, 1, 2, 3]];

    while (j < n) {
        var newCoords = [];
        var newFaces = [];
        for (var i = 0; i < faces.length; i++) {

            var u = VF.vectorSum(coords[faces[i][0]], coords[faces[i][1]]);
            var v = VF.vectorSum(coords[faces[i][1]], coords[faces[i][2]]);
            var w = VF.vectorSum(coords[faces[i][2]], coords[faces[i][3]]);
            var x = VF.vectorSum(coords[faces[i][3]], coords[faces[i][0]]);
            var y = VF.vectorSum(u, w);

            newCoords = newCoords.concat([
                coords[faces[i][0]],
                coords[faces[i][1]],
                coords[faces[i][2]],
                coords[faces[i][3]],
                VF.vectorScale(u, 1 / Math.sqrt(HF.hyperbolicNorm(u))),
                VF.vectorScale(v, 1 / Math.sqrt(HF.hyperbolicNorm(v))),
                VF.vectorScale(w, 1 / Math.sqrt(HF.hyperbolicNorm(w))),
                VF.vectorScale(x, 1 / Math.sqrt(HF.hyperbolicNorm(x))),
                VF.vectorScale(y, 1 / Math.sqrt(HF.hyperbolicNorm(y)))
            ]);

            newFaces = newFaces.concat([
                [9 * i, 9 * i + 4, 9 * i + 8, 9 * i + 7],
                [9 * i + 1, 9 * i + 5, 9 * i + 8, 9 * i + 4],
                [9 * i + 2, 9 * i + 6, 9 * i + 8, 9 * i + 5],
                [9 * i + 3, 9 * i + 7, 9 * i + 8, 9 * i + 6]
            ]);
        }

        faces = newFaces;
        coords = newCoords;
        j++;
    }

    var triangularFaces = [];

    for (var i = 0; i < faces.length; i++) {
        triangularFaces = triangularFaces.concat([
            [faces[i][0], faces[i][1], faces[i][2]],
            [faces[i][0], faces[i][2], faces[i][3]]]);
    }

    return [triangularFaces, coords];
}

export { hyperboloidFace };
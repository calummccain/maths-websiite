// ========================================================
// Triangulates a Euclidean face
// 
// Inputs: vertices = vertex positions of face
// Output: [mini triangle data, coordinates of mini triangles]
//
// Change history:
//     ??/??/?? Initial commit
//     29/06/21 Accepts any number of sides
//=========================================================

import * as VF from "../maths-functions/vector-functions.js";

function euclideanFace(vertices) {

    var sideNumber = vertices.length;

    var coords = vertices;
    var faces = [];

    if (sideNumber == 3) {

        faces = [[0, 1, 2]];

    } else {

        for (var i = 0; i < sideNumber; i++) {

            faces.push([i, (i + 1) % sideNumber, sideNumber]);

        }

        var center = VF.vectorScale(VF.vectorSum(coords), 1 / sideNumber);
        coords.push(center);

    }

    return [faces, coords];

}

export { euclideanFace };
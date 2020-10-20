import * as VF from "../maths-functions/vector-functions.js";

function sphereFace(vertices, refinement) {

    var sideNumber = vertices.length;

    var coords = vertices;
    var faces = [];
    var center = [0, 0, 0, 0];

    if (sideNumber == 3) {

        faces = [[0, 1, 2]];

    } else {

        for (var i = 0; i < sideNumber; i++) {

            faces.push([i, (i + 1) % sideNumber, sideNumber]);
            center = VF.vectorSum(center, vertices[i]);

        }

        center = VF.vectorScale(center, 1 / sideNumber);
        coords.push(center);

    }

    console.log(coords, faces)

    var j = 0;

    while (j < refinement) {

        var newCoords = [];
        var newFaces = [];

        for (var i = 0; i < faces.length; i++) {

            var u = VF.midpoint(coords[faces[i][0]], coords[faces[i][1]]);
            var v = VF.midpoint(coords[faces[i][1]], coords[faces[i][2]]);
            var w = VF.midpoint(coords[faces[i][2]], coords[faces[i][0]]);

            newCoords = newCoords.concat([
                coords[faces[i][0]],
                coords[faces[i][1]],
                coords[faces[i][2]],
                u,
                v,
                w
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

    return [faces, coords];
}

export { sphereFace };
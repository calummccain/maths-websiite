import * as VF from "../maths-functions/vector-functions.js";

function sphericalFace(vertices, refinement) {

    var sideNumber = vertices.length;

    var coords = vertices;
    var faces = [];

    if (sideNumber == 3) {

        faces = [[0, 1, 2]];

    } else if (sideNumber == 4) {

        faces = faces.concat([[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]]);
        var center = VF.vectorScale(VF.vectorSum(coords[0], VF.vectorSum(coords[1], VF.vectorSum(coords[2], coords[3]))), 0.25);
        coords.push(center);

    } else if (sideNumber == 5) {

        faces = faces.concat([[0, 1, 5], [1, 2, 5], [2, 3, 5], [3, 4, 5], [4, 0, 5]]);
        var center = VF.vectorScale(VF.vectorSum(VF.vectorSum(coords[0], VF.vectorSum(coords[1], VF.vectorSum(coords[2], coords[3]))), coords[4]), 0.2);
        coords.push(center);

    }

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

export { sphericalFace };
import * as VF from "../maths-functions/vector-functions.js";

function kleinFace(vertices, n, compact) {

    var sideNumber = vertices.length;
    var faces = [];
    var center = [0, 0, 0, 0];

    if (compact === "uncompact") {

        var coords = [];

        for (var j = 0; j < sideNumber; j++) {

            coords = coords.concat(VF.lineSphereIntersection(vertices[j], vertices[(j + 1) % sideNumber]));

        }

        for (var i = 0; i < sideNumber; i++) {

            faces.push([2 * i, (2 * i + 1) % (2 * sideNumber), 2 * sideNumber]);
            faces.push([(2 * i + 1) % (2 * sideNumber), (2 * i + 2) % (2 * sideNumber), 2 * sideNumber]);
            center = VF.vectorSum(center, vertices[i]);

        }

        coords.push(VF.vectorScale(center, 1 / sideNumber));

    } else {

        var coords = vertices;

        if (sideNumber == 3) {

            faces = [[0, 1, 2]];

        } else {

            for (var i = 0; i < sideNumber; i++) {

                faces.push([i, (i + 1) % sideNumber, sideNumber]);
                center = VF.vectorSum(center, vertices[i]);

            }

            coords.push(VF.vectorScale(center, 1 / sideNumber));

        }

    }

    var j = 0;

    while (j < n) {

        var newCoords = [];
        var newFaces = [];

        for (var i = 0; i < faces.length; i++) {

            var u = VF.midpoint(coords[faces[i][0]], coords[faces[i][1]], compact);
            var v = VF.midpoint(coords[faces[i][1]], coords[faces[i][2]], compact);
            var w = VF.midpoint(coords[faces[i][2]], coords[faces[i][0]], compact);

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

export { kleinFace };
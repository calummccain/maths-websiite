import * as VF from "../maths-functions/vector-functions.js";

function kleinFace(vertices, refinement, compact) {

    var sideNumber = vertices.length;
    var faces = [];
    var center = [0, 0, 0];

    if (compact === "uncompact") {

        var coords = [];

        // calculates intersection of the edge with the bounding sphere 
        // for each edge
        //           *          ___
        //          / \        /   \
        //         /   \   => /     \
        //        *-----*     \_____/

        for (var j = 0; j < sideNumber; j++) {

            coords = coords.concat(VF.lineSphereIntersection(vertices[j], vertices[(j + 1) % sideNumber]));

        }

        for (var j = 0; j < sideNumber; j++) {

            coords.push(VF.vectorScale(VF.vectorSum(coords[2 * j], coords[2 * j + 1]), 0.5));

        }

        for (var i = 0; i < sideNumber; i++) {

            faces.push([2 * i + 1, (2 * i + 2) % (2 * sideNumber), 3 * sideNumber]);
            faces.push([2 * i, 2 * sideNumber + i, 3 * sideNumber]);
            faces.push([(2 * i + 1) % (2 * sideNumber), 2 * sideNumber + i, 3 * sideNumber]);

            center = VF.vectorSum(center, vertices[i]);

        }

        center = VF.vectorScale(center, 1 / sideNumber);
        coords.push(center);

    } else {

        var coords = vertices;

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

    }

    var j = 0;

    while (j < refinement) {

        var newCoords = [];
        var newFaces = [];

        for (var i = 0; i < faces.length; i++) {

            var u = VF.midpoint(coords[faces[i][0]], coords[faces[i][1]], center, compact);
            var v = VF.midpoint(coords[faces[i][1]], coords[faces[i][2]], center, compact);
            var w = VF.midpoint(coords[faces[i][2]], coords[faces[i][0]], center, compact);

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
import * as VF from "../maths-functions/vector-functions.js";

function kleinFace(vertices, refinement, compact) {

    var sideNumber = vertices.length;
    var faces = [];
    var center = [0, 0, 0];

    var coords = vertices;

    if (compact === "uncompact") {

        refinement += 1;

    }

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

    if (compact === "uncompact") {

        var outside = [];
        var newFaces = [];
        var numberOfCoords = coords.length;

        for (var i = 0; i < coords.length; i++) {

            if (VF.norm(coords[i]) > 1) {

                outside.push(i);

            }

        }

        faces.forEach((face) => {

            var faceBadNumber = 0;
            var faceBadVertices = [];
            var faceGoodVertices = [];

            face.forEach((i) => {

                if (outside.includes(i)) {

                    faceBadNumber += 1;
                    faceBadVertices.push(i);

                } else {

                    faceGoodVertices.push(i);

                }

            })

            if (faceBadNumber == 0) {

                newFaces.push(face);

            } else if (faceBadNumber == 1) {

                var p1 = VF.lineSphereIntersection(coords[faceGoodVertices[0]], coords[faceBadVertices[0]]);
                var p2 = VF.lineSphereIntersection(coords[faceGoodVertices[1]], coords[faceBadVertices[0]]);
                coords.push(p1);
                coords.push(p2);
                newFaces.push([faceGoodVertices[0], faceGoodVertices[1], numberOfCoords]);
                newFaces.push([faceGoodVertices[1], numberOfCoords, numberOfCoords + 1]);
                numberOfCoords += 2;

            } else if (faceBadNumber == 2) {

                var p1 = VF.lineSphereIntersection(coords[faceGoodVertices[0]], coords[faceBadVertices[0]]);
                var p2 = VF.lineSphereIntersection(coords[faceGoodVertices[0]], coords[faceBadVertices[1]]);
                coords.push(p1);
                coords.push(p2);
                newFaces.push([faceGoodVertices[0], numberOfCoords, numberOfCoords + 1]);
                numberOfCoords += 2;

            } else {

            }

        })

        faces = newFaces;

    }

    return [faces, coords];

}

export { kleinFace };
import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

function kleinFace(vertices, refinement, compact) {

    var sideNumber = vertices.length;
    var faces = [];
    var center = [0, 0, 0];

    if (compact === "compact") {

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

    } else if (compact === "paracompact") {

        var uhpVertices = [];
        vertices.forEach(element => {
            uhpVertices.push(HF.kleinToUpperHalfPlane(element))
        });

        const a = VF.norm(VF.vectorDiff(uhpVertices[0], uhpVertices[1]));
        const b = VF.norm(VF.vectorDiff(uhpVertices[1], uhpVertices[2]));
        const c = VF.norm(VF.vectorDiff(uhpVertices[2], uhpVertices[0]));
        const circumradius = VF.circumradius(a, b, c);
        const circumcenter = VF.circumcenter(uhpVertices[0], uhpVertices[1], uhpVertices[2]);

        for (var i = 0; i < sideNumber; i++) {

            center = VF.vectorSum(center, vertices[i]);

        }

        center = VF.vectorScale(center, 1 / sideNumber);
        uhpVertices.push(HF.kleinToUpperHalfPlane(center));

        for (var i = 0; i < sideNumber; i++) {

            // var midpoint = VF.vectorScale(VF.vectorSum(uhpVertices[i], uhpVertices[(i + 1) % sideNumber]), 0.5);
            // midpoint = [midpoint[0], midpoint[1], Math.sqrt(Math.abs(circumradius ** 2 - (circumcenter[0] - midpoint[0]) ** 2 - (circumcenter[1] - midpoint[1]) ** 2))];
            // uhpVertices.push(midpoint);
            faces.push([i, sideNumber, (i + 1) % sideNumber]);
            //faces.push([(i + 1) % sideNumber, sideNumber, i + sideNumber + 1]);

        }

        var j = 0;

        while (j < refinement) {

            var newUhpVertices = [];
            var newFaces = [];

            for (var i = 0; i < faces.length; i++) {

                var u = VF.vectorScale(VF.vectorSum(uhpVertices[faces[i][0]], uhpVertices[faces[i][1]]), 0.5);
                var v = VF.vectorScale(VF.vectorSum(uhpVertices[faces[i][1]], uhpVertices[faces[i][2]]), 0.5);
                var w = VF.vectorScale(VF.vectorSum(uhpVertices[faces[i][2]], uhpVertices[faces[i][0]]), 0.5);

                u = [u[0], u[1], Math.sqrt(Math.abs(circumradius ** 2 - (circumcenter[0] - u[0]) ** 2 - (circumcenter[1] - u[1]) ** 2))];
                v = [v[0], v[1], Math.sqrt(Math.abs(circumradius ** 2 - (circumcenter[0] - v[0]) ** 2 - (circumcenter[1] - v[1]) ** 2))];
                w = [w[0], w[1], Math.sqrt(Math.abs(circumradius ** 2 - (circumcenter[0] - w[0]) ** 2 - (circumcenter[1] - w[1]) ** 2))];

                newUhpVertices = newUhpVertices.concat([
                    uhpVertices[faces[i][0]],
                    uhpVertices[faces[i][1]],
                    uhpVertices[faces[i][2]],
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
            uhpVertices = newUhpVertices;
            j++;

        }

        coords = [];
        uhpVertices.forEach(element => {
            coords.push(HF.upperHalfPlaneToKlein(element))
        })

        return [faces, coords];
    }
}

export { kleinFace };
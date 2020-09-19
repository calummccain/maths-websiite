import * as THREE from "../three.module.js";

import * as ORDER3 from "../data/hyperbolic/633.js";

import * as FACE from "../faces/klein-hexagon-faces.js";

import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function hyperbolicHexagonGeometry(order, n, transform, s) {

    var vertices = ORDER3.vertices;
    var faces = ORDER3.faceReflections;
    var dict, f, center;

    dict = ORDER3.matrixDict;
    f = ORDER3.f;
    center = ORDER3.center;

    var newCenter = HF.transformVertices([center], transform, dict);
    var kleinCenter = f(newCenter[0]);

    var cellGeometry = [];
    //alert(faces.length);

    for (var i = 0; i < faces.length; i++) {

        var geometry = new THREE.Geometry();
        var faceData;

        //console.log([faces[i], HF.transformVertices([[3, 0, 1, 0]], faces[i], dict)])

        //alert(transform + faces[i]);

        var basePoints = HF.transformVertices(vertices, transform + faces[i], dict);

        //alert(basePoints);

        var basePointsKlein = [];

        for (var j = 0; j < 6; j++) {

            basePointsKlein[j] = HF.hyperboloidToKlein(f(basePoints[j]));

        }

        faceData = FACE.kleinFace(
            basePointsKlein[0],
            basePointsKlein[1],
            basePointsKlein[3],
            basePointsKlein[5],
            basePointsKlein[4],
            basePointsKlein[2],
            n
        );

        var facets = faceData[0];
        var hyperboloidVertices = faceData[1];

        for (var j = 0; j < hyperboloidVertices.length; j++) {

            var vertex = HF.kleinToPoincare(hyperboloidVertices[j]);
            var vertex2 = VF.vectorSum(VF.vectorScale(vertex, 1 - s), VF.vectorScale(kleinCenter, s));
            geometry.vertices.push(new THREE.Vector3(vertex2[0], vertex2[1], vertex2[2]));

        }

        for (var k = 0; k < facets.length; k++) {

            var facetPiece = facets[k];
            geometry.faces.push(new THREE.Face3(facetPiece[0], facetPiece[1], facetPiece[2]));

        }

        geometry.mergeVertices();
        geometry.name = [ORDER3.faceReflections[i], transform, faces[i]];
        cellGeometry.push(geometry);

    }

    return cellGeometry;
}

export { hyperbolicHexagonGeometry };
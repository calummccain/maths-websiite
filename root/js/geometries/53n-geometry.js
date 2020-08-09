import * as THREE from "../three.module.js";

import * as ORDER4 from "../data/compact/534.js";
import * as ORDER5 from "../data/compact/535.js";
import * as ORDER6 from "../data/paracompact/536.js";
import * as ORDERN from "../data/general-types/53n.js";

import * as FACE from "../faces/klein-pentagon-faces.js";

import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function hyperbolicDodecahedronGeometry(order, n, transform, s) {

    var vertices = ORDERN.vertices;
    var faces = ORDERN.faces;
    var dict, f, center;

    if (order == 4) {

        dict = ORDER4.matrixDict;
        f = ORDER4.f;
        center = ORDER4.center;

    } else if (order == 5) {

        dict = ORDER5.matrixDict;
        f = ORDER5.f;
        center = ORDER5.center;

    } else if (order = 6) {

        dict = ORDER6.matrixDict;
        f = ORDER6.f;
        center = ORDER6.center;

    } else {

        dict = ORDERN.matrixDict(order);
        f = ORDERN.f(order);
        center = ORDERN.center(order);

    }

    var transform = HF.wordToTransform(transform, dict);
    var newVertices = HF.transformVertices(vertices, transform);

    var kleinVertices = [];
    for (var i = 0; i < newVertices.length; i++) {

        kleinVertices[i] = [HF.hyperboloidToKlein(VF.transpose(VF.matrixMultiplication(f, VF.transpose(newVertices[i]))))];

    }

    // transform center of cell
    var newCenter = HF.transformVertices([center], transform);
    var kleinCenter = [HF.hyperboloidToKlein(VF.transpose(VF.matrixMultiplication(f, VF.transpose(newCenter[0]))))];

    // loop over the faces listed to generate mesh
    var cellGeometry = new THREE.Geometry();

    for (var i = 0; i < faces.length; i++) {

        var geometry = new THREE.Geometry();
        var faceData;

        // faceData consists of two arrays - coordinates of mesh vertices in hyperbolic space and which 
        // vertices correspond to each face
        //
        // The coordinates are originally in the form of a row vector so transposes are required as well 
        // as multiplication by the f matrix to get them into the standard coordinates

        faceData = FACE.kleinFace(
            kleinVertices[faces[i][0]],
            kleinVertices[faces[i][1]],
            kleinVertices[faces[i][2]],
            kleinVertices[faces[i][3]],
            kleinVertices[faces[i][4]],
            n
        );

        // facets is the list of small trianglular faces that make up the mesh and which vertices make them up 
        var facets = faceData[0];
        var hyperboloidVertices = faceData[1];

        // transform the vertices to the appropriate model - poincare disk or hyperboloid model
        // scale them to the center
        // add them to the geometry
        for (var j = 0; j < hyperboloidVertices.length; j++) {

            var vertex = HF.kleinToPoincare(hyperboloidVertices[j]);
            var vertex2 = VF.vectorSum(VF.vectorScale(vertex, 1 - s), VF.vectorScale(kleinCenter, s));
            geometry.vertices.push(new THREE.Vector3(vertex2[0][0], vertex2[0][1], vertex2[0][2]));

        }

        // add the facets to the geometry

        for (var k = 0; k < facets.length; k++) {

            var facetPiece = facets[k];
            geometry.faces.push(new THREE.Face3(facetPiece[(transform.length) % 2], facetPiece[2], facetPiece[(transform.length + 1) % 2]));

        }

        cellGeometry.merge(geometry);
        cellGeometry.mergeVertices();

    }

    return cellGeometry;
}

export { hyperbolicDodecahedronGeometry };
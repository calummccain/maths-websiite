import * as THREE from "../three.module.js";

import * as ORDER3 from "../data/compact/353.js";

import * as FACE from "../faces/klein-triangle-faces.js";

import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function hyperbolicIcosahedronGeometry(order, n, transform, s) {

    //channge this for ORDERN
    var vertices = ORDER3.vertices;
    var faces = ORDER3.faces;
    var dict, f, center;

    if (order == 3) {

        dict = ORDER3.matrixDict;
        f = ORDER3.f;
        center = ORDER3.center;

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

export { hyperbolicIcosahedronGeometry };
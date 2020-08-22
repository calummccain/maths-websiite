import * as THREE from "../three.module.js";

import * as XXIV from "../data/polychorons/24-cell.js";

import * as FACE from "../faces/sphere-triangle-faces.js";

import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function xxivCellGeometry(n, cell, d) {

    var faces = XXIV.cellFaceDict[cell];

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
        var v1 = XXIV.vertexDict[faces[i][0]];
        var v2 = XXIV.vertexDict[faces[i][1]];
        var v3 = XXIV.vertexDict[faces[i][2]];

        faceData = FACE.sphereFace(v1, v2, v3, n);

        // facets is the list of small trianglular faces that make up the mesh and which vertices make them up 
        var facets = faceData[0];
        var hypersphereVertices = faceData[1];

        // transform the vertices to the appropriate model - poincare disk or hyperboloid model
        // scale them to the center
        // add them to the geometry
        for (var j = 0; j < hypersphereVertices.length; j++) {

            var vertex = VF.vectorScale(hypersphereVertices[j], 1 / Math.sqrt(SF.sphereNorm(hypersphereVertices[j])));
            var vertex2 = SF.sphereToPoincare(vertex, d);
            geometry.vertices.push(new THREE.Vector3(vertex2[0], vertex2[1], vertex2[2]));

        }

        // add the facets to the geometry

        for (var k = 0; k < facets.length; k++) {

            var facetPiece = facets[k];
            geometry.faces.push(new THREE.Face3(facetPiece[0], facetPiece[1], facetPiece[2]));

        }

        cellGeometry.merge(geometry);
        cellGeometry.mergeVertices();

    }

    return cellGeometry;
}

export { xxivCellGeometry };
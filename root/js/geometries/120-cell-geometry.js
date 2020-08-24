import * as THREE from "../three.module.js";

import * as CXX from "../data/polychorons/120-cell.js";

import * as FACE from "../faces/sphere-pentagon-faces.js";

import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function cxxCellGeometry(n, cell, d) {

    var name = CXX.cells[cell];
    var faces = CXX.cellFaceDict[name];

    // loop over the faces listed to generate mesh
    var cellGeometry = new THREE.Geometry();

    for (var i = 0; i < faces.length; i++) {

        var faceVertices = CXX.faceDict[faces[i]];

        var geometry = new THREE.Geometry();
        var faceData;

        var v1 = CXX.vertexDict[faceVertices[0]];
        var v2 = CXX.vertexDict[faceVertices[1]];
        var v3 = CXX.vertexDict[faceVertices[2]];
        var v4 = CXX.vertexDict[faceVertices[3]];
        var v5 = CXX.vertexDict[faceVertices[4]];

        faceData = FACE.sphereFace(v1, v2, v3, v4, v5, n);

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

export { cxxCellGeometry };
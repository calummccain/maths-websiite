import * as THREE from "../three.module.js";

import * as VIII from "../data/polychorons/8-cell.js";

import * as FACE from "../faces/sphere-square-faces.js";

import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function viiiCellGeometry(n, cellName, d) {

    var faces = VIII.cellFaceDict[cellName];

    var cell = [];

    for (var i = 0; i < faces.length; i++) {

        var geometry = new THREE.Geometry();
        var faceData;

        var v1 = VIII.vertexDict[faces[i][0]];
        var v2 = VIII.vertexDict[faces[i][1]];
        var v3 = VIII.vertexDict[faces[i][2]];
        var v4 = VIII.vertexDict[faces[i][3]];

        faceData = FACE.sphereFace(v1, v2, v3, v4, n);

        var facets = faceData[0];
        var hypersphereVertices = faceData[1];

        for (var j = 0; j < hypersphereVertices.length; j++) {

            var vertex = VF.vectorScale(hypersphereVertices[j], 1 / Math.sqrt(SF.sphereNorm(hypersphereVertices[j])));
            var vertex2 = SF.sphereToPoincare(vertex, d);
            geometry.vertices.push(new THREE.Vector3(vertex2[0], vertex2[1], vertex2[2]));

        }

        for (var k = 0; k < facets.length; k++) {

            var facetPiece = facets[k];
            geometry.faces.push(new THREE.Face3(facetPiece[0], facetPiece[1], facetPiece[2]));

        }

        geometry.mergeVertices();
        geometry.name = [faces[i], cellName];
        cell.push(geometry);

    }

    return cell;
}

export { viiiCellGeometry };
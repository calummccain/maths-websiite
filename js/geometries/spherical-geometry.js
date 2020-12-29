import * as THREE from "../three.module.js";
import * as FACE from "../faces/spherical-faces.js";
import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function sphericalGeometry(cellName, cellFaceDict, vertexDict, refinement, d, sideNumber, faceDict) {

    var faces = cellFaceDict[cellName];

    var cell = [];

    for (var i = 0; i < faces.length; i++) {

        var geometry = new THREE.Geometry();
        var faceVertices = [];

        for (var j = 0; j < sideNumber; j++) {

            if (sideNumber == 5) {

                faceVertices.push(vertexDict[faceDict[faces[i]][j]]);

            } else {

                faceVertices.push(vertexDict[faces[i][j]]);

            }

        }

        var faceData = FACE.sphereFace(faceVertices, refinement);

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

export { sphericalGeometry };
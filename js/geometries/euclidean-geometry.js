import * as THREE from "../three.module.js";
import { euclideanFace } from "../faces/euclidean-faces.js";
import * as SF from "../maths-functions/spherical-functions.js";


function euclideanGeometry(vertices, faces, matrixDict, transform, numberOfSides, names) {

    // It is useful to have the f matrix separately defined
    function f(vector) {

        return matrixDict('f', vector);

    }

    // Transform the 'central' cell's vertices to the transformed cell's vertices
    var newVertices = SF.transformVertices(vertices, transform, matrixDict);

    var properVertices = [];
    for (var i = 0; i < newVertices.length; i++) {

        properVertices[i] = f(newVertices[i]);

    }

    var cellGeometry = [];

    for (var i = 0; i < faces.length; i++) {

        var faceGeometry = new THREE.Geometry();
        var initial = 0;
        var faceVertices = Array(numberOfSides).fill().map(() => initial++);
        faceVertices = faceVertices.map((x) => properVertices[faces[i][x]]);
        var faceData = euclideanFace(faceVertices);

        var facets = faceData[0];
        var euclideanVertices = faceData[1];

        for (var j = 0; j < euclideanVertices.length; j++) {

            faceGeometry.vertices.push(new THREE.Vector3(euclideanVertices[j][1], euclideanVertices[j][2], euclideanVertices[j][3]));

        }

        for (var k = 0; k < facets.length; k++) {

            var facetPiece = facets[k];
            faceGeometry.faces.push(new THREE.Face3(facetPiece[0], facetPiece[1], facetPiece[2]));

        }

        // Optimise the geometry
        faceGeometry.mergeVertices();

        //  Give the face a name (useful for raycasting)
        faceGeometry.name = names[i];

        // Add the face's geometry to the cellGeometry array
        cellGeometry.push(faceGeometry);

    }

    return cellGeometry;

}


export { euclideanGeometry };
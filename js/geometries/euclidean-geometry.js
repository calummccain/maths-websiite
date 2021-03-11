import * as THREE from "../three-bits/three.module.js";
import { euclideanFace } from "../faces/euclidean-faces.js";
import * as VF from "../maths-functions/vector-functions.js";


function euclideanGeometry(data, transform) {

    // matrix dictionary
    function matrixDict(letter, vector) {
    
        if (letter === "a") {
    
            return data.a(vector)
    
        } else if (letter === "b") {

            return data.b(vector)

        } else if (letter === "c") {

            return data.c(vector)

        } else if (letter === "d") {

            return data.d(vector)

        } else if (letter === "e") {

            return data.e(vector)

        } else if (letter === "f") {

            return data.f(vector)

        } else {

            throw 'letter needs to be one of a, b, c, d, e, f!';

        }

    }

    // Transform the 'central' cell's vertices to the transformed cell's vertices
    var newVertices = VF.transformVertices(data.vertices, transform, matrixDict);
    
    var properVertices = [];
    
    for (var i = 0; i < newVertices.length; i++) {

        properVertices[i] = data.f(newVertices[i]);

    }

    var cellGeometry = [];

    for (var i = 0; i < data.numFaces; i++) {

        var faceGeometry = new THREE.Geometry();
        var initial = 0;
        var faceVertices = Array(data.numSides).fill().map(() => initial++);
        faceVertices = faceVertices.map((x) => properVertices[data.faces[i][x]]);
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
        faceGeometry.name = data.faceReflections[i];

        // Add the face's geometry to the cellGeometry array
        cellGeometry.push(faceGeometry);

    }

    return cellGeometry;

}


export { euclideanGeometry };
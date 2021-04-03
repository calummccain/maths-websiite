import * as THREE from "../three-bits/three.module.js";
import { sphericalFace } from "../faces/spherical-faces.js";
import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";


function sphericalGeometry(data, transform, refinement) {

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
        var faceData = sphericalFace(faceVertices, refinement);

        var facets = faceData[0];
        var hypersphereVertices = faceData[1];

        for (var j = 0; j < hypersphereVertices.length; j++) {

            var vertex = VF.vectorScale(hypersphereVertices[j], 1 / VF.norm(hypersphereVertices[j]));
            var vertex2 = SF.hyperToStereo(vertex);
            faceGeometry.vertices.push(new THREE.Vector3(vertex2[0], vertex2[1], vertex2[2]));

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


export { sphericalGeometry };
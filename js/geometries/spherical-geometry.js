import * as THREE from "../three.module.js";
import * as FACE from "../faces/spherical-faces.js";
import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

// function sphericalGeometry(cellName, cellFaceDict, vertexDict, refinement, d, sideNumber, faceDict) {

//     var faces = cellFaceDict[cellName];

//     var cell = [];

//     for (var i = 0; i < faces.length; i++) {

//         var geometry = new THREE.Geometry();
//         var faceVertices = [];

//         for (var j = 0; j < sideNumber; j++) {

//             if (sideNumber == 5) {

//                 faceVertices.push(vertexDict[faceDict[faces[i]][j]]);

//             } else {

//                 faceVertices.push(vertexDict[faces[i][j]]);

//             }

//         }

//         var faceData = FACE.sphereFace(faceVertices, refinement);

//         var facets = faceData[0];
//         var hypersphereVertices = faceData[1];

//         for (var j = 0; j < hypersphereVertices.length; j++) {

//             var vertex = VF.vectorScale(hypersphereVertices[j], 1 / Math.sqrt(SF.sphereNorm(hypersphereVertices[j])));
//             var vertex2 = SF.sphereToPoincare(vertex, d);
//             geometry.vertices.push(new THREE.Vector3(vertex2[0], vertex2[1], vertex2[2]));

//         }

//         for (var k = 0; k < facets.length; k++) {

//             var facetPiece = facets[k];
//             geometry.faces.push(new THREE.Face3(facetPiece[0], facetPiece[1], facetPiece[2]));

//         }

//         geometry.mergeVertices();
//         geometry.name = [faces[i], cellName];
//         cell.push(geometry);

//     }

//     return cell;
// }

function sphericalGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, names, d) {

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

    console.log(properVertices)

    var cellGeometry = [];

    for (var i = 0; i < faces.length; i++) {

        var faceGeometry = new THREE.Geometry();
        var initial = 0;
        var faceVertices = Array(numberOfSides).fill().map(() => initial++);
        faceVertices = faceVertices.map((x) => properVertices[faces[i][x]]);
        var faceData = FACE.sphereFace(faceVertices, refinement);

        console.log(faceData)

        var facets = faceData[0];
        var hypersphereVertices = faceData[1];

        for (var j = 0; j < hypersphereVertices.length; j++) {

            var vertex = VF.vectorScale(hypersphereVertices[j], 1 / Math.sqrt(SF.sphereNorm(hypersphereVertices[j])));
            var vertex2 = SF.sphereToPoincare(vertex, d);
            faceGeometry.vertices.push(new THREE.Vector3(vertex2[0], vertex2[1], vertex2[2]));

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

export { sphericalGeometry };
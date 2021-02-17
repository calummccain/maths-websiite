import * as THREE from "../three.module.js";
import { hyperbolicFace } from "../faces/hyperbolic-faces.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function hyperbolicGeometry(data, transform, refinement, model) {

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

    // Project the transformed cell's vertices to the Klein Model
    var kleinVertices = [];
    
    for (var i = 0; i < newVertices.length; i++) {

        kleinVertices[i] = HF.hyperboloidToKlein(data.f(newVertices[i]));

    }

    // For each face make a geometry for it and add it to the cellGeometry array
    var cellGeometry = [];

    for (var i = 0; i < data.numFaces; i++) {

        var subdividedFaces, subdividedVertices;
        var initial = 0;
        var faceGeometry = new THREE.Geometry();
        var faceVertices = Array(data.numSides).fill().map(() => initial++);
        faceVertices = faceVertices.map((x) => kleinVertices[data.faces[i][x]]);

        // kleinFace subdivides the face automatically and returns the vertices and the face indices
        [subdividedFaces, subdividedVertices] = hyperbolicFace(
            faceVertices,
            refinement,
            data.metric
        );

        // Transform the vertices from the Klein Model to the Poincare Model
        // Then add these to the faceGeometry (as THREE.Vector3)
        for (var j = 0; j < subdividedVertices.length; j++) {

            var vertex = [0, 0, 0];

            if (model === "klein") {

                vertex = subdividedVertices[j]

            } else if (model === "poincare") {

                vertex = HF.kleinToPoincare(subdividedVertices[j]);

            } else if (model === "uhp") {

                vertex = HF.kleinToUpperHalfPlane(subdividedVertices[j]);

            }

            faceGeometry.vertices.push(new THREE.Vector3(vertex[0], vertex[1], vertex[2]));

        }

        // Add the faces to the geometry (as THREE.Face3)
        for (var k = 0; k < subdividedFaces.length; k++) {

            faceGeometry.faces.push(new THREE.Face3(subdividedFaces[k][0], subdividedFaces[k][1], subdividedFaces[k][2]));

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

export { hyperbolicGeometry };
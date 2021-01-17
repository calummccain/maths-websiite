import * as ORDERN from "../data/hyperbolic/43n.js";
import { hyperbolicGeometry } from "../geometries/hyperbolic-geometry.js";
import { sphericalGeometry } from "../geometries/spherical-geometry.js";

function cubeGeometry(transform, order, refinement, compact, metric) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 4;
    const d = 1;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    var cube;

    if (metric == "spherical") {

        cube = sphericalGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, ORDERN.faceReflections, d);

    } else if (metric == "euclidean") {

        //cube = euclideanGeometry();

    } else if (metric == "hyperbolic") {

        cube = hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections);

    }

    return [cube, ORDERN.faceReflections];

}

export { cubeGeometry };
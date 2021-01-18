import * as ORDERN from "../data/33n.js";
import { hyperbolicGeometry } from "../geometries/hyperbolic-geometry.js";
import { sphericalGeometry } from "../geometries/spherical-geometry.js";

function tetrahedronGeometry(transform, order, refinement, compact, metric) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 3;
    const d = 1;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    var tetrahedron;

    if (metric == "spherical") {

        refinement += 1;
        tetrahedron = sphericalGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, ORDERN.faceReflections, d);

    } else if (metric == "hyperbolic") {

        tetrahedron = hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections);

    }

    return [tetrahedron, ORDERN.faceReflections];

}

export { tetrahedronGeometry };
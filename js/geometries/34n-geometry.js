import * as ORDERN from "../data/34n.js";
import { hyperbolicGeometry } from "../geometries/hyperbolic-geometry.js";
import { sphericalGeometry } from "../geometries/spherical-geometry.js";

function octahedronGeometry(transform, order, refinement, compact, metric) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 3;
    const d = 1;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    var octahedron;

    if (metric == "spherical") {

        octahedron = sphericalGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, ORDERN.faceReflections, d);

    } else if (metric == "hyperbolic") {

        octahedron = hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections);

    }

    return [octahedron, ORDERN.faceReflections];

}

export { octahedronGeometry };
import * as ORDERN from "../data/hyperbolic/34n.js";
import * as GEOM from "../geometries/hyperbolic-geometry.js";

function hyperbolicOctahedronGeometry(transform, order, refinement, compact) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 3;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    var octahedron = GEOM.hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections);

    return [octahedron, ORDERN.faceReflections];

}

export { hyperbolicOctahedronGeometry };
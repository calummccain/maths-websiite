import * as ORDERN from "../data/hyperbolic/53n.js";
import * as GEOM from "../geometries/hyperbolic-geometry.js";

function hyperbolicDodecahedronGeometry(transform, order, refinement, compact) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 5;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector)
    }

    var dodecahedron = GEOM.hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact);

    return dodecahedron;

}

export { hyperbolicDodecahedronGeometry };
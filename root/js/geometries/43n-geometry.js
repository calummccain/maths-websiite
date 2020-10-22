import * as ORDERN from "../data/hyperbolic/43n.js";
import * as GEOM from "../geometries/hyperbolic-geometry.js";

function hyperbolicCubeGeometry(transform, order, refinement, compact) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 4;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    var cube = GEOM.hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact);

    return cube;

}

export { hyperbolicCubeGeometry };
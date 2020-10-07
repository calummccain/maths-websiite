import * as ORDER3 from "../data/hyperbolic/633.js";
import * as GEOM from "../geometries/hyperbolic-geometry.js";

function hyperbolicHexagonalGeometry(transform, order, refinement, compact) {

    const vertices = ORDER3.vertices;
    const faces = ORDER3.faces;
    const numberOfSides = 6;

    function matrixDict(letter, vector) {
        return ORDER3.matrixDict(order, letter, vector)
    }

    var hexagonal = GEOM.hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact);

    return hexagonal;

}

export { hyperbolicHexagonalGeometry };
import * as ORDERN from "../data/hyperbolic/44n.js";
import * as GEOM from "./hyperbolic-geometry.js";

function hyperbolicSquareGeometry(transform, order, refinement, compact) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 4;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    var square = GEOM.hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections);

    return [square, ORDERN.faceReflections];

}

export { hyperbolicSquareGeometry };
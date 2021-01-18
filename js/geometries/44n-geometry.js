import * as ORDERN from "../data/44n.js";
import * as GEOM from "./hyperbolic-geometry.js";

function squareGeometry(transform, order, refinement, compact) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 4;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    const newVertices = [];
    vertices.forEach((v) => { newVertices.push(ORDERN.conversion(order, v)) });

    var square = GEOM.hyperbolicGeometry(newVertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections);

    return [square, ORDERN.faceReflections];

}

export { squareGeometry };
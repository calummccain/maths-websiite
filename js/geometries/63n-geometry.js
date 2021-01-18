import * as ORDERN from "../data/63n.js";
import * as GEOM from "./hyperbolic-geometry.js";

function hexagonalGeometry(transform, order, refinement, compact) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 6;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    const newVertices = [];
    vertices.forEach((v) => { newVertices.push(ORDERN.conversion(order, v)) });

    var hexagonal = GEOM.hyperbolicGeometry(newVertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections);

    return [hexagonal, ORDERN.faceReflections];

}

export { hexagonalGeometry };
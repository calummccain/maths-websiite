import * as ORDERN from "../data/36n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function triangularGeometry(transform, order, refinement, compact) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 3;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    const newVertices = [];
    vertices.forEach((v) => { newVertices.push(ORDERN.conversion(order, v)) });

    var triangular = hyperbolicGeometry(newVertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections);

    return [triangular, ORDERN.faceReflections];

}

export { triangularGeometry };
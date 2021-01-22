import * as ORDERN from "../data/63n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function hexagonalGeometry(transform, order, refinement, compact, metric, model) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 6;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    const newVertices = [];
    vertices.forEach((v) => { newVertices.push(ORDERN.conversion(order, v)) });

    var hexagonal = hyperbolicGeometry(newVertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections, model);

    return [hexagonal, ORDERN.faceReflections];

}

export { hexagonalGeometry };
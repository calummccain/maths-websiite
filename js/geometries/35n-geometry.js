import * as ORDERN from "../data/35n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function icosahedronGeometry(transform, order, refinement, compact, metric, model) {

    const vertices = ORDERN.vertices;
    const faces = ORDERN.faces;
    const numberOfSides = 3;

    function matrixDict(letter, vector) {
        return ORDERN.matrixDict(order, letter, vector);
    }

    var icosahedron = hyperbolicGeometry(vertices, faces, matrixDict, transform, numberOfSides, refinement, compact, ORDERN.faceReflections, model)

    return [icosahedron, ORDERN.faceReflections];

}

export { icosahedronGeometry };
import { pqrData } from "../data/pqr.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function pqrGeometry(transform, p, q, r, refinement, model) {

    var data = pqrData(p, q, r);

    const newVertices = [];
    data.vertices.forEach((v) => { newVertices.push(v) });
    data.vertices = newVertices;

    var pqr = hyperbolicGeometry(data, transform, refinement, model);

    return [pqr, data.faceReflections, data.numFaces];

}

export { pqrGeometry };
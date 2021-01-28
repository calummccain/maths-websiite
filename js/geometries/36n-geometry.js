import { triangleData } from "../data/36n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function triangularGeometry(transform, order, refinement, model) {

    const data = triangleData(order);

    const newVertices = [];
    vertices.forEach((v) => { newVertices.push(data.conversion(v)) });

    var triangular = hyperbolicGeometry(newVertices, transform, refinement, model);

    return [triangular, ORDERN.faceReflections, data.numFaces];

}

export { triangularGeometry };
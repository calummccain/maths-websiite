import { triangleData } from "../data/36n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function triangularGeometry(transform, order, refinement, model) {

    var data = triangleData(order);

    const newVertices = [];
    data.vertices.forEach((v) => { newVertices.push(data.conversion(v)) });
    data.vertices = newVertices;

    var triangular = hyperbolicGeometry(data, transform, refinement, model);

    return [triangular, data.faceReflections, data.numFaces];

}

export { triangularGeometry };
import { squareData } from "../data/44n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function squareGeometry(transform, order, refinement, model) {

    const data = squareData(order);

    const newVertices = [];
    vertices.forEach((v) => { newVertices.push(data.conversion(order, v)) });

    var square = hyperbolicGeometry(newVertices, transform, refinement, model);

    return [square, data.faceReflections, data.numFaces];

}

export { squareGeometry };
import { squareData } from "../data/44n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function squareGeometry(transform, order, refinement, model) {

    var data = squareData(order);

    const newVertices = [];
    data.vertices.forEach((v) => { newVertices.push(data.conversion(v)) });
    data.vertices = newVertices;

    var square = hyperbolicGeometry(data, transform, refinement, model);

    return [square, data.faceReflections, data.numFaces];

}

export { squareGeometry };
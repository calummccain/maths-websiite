import { hexagonData } from "../data/63n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function hexagonalGeometry(transform, order, refinement, model) {

    var data = hexagonData(order);

    const newVertices = [];
    data.vertices.forEach((v) => { newVertices.push(data.conversion(v)) });
    data.vertices = newVertices;

    var hexagonal = hyperbolicGeometry(data, transform, refinement, model);

    return [hexagonal, data.faceReflections, data.numFaces];

}

export { hexagonalGeometry };
import { hexagonData } from "../data/63n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function hexagonalGeometry(transform, order, refinement, model) {

    const data = hexagonData(order);

    const newVertices = [];
    vertices.forEach((v) => { newVertices.push(data.conversion(order, v)) });

    var hexagonal = hyperbolicGeometry(newVertices, transform, refinement, model);

    return [hexagonal, data.faceReflections, data.numFaces];

}

export { hexagonalGeometry };
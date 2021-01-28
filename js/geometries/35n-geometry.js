import { icosahedronData } from "../data/35n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function icosahedronGeometry(transform, order, refinement, model) {

    const data = icosahedronData(order);

    var icosahedron = hyperbolicGeometry(data, transform, refinement, model);

    return [icosahedron, data.faceReflections, data.numFaces];

}

export { icosahedronGeometry };
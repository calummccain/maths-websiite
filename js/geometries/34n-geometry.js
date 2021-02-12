import { octahedronData } from "../data/34n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function octahedronGeometry(transform, order, refinement, model) {

    const d = 1;

    const data = octahedronData(order);

    var octahedron;

    if (data.metric() == "spherical") {

        octahedron = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric() == "hyperbolic") {

        octahedron = hyperbolicGeometry(data, transform, refinement, model);

    }

    return [octahedron, data.faceReflections, data.numFaces];

}

export { octahedronGeometry };
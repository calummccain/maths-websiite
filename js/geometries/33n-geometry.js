import { tetrahedronData } from "../data/33n.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function tetrahedronGeometry(transform, order, refinement, model) {

    const d = 1;

    const data = tetrahedronData(order);

    var tetrahedron;

    if (data.metric() == "spherical") {

        refinement += 1;
        tetrahedron = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric() == "hyperbolic") {

        tetrahedron = hyperbolicGeometry(data, transform, refinement, model);

    }

    return [tetrahedron, data.faceReflections, data.numFaces];

}

export { tetrahedronGeometry };
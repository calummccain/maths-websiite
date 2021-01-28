import { dodecahedronData } from "../data/53n.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";
import { sphericalGeometry } from "./spherical-geometry.js";

function dodecahedronGeometry(transform, order, refinement, model) {

    const data = dodecahedronData(order);

    const d = 1;

    var dodecahedron;

    if (data.metric() == "spherical") {

        dodecahedron = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric() == "hyperbolic") {

        dodecahedron = hyperbolicGeometry(data, transform, refinement, model);

    }

    return [dodecahedron, data.faceReflections, data.numFaces];

}

export { dodecahedronGeometry };
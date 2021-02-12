import { cubeData } from "../data/43n.js";
import { euclideanGeometry } from "./euclidean-geometry.js";
import { sphericalGeometry } from "./spherical-geometry.js";
import { hyperbolicGeometry } from "./hyperbolic-geometry.js";

function cubeGeometry(transform, order, refinement, model) {

    const data = cubeData(order);

    const d = 1;

    var cube;

    if (data.metric() == "spherical") {

        refinement += 1;
        cube = sphericalGeometry(data, transform, refinement, d);

    } else if (data.metric() == "euclidean") {

        cube = euclideanGeometry(data, transform);

    } else if (data.metric() == "hyperbolic") {

        cube = hyperbolicGeometry(data, transform, refinement, model);

    }

    return [cube, data.faceReflections, data.numFaces];

}

export { cubeGeometry };
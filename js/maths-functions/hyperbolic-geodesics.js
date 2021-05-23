// ========================================================
// Given two endpoints, generate the hyperbolic geodesic
// between them
// 
// Inputs: a, b, number, model
// Output: array of intermediary points
//
// Change history:
//     18/05/21 Initial commit
//=========================================================

import * as HF from "./hyperbolic-functions.js";

function hyperbolicGeodesic(a, b, number, model) {

    var edge = [];
    var ratios = [];

    const denom = 1 / Math.sqrt(Math.abs(2 * HF.hyperboloidInnerProduct(localVertices[data.edges[0][0]].hyperboloid, localVertices[data.edges[0][1]].hyperboloid)));
    const a = 10 / number;
    var theta = -5;

    for (var i = 0; i <= number; i++) {

        ratios.push(Math.exp(theta) * denom);
        theta += a;

    }

    if (model === "uhp") {

        for (var i = 0; i <= number; i++) {

            edge.push(HF.hyperboloidToUpperHalfPlane(VF.vectorSum([VF.vectorScale(a, ratios[i]), VF.vectorScale(b, ratios[number - i])])));

        }

    } else if (model === "poincare") {

        for (var i = 0; i <= number; i++) {

            edge.push(HF.hyperboloidToPoincare(VF.vectorSum([VF.vectorScale(a, ratios[i]), VF.vectorScale(b, ratios[number - i])])));

        }

    }

    return edge;

}

export { hyperbolicGeodesic };
// ========================================================
// Given two endpoints, generate the hyperbolic geodesic
// between them
// 
// Inputs: a, b, number, model
// Output: array of intermediary points
//
// Change history:
//     18/05/21 Initial commit
//     23/05/21 Added VF and updates inputs
//=========================================================

import * as HF from "./hyperbolic-functions.js";
import * as VF from "./vector-functions.js";

function hyperbolicGeodesic(p1, p2, number, model) {

    var edge = [];
    var ratios = [];

    const denom = 1 / Math.sqrt(Math.abs(2 * HF.hyperboloidInnerProduct(p1.hyperboloid, p2.hyperboloid)));
    const a = 10 / number;
    var theta = -5;

    for (var i = 0; i <= number; i++) {

        ratios.push(Math.exp(theta) * denom);
        theta += a;

    }

    if (model === "uhp") {

        for (var i = 0; i <= number; i++) {

            edge.push(HF.hyperboloidToUpperHalfPlane(VF.vectorSum([VF.vectorScale(p1.hyperboloid, ratios[i]), VF.vectorScale(p2.hyperboloid, ratios[number - i])])));

        }

    } else if (model === "poincare") {

        for (var i = 0; i <= number; i++) {

            edge.push(HF.hyperboloidToPoincare(VF.vectorSum([VF.vectorScale(p1.hyperboloid, ratios[i]), VF.vectorScale(p2.hyperboloid, ratios[number - i])])));

        }

    }

    return edge;

}

export { hyperbolicGeodesic };
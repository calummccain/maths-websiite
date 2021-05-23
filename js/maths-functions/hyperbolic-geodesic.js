// ========================================================
// Given two endpoints, generate the hyperbolic geodesic
// between them
// 
// Inputs: a, b, number
// Output: array of intermediary points
//
// Change history:
//     18/05/21 Initial commit
//     23/05/21 Added VF and updates inputs
//              Returns both poincare and upper half plane
//              geodesics as a dictionary
//=========================================================

import * as HF from "./hyperbolic-functions.js";
import * as VF from "./vector-functions.js";

function hyperbolicGeodesic(p1, p2, number) {

    var edgePoincare = [];
    var edgeUpperHalfPlane = [];
    var p;
    var ratios = [];

    const denom = 1 / Math.sqrt(Math.abs(2 * HF.hyperboloidInnerProduct(p1.hyperboloid, p2.hyperboloid)));
    const a = 10 / number;
    var theta = -5;

    for (var i = 0; i <= number; i++) {

        ratios.push(Math.exp(theta) * denom);
        theta += a;

    }

    for (var i = 0; i <= number; i++) {

        p = VF.vectorSum([VF.vectorScale(p1.hyperboloid, ratios[i]), VF.vectorScale(p2.hyperboloid, ratios[number - i])]);

        edgePoincare.push(HF.hyperboloidToPoincare(p));
        edgeUpperHalfPlane.push(HF.hyperboloidToUpperHalfPlane(p));

    }

    return { poincare: edgePoincare, uhp: edgeUpperHalfPlane };

}

export { hyperbolicGeodesic };
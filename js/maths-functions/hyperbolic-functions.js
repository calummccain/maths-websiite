import * as VF from "./vector-functions.js";
import {
    hyperboloidToPoincareEps,
    poincareToUpperHalfPlaneEps,
    poincareToHyperboloidEps,
    kleinToPoincareEps,
    geodesicEndpointsEps
} from "../eps.js";

// ========================================================
// Hyperboloid model inner product
// 
// Inputs: x, y
// Output: <x,y> with the lorentzian metric tensor
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperboloidInnerProduct(x, y) {

    return x[0] * y[0] - x[1] * y[1] - x[2] * y[2] - x[3] * y[3];

}

// ========================================================
// Hyperboloid model norm
// 
// Inputs: x
// Output: <x,x> with the lorentzian metric tensor
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperbolicNorm(x) {

    return hyperboloidInnerProduct(x, x);

}

// ========================================================
// Stereographic projection from hyperboloid model to
// the poincare model
//
// Inputs: x
// Output: If x is on/near lightcone (x1/x0, x2/x0, x3/x0)
//         If <x,x> > 0 (x1/(1+x0), x2/(1+x0), x3/(1+x0))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperboloidToPoincare(x) {

    if (Math.abs(hyperbolicNorm(x)) < hyperboloidToPoincareEps) {

        const scale = 1 / x[0];
        return [x[1] * scale, x[2] * scale, x[3] * scale];

    } else if (hyperbolicNorm(x) >= hyperboloidToPoincareEps) {

        const scale = 1 / (1 + x[0]);
        return [x[1] * scale, x[2] * scale, x[3] * scale];

    } else {

        const initialVect = [x[1], x[2], x[3]];
        const l = VF.norm(initialVect);

        return VF.vectorScale(initialVect, 1 / l);

    }

}

// ========================================================
// Stereographic projection from hyperboloid model to
// the klein model
//
// Inputs: x
// Output: (1, x0, x1, x2) / sqrt(1-r^2)
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function kleinToHyperboloid(x) {

    const w = 1 / Math.sqrt(1 - x[0] * x[0] - x[1] * x[1] - x[2] * x[2]);

    return [w, x[0] * w, x[1] * w, x[2] * w];

}

// ========================================================
// Stereographic projection from klein model to
// the hyperboloid model
//
// Inputs: x
// Output: ()
//
// Change history:
//     15/05/21 Initial commit
//=========================================================

function hyperboloidToKlein(x) {

    return [x[1] / x[0], x[2] / x[0], x[3] / x[0]];

}

// ========================================================
// Cayley transform from the poincare model to the upper
// half plane model
//
// Inputs: point = (x,y,z)
// Output: (2 * x / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//          2 * y / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//          (1 - x ** 2 - y ** 2 - z ** 2) / 
//                        (x ** 2 + y ** 2 + (1 - z) ** 2))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function poincareToUpperHalfPlane(point) {

    var x = point[0], y = point[1], z = point[2];
    var s = 1 / (x * x + y * y + 1 - 2 * z + z * z);

    if (s < poincareToUpperHalfPlaneEps) {

        return [x, y, Infinity];

    } else if (VF.norm2([x, y, z]) > 1 - poincareToUpperHalfPlaneEps) {

        return [2 * x * s, 2 * y * s, 0];

    } else {

        return [2 * x * s, 2 * y * s, (1 - x * x - y * y - z * z) * s];

    }

}

// ========================================================
// Cayley transform from the upper half plane model to the
// poincare model
//
// Inputs: point = (x,y,z)
// Output: (2 * x / (x ** 2 + y ** 2 + (1 + z) ** 2), 
//          2 * y / (x ** 2 + y ** 2 + (1 + z) ** 2), 
//          (x ** 2 + y ** 2 + z ** 2 - 1) / 
//                        (x ** 2 + y ** 2 + (1 + z) ** 2))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function upperHalfPlaneToPoincare(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = 1 / (x * x + y * y + (1 + z) * (1 + z));

    return [2 * x * s, 2 * y * s, (x * x + y * y + z * z - 1) * s];

}

// ========================================================
// Cayley transform from the poincare model to the upper
// half plane model
//
// Inputs: x
// Output: ((1+r)/(1-r), 2 x0 / (1-r), 2 x1 / (1-r), 2 x2 / (1-r))
//         or (1, x0, x1, x2) if on light cone
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function poincareToHyperboloid(x) {

    const r = x[0] * x[0] + x[1] * x[1] + x[2] * x[2];

    if (Math.abs(r - 1) < poincareToHyperboloidEps) {

        const denom = 1 / (1 - r);

        return [(1 + r) * denom, 2 * x[0] * denom, 2 * x[1] * denom, 2 * x[2] * denom];

    } else {

        return [1, x[0], x[1], x[2]];
    }

}

// ========================================================
// Transform from klein model to poincare model
//
// Inputs: x
// Output: x / (1+sqrt(1-r^2))
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function kleinToPoincare(x) {

    var dist = VF.norm2(x);
    var hyperbolicDist = (dist < 1 - kleinToPoincareEps) ? 1 / (1 + Math.sqrt(Math.abs(1 - dist))) : 1;

    return VF.vectorScale(x, hyperbolicDist);

}

// ========================================================
// Transform from hyperboloid model to uhp model
//
// Inputs: x
// Output: ?
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function hyperboloidToUpperHalfPlane(point) {

    return poincareToUpperHalfPlane(hyperboloidToPoincare(point));

}

// ========================================================
// Transform from klein model to uhp model
//
// Inputs: x
// Output: ?
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function kleinToUpperHalfPlane(point) {

    return poincareToUpperHalfPlane(kleinToPoincare(point));

}

// ========================================================
// Transform from uhp model to klein model
//
// Inputs: x
// Output: ?
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function upperHalfPlaneToKlein(point) {

    return poincareToKlein(upperHalfPlaneToPoincare(point));

}

// ========================================================
// Transform from poincare model to klein model
//
// Inputs: x
// Output: ?
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function poincareToKlein(x) {

    const s = 2 / (1 + VF.norm2(x));

    return VF.vectorScale(x, s);

}

// ========================================================
// Find the center of a sphere knowing three points lying
// on it's surface and that the center lies on the plane
// z = 0
//
// Inputs: p1, p2, p3 
// Output: center = [*, *, *]
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function uhpCenter(p1, p2, p3) {

    var p12 = VF.midpoint(p1, p2);
    var p13 = VF.midpoint(p1, p3);
    var n12 = VF.vectorDiff(p1, p2);
    var n13 = VF.vectorDiff(p1, p3);

    var d12 = VF.vectorDot(p12, n12);
    var d13 = VF.vectorDot(p13, n13);

    var n0 = [0, 0, 1];

    var A = [n0[0], n12[0], n13[0]];
    var B = [n0[1], n12[1], n13[1]];
    var C = [n0[2], n12[2], n13[2]];
    var D = [0, d12, d13];

    var ABC = 1 / VF.determinant3([A, B, C]);

    return [
        VF.determinant3([D, B, C]) * ABC,
        VF.determinant3([A, D, C]) * ABC,
        VF.determinant3([A, B, D]) * ABC
    ];

}

// ========================================================
// Given two points in the hyperboloid model calculates the
// endpoints of the geodesic that passes through them
// (endpoints lie on the plane at infinity)
//
// Inputs: a, b
// Output: [p1, p2]
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

function geodesicEndpoints(a, b) {

    if ((Math.abs(hyperbolicNorm(a)) < geodesicEndpointsEps) && (Math.abs(hyperbolicNorm(b)) < geodesicEndpointsEps)) {

        return [a, b];

    }

    var inner = hyperboloidInnerProduct(a, b);
    var eAlpha = 1 / (inner + Math.sqrt(inner * inner - 1));

    return [VF.vectorDiff(VF.vectorScale(a, eAlpha), b), VF.vectorDiff(VF.vectorScale(b, eAlpha), a)];

}


export {
    poincareToHyperboloid,
    hyperboloidInnerProduct,
    poincareToUpperHalfPlane,
    hyperboloidToKlein,
    hyperboloidToPoincare,
    hyperbolicNorm,
    kleinToPoincare,
    hyperboloidToUpperHalfPlane,
    kleinToUpperHalfPlane,
    kleinToHyperboloid,
    upperHalfPlaneToPoincare,
    upperHalfPlaneToKlein,
    uhpCenter,
    geodesicEndpoints
};
import * as VF from "./vector-functions.js";

const tol = 1e-4;

// hyperboloid inner product
function hyperboloidInnerProduct(x, y) {

    return x[0] * y[0] - x[1] * y[1] - x[2] * y[2] - x[3] * y[3];

}

function hyperbolicNorm(x) {

    return x[0] ** 2 - x[1] ** 2 - x[2] ** 2 - x[3] ** 2;

}

// stereographic projection from the hyperboloid model to the poincare model 
//                 (w, x, y, z) ===> (x / (1 + w), y / (1 + w), z / (1 + w))
// if on lightcone (w, x, y, z) ===> (x / w, y / w, z / w)
function hyperboloidToPoincare(point) {

    if (Math.abs(hyperbolicNorm(point)) < tol) {

        var scale = point[0];
        return [point[1] / scale, point[2] / scale, point[3] / scale];

    } else {

        var scale = 1 + point[0];
        return [point[1] / scale, point[2] / scale, point[3] / scale];

    }

}

// stereographic projection from the hyperboloid model to the klein model (use for ideal points too)
// (w, x, y, z) ===> (x / w, y / w, z / w)
function hyperboloidToKlein(point) {

    var scale = point[0];
    return [point[1] / scale, point[2] / scale, point[3] / scale];

}

// 'Cayley transform' from poincare to UHP
// (x, y, z) ===> (2 * x / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//                 2 * y / (x ** 2 + y ** 2 + (1 - z) ** 2), 
//                 (1 - x ** 2 - y ** 2 - z ** 2) / (x ** 2 + y ** 2 + (1 - z) ** 2))
function poincareToUpperHalfPlane(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = (x ** 2) + (y ** 2) + (1 - z) ** 2;

    if (s < tol) {

        return [0, 0, Infinity];

    }

    if (VF.norm(point) > 1 - tol) {

        return [2 * x / s, 2 * y / s, 0];

    }

    return [2 * x / s, 2 * y / s, (1 - (x ** 2) - (y ** 2) - (z ** 2)) / s];

}

function upperHalfPlaneToPoincare(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = (x ** 2) + (y ** 2) + (1 + z) ** 2;
    return [2 * x / s, 2 * y / s, ((x ** 2) + (y ** 2) + (z ** 2) - 1) / s];

}

// TODO what if point is ideal ie r = 1 - tol
function poincareToHyperboloid(point) {

    const r = VF.norm(point) ** 2;

    return [(1 + r) / (1 - r), 2 * point[0] / (1 - r), 2 * point[1] / (1 - r), 2 * point[2] / (1 - r)];

}

// 'Cayley transform' from poincare to UHP
// (w, x, y, z) ===> (x / (w - z), 
//                    y / (w - z), 
//                    (z ** 2) / (2 * w * (w - z)))
// function lightConeToUpperHalfPlane(point) {

//     var w = point[0];
//     var x = point[1];
//     var y = point[2];
//     var z = point[3];
//     var s = x ** 2 + y ** 2 + (w - z) ** 2;
//     return [2 * x / s, 2 * y / s, (1 - x ** 2 - y ** 2) / s];

// }

// TODO ideal point again
function kleinToPoincare(point) {

    const dist = VF.norm(point);
    var hyperbolicDist = 1 / (1 + Math.sqrt(Math.abs(1 - (dist ** 2))));

    return VF.vectorScale(point, hyperbolicDist);

}

function hyperboloidToUpperHalfPlane(point) {

    // var w = point[0];
    // var x = point[1];
    // var y = point[2];
    // var z = point[3];

    // var den = (w ** 2) + 1 - z * (w + 1);

    //return [x * (w + 1) / den, y * (w + 1) / den, 2 * w / den];

    return poincareToUpperHalfPlane(hyperboloidToPoincare(point));
}

function kleinToUpperHalfPlane(point) {

    return poincareToUpperHalfPlane(kleinToPoincare(point));

}

function upperHalfPlaneToKlein(point) {

    return poincareToKlein(upperHalfPlaneToPoincare(point));

}

function poincareToKlein(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = 1 + x ** 2 + y ** 2 + z ** 2;
    return [2 * x / s, 2 * y / s, 2 * z / s];

}

// finds center of a crcle knowing two points and that it lies on z = 0
function uhpCenter(p1, p2, p3) {

    var p12 = VF.midpoint(p1, p2);
    var p13 = VF.midpoint(p1, p3);
    var n12 = VF.vectorDiff(p1, p2);
    var n13 = VF.vectorDiff(p1, p3);

    var d12 = VF.vectorDot(p12, n12);
    var d13 = VF.vectorDot(p13, n13);

    var p0 = [0, 0, 0];
    var n0 = [0, 0, 1];

    var A = [n0[0], n12[0], n13[0]];
    var B = [n0[1], n12[1], n13[1]];
    var C = [n0[2], n12[2], n13[2]];
    var D = [0, d12, d13];

    var ABC = VF.determinant3([A, B, C]);

    return [
        VF.determinant3([D, B, C]) / ABC,
        VF.determinant3([A, D, C]) / ABC,
        VF.determinant3([A, B, D]) / ABC
    ];

}


function geodesicEndpoints(a, b) {

    const inner = hyperboloidInnerProduct(a, b);
    const eAlpha = inner + Math.sqrt(inner ** 2 - 1);
    return [VF.vectorSum(VF.scale(a, 1 / eAlpha), b), VF.vectorDiff(VF.scale(b, 1 / eAlpha), a)];

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
    upperHalfPlaneToPoincare,
    upperHalfPlaneToKlein,
    uhpCenter,
    geodesicEndpoints
};
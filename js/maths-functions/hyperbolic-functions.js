import * as VF from "./vector-functions.js";

function transformVertices(baseVertices, transformation, dictionary) {

    var newVertices = [];
    var e1 = [1, 0, 0, 0], e2 = [0, 1, 0, 0], e3 = [0, 0, 1, 0], e4 = [0, 0, 0, 1];

    if (transformation !== '') {

        for (var i = transformation.length - 1; i > -1; i--) {

            e1 = dictionary(transformation[i], e1);
            e2 = dictionary(transformation[i], e2);
            e3 = dictionary(transformation[i], e3);
            e4 = dictionary(transformation[i], e4);

        }

    }

    for (var j = 0; j < baseVertices.length; j++) {

        var oldVertex = baseVertices[j];
        var newVertex = VF.vectorSum(
            VF.vectorSum(
                VF.vectorScale(e1, oldVertex[0]),
                VF.vectorScale(e2, oldVertex[1])
            ),
            VF.vectorSum(
                VF.vectorScale(e3, oldVertex[2]),
                VF.vectorScale(e4, oldVertex[3])
            )
        );

        newVertices.push(newVertex);

    }

    return newVertices;

}

// stereographic projection from the hyperboloid model to the poincare model
// (w, x, y, z) ===>(x / (1 + w), y / (1 + w), z / (1 + w))
function hyperboloidToPoincare(point) {

    var scale = 1 + point[0];
    return [point[1] / scale, point[2] / scale, point[3] / scale];

}

// stereographic projection from the hyperboloid model to the poincare model 
//                 (w, x, y, z) ===> (x / (1 + w), y / (1 + w), z / (1 + w))
// if on lightcone (w, x, y, z) ===> (x / w, y / w, z / w)
function hyperboloidToPoincareMod(point) {

    if (Math.abs((point[0] ** 2) - (point[1] ** 2) - (point[2] ** 2) - (point[3] ** 2)) < 0.001) {

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
    if (s < 1e-3) {
        return [0, 0, 100];
    }
    if (VF.norm(point) > 1 - 1e-3) {
        return [2 * x / s, 2 * y / s, 0];
    }

    return [2 * x / s, 2 * y / s, (1 - (x ** 2) - (y ** 2) - (z ** 2)) / s];

}

function upperHalfPlaneToPoincare(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = (x ** 2) + (y ** 2) + (1 + z) ** 2;
    return [2 * x / s, 2 * y / s, ((x ** 2) + (y ** 2) + (z ** 2) - 1) / s];

}

function poincareToHyperboloid(point) {

    const r = point[0] ** 2 + point[1] ** 2 + point[2] ** 2;

    return [(1 + r) / (1 - r), 2 * point[0] / (1 - r), 2 * point[1] / (1 - r), 2 * point[2] / (1 - r)]

}

// 'Cayley transform' from poincare to UHP
// (w, x, y, z) ===> (x / (w - z), 
//                    y / (w - z), 
//                    (z ** 2) / (2 * w * (w - z)))
function lightConeToUpperHalfPlane(point) {

    var w = point[0];
    var x = point[1];
    var y = point[2];
    var z = point[3];
    var s = x ** 2 + y ** 2 + (w - z) ** 2;
    return [2 * x / s, 2 * y / s, (1 - x ** 2 - y ** 2) / s];

}

function kleinToPoincare(point) {

    const dist = Math.sqrt((point[0] ** 2) + (point[1] ** 2) + (point[2] ** 2));
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

    return poincareToUpperHalfPlane(hyperboloidToPoincareMod(point));
}

function kleinToUpperHalfPlane(point) {

    var poin = kleinToPoincare(point);
    return poincareToUpperHalfPlane(poin);

}

function upperHalfPlaneToKlein(point) {

    var poin = upperHalfPlaneToPoincare(point);
    return poincareToKlein(poin);

}

function poincareToKlein(point) {

    const x = point[0], y = point[1], z = point[2];
    const s = 1 + x ** 2 + y ** 2 + z ** 2;
    return [2 * x / s, 2 * y / s, 2 * z / s];

}

// hyperboloid inner product
function hyperboloidInnerProduct(x, y) {

    return x[0] * y[0] - x[1] * y[1] - x[2] * y[2] - x[3] * y[3];

}

function hyperbolicNorm(x) {

    return x[0] ** 2 - x[1] ** 2 - x[2] ** 2 - x[3] ** 2;

}

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

    var ABC = VF.determinant([A, B, C]);

    return [
        VF.determinant([D, B, C]) / ABC,
        VF.determinant([A, D, C]) / ABC,
        VF.determinant([A, B, D]) / ABC
    ];

}


export {
    transformVertices,
    poincareToHyperboloid,
    hyperboloidInnerProduct,
    hyperboloidToPoincare,
    poincareToUpperHalfPlane,
    hyperboloidToKlein,
    hyperboloidToPoincareMod,
    hyperbolicNorm,
    kleinToPoincare,
    hyperboloidToUpperHalfPlane,
    kleinToUpperHalfPlane,
    upperHalfPlaneToPoincare,
    upperHalfPlaneToKlein,
    uhpCenter
};
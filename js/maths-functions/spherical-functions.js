import * as VF from "../maths-functions/vector-functions.js";

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


function sphereToPoincare(point, d) {

    if (Math.abs(point[0] - d) < 1e-4) {

        return [point[1], point[2], point[3]];

    } else {

        var scale = d / (d + point[0]);
        return [point[1] * scale, point[2] * scale, point[3] * scale];

    }

}


function sphericalInnerProduct(x, y) {

    return x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];

}


function sphereNorm(x) {

    return x[0] ** 2 + x[1] ** 2 + x[2] ** 2 + x[3] ** 2;

}


export { transformVertices, sphereNorm, sphereToPoincare, sphericalInnerProduct };
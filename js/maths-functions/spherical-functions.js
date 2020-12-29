function sphereToPoincare(point, d) {

    var scale = d / (d - point[0]);
    var newPoint = [point[1] * scale, point[2] * scale, point[3] * scale];

    return newPoint;

}

function sphericalInnerProduct(x, y) {

    var innerProduct = x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];

    return innerProduct;
    
}

function sphereNorm(x) {

    var norm = x[0] ** 2 + x[1] ** 2 + x[2] ** 2 + x[3] ** 2;

    return norm;

}

export { sphereNorm, sphereToPoincare, sphericalInnerProduct };
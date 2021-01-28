//performs the stereographic projection
function sphereToPoincare(point, d) {

    const tol = 1e-4;

    if (Math.abs(point[0] - d) < tol) {

        return [point[1], point[2], point[3]];

    } else {

        var scale = d / (d + point[0]);
        return [point[1] * scale, point[2] * scale, point[3] * scale];

    }

}

export { sphereToPoincare };
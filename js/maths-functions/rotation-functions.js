function rx(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], v[1], c * v[2] - s * v[3], s * v[2] + c * v[3]];

}

function ry(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], c * v[1] - s * v[3], v[2], s * v[1] + c * v[3]];

}

function rz(v, theta) {

    const c = Math.cos(theta);
    const s = Math.sin(theta);

    return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2], v[3]];

}

function rxyz(v, x, y, z) {

    return rx(ry(rz(v, z), y), x);

}

export { rx, ry, rz, rxyz };
// Order 6 cubic

//fev
// const d = [
//     [2, -1, 0, 0],
//     [3, -2, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function d(v) {
    return [2 * v[0] - v[1], 3 * v[0] - 2 * v[1], v[2], v[3]];
}

// const f = [
//     [Math.sqrt(3), 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function f(v) {
    return [Math.sqrt(3) * v[0], v[1], v[2], v[3]];
}

const center = [1 / Math.sqrt(3), 0, 0, 0];

export { d, f, center };
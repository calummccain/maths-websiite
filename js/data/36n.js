// Order n triangular

import { boundaries } from "./geometry-decider.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

const eps = 1e-4;

const triangleData = (n) => {

    const metric = boundaries(n, 2, 3);
    const c = Math.cos(Math.PI / n) ** 2;
    const den = Math.sqrt(Math.abs(1 - 4 * c));

    const V = [1, 0, 2, 0];
    const E = [2, 0, 1, 1];
    const F = [1, 0, 0, 0];
    const C = [c, 1, 0, 0];

    // CFE
    // (0, 0, 3, -1)
    const amat = (v) => {

        return [v[0], v[1], (-v[2] + 3 * v[3]) / 2, (v[2] + v[3]) / 2];

    }

    // CFV
    // (0, 0, 0, 1)
    const bmat = (v) => {

        return [v[0], v[1], v[2], -v[3]];

    }

    // CEV
    // (2 cn ** 2, 2, 1, 1)
    const cmat = (v) => [
        (1 + 2 * c) * v[0] - 2 * (c ** 2) * v[1] - c * v[2] - 3 * c * v[3],
        2 * v[0] + (1 - 2 * c) * v[1] - v[2] - 3 * v[3],
        v[0] - c * v[1] + v[2] / 2 - 3 * v[3] / 2,
        v[0] - c * v[1] - v[2] / 2 - v[3] / 2
    ];

    // FEV
    // (0, 1, 0, 0)
    const dmat = (v) => {

        return [v[0], -v[1], v[2], v[3]];

    }

    const emat = (v) => {

        return v;

    }

    const fmat =
        (n == 3) ? (v) => [
            v[0],
            v[1] / 4,
            v[2] / 2,
            Math.sqrt(3) * v[3] / 2
        ] : (v) => [
            v[0] / den,
            c * v[1] / den,
            Math.sqrt(c) * v[2] / den,
            Math.sqrt(3 * c) * v[3] / den
        ];

    function makeVertices() {

        var verts = [
            [1, 0, 2, 0],
            [1, 0, -1, -1],
            [1, 0, -1, 1]
        ];

        var newVerts = [];

        for (var i = 0; i < fNames.length; i++) {

            var testVertices = VF.transformVertices(verts, fNames[i], matrixDict);

            testVertices.forEach((vector) => {
                if (!(VF.isInArray(vector, verts) || VF.isInArray(vector, newVerts))) {

                    newVerts.push(vector);

                }
            })

        }

        verts = verts.concat(newVerts);

        return verts;

    }

    function makeEdges() {

        var edges = [
            VF.vectorScale([2, 0, 1, -1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, 1, -1]))))),
            VF.vectorScale([2, 0, 1, 1], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([2, 0, 1, 1]))))),
            VF.vectorScale([1, 0, -1, 0], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([1, 0, -1, 0])))))
        ];

        var newEdges = [];

        for (var i = 0; i < fNames.length; i++) {

            var testEdges = VF.transformVertices(edges, fNames[i], matrixDict);

            testEdges.forEach((vector) => {
                if (!(VF.isInArray(vector, edges) || VF.isInArray(vector, newEdges))) {

                    newEdges.push(vector);

                }
            })

        }

        edges = edges.concat(newEdges);

        return edges;

    }

    function matrixDict(letter, v) {

        if (letter === "a") {

            return amat(v);

        } else if (letter === "b") {

            return bmat(v);

        } else if (letter === "c") {

            return cmat(v);

        } else if (letter === "d") {

            return dmat(v);

        } else if (letter === "e") {

            return emat(v);

        } else if (letter === "f") {

            return fmat(v);

        } else {

            throw 'letter needs to be one of a, b, c, d, e, f!';

        }

    }

    function makeFaces() {

        var faces = [[(n == 3) ? 1 : den, 0, 0, 0]];
        var faceNames = [""];
        const maxFaces = 100;
        var i = 1;

        while (i < maxFaces) {

            var j = 0
            var append = "c";
            var newFaces = [];
            var newNames = [];

            while (j < 3) {

                const testCenters = VF.transformVertices(faces, append, matrixDict);

                for (var k = 0; k < testCenters.length; k++) {

                    if (!(VF.isInArray(testCenters[k], faces) || VF.isInArray(testCenters[k], newFaces))) {
                        newFaces.push(testCenters[k]);
                        newNames.push(append + faceNames[k]);
                    }

                }

                append = "ab" + append;
                j++;

            }

            faces = faces.concat(newFaces);
            faceNames = faceNames.concat(newNames);

            i = faces.length;

        }

        return [faces, faceNames];

    }

    function generateFaceData() {

        var faceData = [];
        var fv = 0;

        if (metric !== "p") {

            fv = Math.abs(1 / (1 - 4 * c));

        } else {

            fv = 1;

        }

        f.forEach((face) => {

            var nearestPoints = [];
            var j = 0;

            for (var i = 0; i < v.length; i++) {

                if (j === 3) {

                    break;

                }

                if (Math.abs(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(face)) ** 2 - fv) < eps) {

                    nearestPoints.push(i)
                    j++;

                }

            }

            faceData.push(nearestPoints);

        })

        return faceData;

    }

    function generateEdgeData() {

        var edgeData = [];
        var ev = 0;

        if (metric !== "p") {

            ev = Math.abs((1 - c) / (1 - 4 * c));

        } else {

            ev = HF.hyperboloidInnerProduct(fmat(v[0]), fmat(e[0])) ** 2;

        }

        e.forEach((edge) => {

            var nearestPoints = [];
            var j = 0;

            for (var i = 0; i < v.length; i++) {

                if (j === 2) {

                    break;

                }

                if (Math.abs(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(edge)) ** 2 - ev) < eps) {

                    nearestPoints.push(i)
                    j++;

                }

            }

            edgeData.push(nearestPoints);

        })

        return edgeData;

    }

    const [f, fNames] = makeFaces();
    const v = makeVertices();
    const e = makeEdges();
    const faceData = generateFaceData();
    const edgeData = generateEdgeData();

    return {

        vertices: v,

        edges: edgeData,

        faces: faceData,

        numVertices: v.length,

        numEdges: edgeData.length,

        numFaces: faceData.length,

        numSides: 3,

        a: amat,

        b: bmat,

        c: cmat,

        d: dmat,

        e: emat,

        f: fmat,

        conversion: (v) => {

            return [1 + c * v[1], v[1], v[2], v[3]];

        },

        faceReflections: fNames,

        outerReflection: "d",

        // 3 4 5 6 7
        // p u u u u
        metric: metric,

        cellType: "euclidean",

        flip: (v) => {

            return [v[0], v[1], v[2], v[3]];

        }

    }

}


export { triangleData };
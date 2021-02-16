// {p,q,r} data

import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

const eps = 1e-4;

const pqrData = (p, q, r) => {

    const cr = (i) => Math.cos(Math.PI * i / r);
    const sr = (i) => Math.sin(Math.PI * i / r);

    const cq = (i) => Math.cos(Math.PI * i / q);
    const sq = (i) => Math.sin(Math.PI * i / q);

    const cp = (i) => Math.cos(Math.PI * i / p);
    const sp = (i) => Math.sin(Math.PI * i / p);

    const qr = (q - 2) * (r - 2);

    const faceCenter = [(qr === 4 ? 1 : sp(1) * Math.sqrt(Math.abs(sr(1) ** 2 - cq(1) ** 2)) / (cp(1) * cq(1))), 0, 0, 0];

    // cfe
    const amat = (v) => {

        return [v[0], v[1], v[2], -v[3]];

    }

    //cfv
    const bmat = (v) => {

        const c = cp(2);
        const s = sp(2);

        return [v[0], v[1], c * v[2] + s * v[3], s * v[2] - c * v[3]];

    }

    //cev
    const cmat = (v) => {

        const cqc = cq(1);
        const src = sr(1);
        const spc = sp(1);
        const cpc = cp(1);
        const crc = cr(1);

        const r = src ** 2 * spc ** 2 - cqc ** 2;

        return [
            (1 - 2 * r / (spc ** 2)) * v[0] + (2 * r * crc / (spc * cpc * cqc)) * v[1] + (2 * r / (cpc * (spc ** 2))) * v[2],
            (2 * cpc * cqc * crc / spc) * v[0] + (1 - 2 * (crc ** 2)) * v[1] - (2 * crc * cqc / spc) * v[2],
            (2 * cpc * (cqc) ** 2 / (spc ** 2)) * v[0] - (2 * crc * cqc / spc) * v[1] + (1 - 2 * (cqc ** 2) / (spc ** 2)) * v[2],
            v[3]
        ];

    }

    // fev
    const dmat = (v) => {

        return [v[0], -v[1], v[2], v[3]];

    }

    const emat = (v) => {

        return v;

    }

    const fmat = (v) => {

        if (qr === 4) {

            return v;

        } else {

            const den = sp(1) * Math.sqrt(Math.abs(sr(1) ** 2 - cq(1) ** 2));

            return [
                cp(1) * cq(1) * v[0] / den,
                Math.sqrt(Math.abs(sp(1) ** 2 * sr(1) ** 2 - cq(1) ** 2)) * v[1] / den,
                Math.sqrt(Math.abs(sp(1) ** 2 * sr(1) ** 2 - cq(1) ** 2)) * v[2] / den,
                Math.sqrt(Math.abs(sp(1) ** 2 * sr(1) ** 2 - cq(1) ** 2)) * v[3] / den
            ];

        }

    }

    function makeVertices() {

        var verts = [];

        for (var i = 0; i < p; i++) {

            verts.push([1, 0, cp(2 * i + 1), sp(2 * i + 1)]);

        }

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

        var edges = [];

        for (var i = 0; i < p; i++) {

            var initialEdge = [1, 0, cp(1) * cp(2 * i), cp(1) * sp(2 * i)];

            edges.push(VF.vectorScale(initialEdge, 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat(initialEdge))))));

        }

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

        var faces = [faceCenter];
        var faceNames = [""];
        const maxFaces = 40;
        var i = 1;

        while (i < maxFaces) {

            var j = 0
            var append = "c";
            var newFaces = [];
            var newNames = [];

            while (j < p) {

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

        if (qr !== 4) {

            fv = Math.abs(cp(1) ** 2 * cq(1) ** 2 / (sp(1) ** 2 * (sr(1) ** 2 - cq(1) ** 2)));

        } else {

            fv = 1;

        }

        f.forEach((face) => {

            var nearestPoints = [];
            var j = 0;

            for (var i = 0; i < v.length; i++) {

                if (j === p) {

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

        if (qr !== 4) {

            ev = Math.abs(sr(1) ** 2 * cp(1) ** 2 / (sr(1) ** 2 - cq(1) ** 2));

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

        numFaces: fNames.length,

        numSides: p,

        // cfe
        a: amat,

        //cfv
        b: bmat,

        //cev
        c: cmat,

        // fev
        d: dmat,

        e: emat,

        f: fmat,

        faceReflections: fNames,

        outerReflection: "d",

        // center: [1, 1, 0, 0],

        face: () => {

            return faceCenter;

        },

        metric: () => {

            if (qr < 4) {

                return "h";

            } else if (qr === 4) {

                return "p";

            } else {

                return "u";

            }

        },

        cellType: "hyperbolic",

        flip: (v) => {

            return [v[0], v[2], v[3], v[1]];

        },

    }

}

export { pqrData };
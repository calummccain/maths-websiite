// {n, , }

import * as VF from "../maths-functions/vector-functions.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

const eps = 1e-4;

function isInArray(testVector, groupVectors) {

    for (var i = 0; i < groupVectors.length; i++) {

        if (VF.distance(groupVectors[i], testVector) < eps) {

            return true;

        }
    }

    return false;

}

const testData = (l, m, n) => {

    const cm = (i) => Math.cos(Math.PI * i / m);
    const sm = (i) => Math.sin(Math.PI * i / m);

    const cl = (i) => Math.cos(Math.PI * i / l);
    const sl = (i) => Math.sin(Math.PI * i / l);

    const cn = (i) => Math.cos(Math.PI * i / n);
    const sn = (i) => Math.sin(Math.PI * i / n);

    const faceCenter = [sn(1) * Math.sqrt(Math.abs(sm(1) ** 2 - cl(1) ** 2)) / (cn(1) * cl(1)), 0, 0, 0];

    // cfe
    const amat = (v) => {

        return [v[0], v[1], v[2], -v[3]];

    }

    //cfv
    const bmat = (v) => {

        const c = cn(2);
        const s = sn(2);

        return [v[0], v[1], c * v[2] + s * v[3], s * v[2] - c * v[3]];

    }

    //cev
    const cmat = (v) => {

        const clc = cl(1);
        const smc = sm(1);
        const snc = sn(1);
        const cnc = cn(1);
        const cmc = cm(1);

        const r = smc ** 2 * snc ** 2 - clc ** 2;

        return [
            (1 - 2 * r / (snc ** 2)) * v[0] + (2 * r * cmc / (snc * cnc * clc)) * v[1] + (2 * r / (cnc * (snc ** 2))) * v[2],
            (2 * cnc * clc * cmc / snc) * v[0] + (1 - 2 * (cmc ** 2)) * v[1] - (2 * cmc * clc / snc) * v[2],
            (2 * cnc * (clc) ** 2 / (snc ** 2)) * v[0] - (2 * cmc * clc / snc) * v[1] + (1 - 2 * (clc ** 2) / (snc ** 2)) * v[2],
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

        const den = sn(1) * Math.sqrt(Math.abs(sm(1) ** 2 - cl(1) ** 2));

        return [
            cn(1) * cl(1) * v[0] / den,
            Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[1] / den,
            Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[2] / den,
            Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[3] / den
        ];

    }

    function makeVertices() {

        var verts = [];

        for (var i = 0; i < n; i++) {

            verts.push([1, 0, cn(2 * i + 1), sn(2 * i + 1)]);

        }

        var newVerts = [];

        for (var i = 0; i < fNames.length; i++) {

            var testVertices = VF.transformVertices(verts, fNames[i], matrixDict);

            testVertices.forEach((vector) => {
                if (!(isInArray(vector, verts) || isInArray(vector, newVerts))) {

                    newVerts.push(vector);

                }
            })

        }

        verts = verts.concat(newVerts);

        return verts;

    }

    function makeEdges() {

        var edges = [];

        for (var i = 0; i < n; i++) {

            console.log(1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([1, 0, cn(2 * i), sn(2 * i)])))))

            edges.push(VF.vectorScale([1, 0, cn(2 * i), sn(2 * i)], 1 / Math.sqrt(Math.abs(HF.hyperbolicNorm(fmat([1, 0, cn(2 * i), sn(2 * i)]))))));

        }

        var newEdges = [];

        for (var i = 0; i < fNames.length; i++) {

            var testEdges = VF.transformVertices(edges, fNames[i], matrixDict);

            testEdges.forEach((vector) => {
                if (!(isInArray(vector, edges) || isInArray(vector, newEdges))) {

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
        const numLayers = 1;
        var i = 0;

        while (i < numLayers) {

            var j = 0
            var append = "c";
            var newFaces = [];
            var newNames = [];

            while (j < n) {

                const testCenters = VF.transformVertices(faces, append, matrixDict);

                for (var k = 0; k < testCenters.length; k++) {

                    if (!(isInArray(testCenters[k], faces) || isInArray(testCenters[k], newFaces))) {
                        newFaces.push(testCenters[k]);
                        newNames.push(append + faceNames[k]);
                    } else {
                        //
                    }

                }

                append = "ab" + append;
                j++;

            }

            faces = faces.concat(newFaces);
            faceNames = faceNames.concat(newNames);

            i++;

        }

        return [faces, faceNames];

    }

    function generateFaceData() {

        var faceData = [];

        f.forEach((face) => {

            var nearestPoints = [];
            var j = 0;

            for (var i = 0; i < v.length; i++) {

                if (j === n) {

                    break;

                }

                //console.log(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(face)) ** 2)
                //console.log((cn(1) ** 2 * cl(1) ** 2 / (sn(1) ** 2 * (sm(1) ** 2 - cl(1) ** 2))))

                if (Math.abs(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(face)) ** 2 - Math.abs(cn(1) ** 2 * cl(1) ** 2 / (sn(1) ** 2 * (sm(1) ** 2 - cl(1) ** 2)))) < eps) {
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

        e.forEach((edge) => {

            var nearestPoints = [];
            var j = 0;

            for (var i = 0; i < v.length; i++) {

                if (j === 2) {

                    break;

                }

                //console.log(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(edge)) ** 2)
                //console.log((cn(1) ** 2 * cl(1) ** 2 / (sn(1) ** 2 * (sm(1) ** 2 - cl(1) ** 2))))

                if (Math.abs(HF.hyperboloidInnerProduct(fmat(v[i]), fmat(edge)) ** 2 - Math.abs(cn(1) ** 2 * cl(1) ** 2 / (sn(1) ** 2 * sm(1) ** 2))) < eps) {
                    nearestPoints.push(i)
                    j++;
                }
            }
            edgeData.push(nearestPoints);
        })

        return edgeData;

    }

    const [f, fNames] = makeFaces();
    //console.log(f, fNames)

    const v = makeVertices();
    //console.log(v)

    const e = makeEdges();

    console.log(e)

    const faceData = generateFaceData();
    //console.log(faceData)

    const edgeData = generateEdgeData();
    console.log(edgeData)

    return {

        vertices: v,

        edges: e,

        faces: [0, 1, 2, 3, 4, 5, 6],

        numVertices: n,

        numEdges: n,

        numFaces: fNames.length,

        numSides: n,

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

        // outerReflection: "c",

        // center: [1, 1, 0, 0],

        // face: () => {

        //     if (n == 6) {

        //         return [1, 0, 0, 0];

        //     } else {

        //         var c = Math.cos(Math.PI / n) ** 2;
        //         return [Math.sqrt(Math.abs(1 - 4 * c / 3)), 0, 0, 0];

        //     }

        // },

        metric: () => {

            return "hyperbolic";

        },

        compact: () => {

            if ((l - 2) * (m - 2) < 4) {

                return "compact";

            } else if ((l - 2) * (m - 2) === 4) {

                return "paracompact";

            } else {

                return "uncompact";

            }

        },

        cellType: "hyperbolic",

        flip: (v) => {

            return [v[0], v[2], v[3], v[1]];

        },

    }

}

export { testData };
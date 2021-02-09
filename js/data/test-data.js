// {n, , }

//const l = 3;
const m = 7;
const n = 7;

const cn = (i) => Math.cos(Math.PI * i / n);
const sn = (i) => Math.sin(Math.PI * i / n);

function makeVertices() {

    var verts = [];

    for (var i = 0; i < n; i++) {

        verts.push([1, 0, cn(2 * i + 1), sn(2 * i + 1)]);

    }

    return verts;

}

function makeEdges() {

    var edges = [];

    for (var i = 0; i < n; i++) {

        edges.push([i, (i + 1) % n]);

    }

    return edges;

}

function makeFaces() {

    var faces = [];

    for (var i = 0; i < n; i++) {

        faces.push(i);

    }

    return [faces];

}

const testData = (l) => {

    const cm = (i) => Math.cos(Math.PI * i / m);
    const sm = (i) => Math.sin(Math.PI * i / m);

    const cl = (i) => Math.cos(Math.PI * i / l);
    const sl = (i) => Math.sin(Math.PI * i / l);

    return {

        vertices: makeVertices(n),

        edges: makeEdges(n),

        faces: makeFaces(n),

        numVertices: n,

        numEdges: n,

        numFaces: 1,

        numSides: n,

        // cfe
        a: (v) => {

            return [v[0], v[1], v[2], -v[3]];

        },

        //cfv
        b: (v) => {

            const c = cn(2);
            const s = sn(2);

            return [v[0], v[1], c * v[2] + s * v[3], s * v[2] - c * v[3]];

        },

        //cev
        c: (v) => {

            const clc = cl(1);
            const smc = sm(1);
            const snc = sn(1);
            const cnc = cn(1);
            const cmc = cm(1);

            const r = smc ** 2 * snc ** 2 - clc ** 2;
            // return v;
            return [
                (1 - 2 * r / (snc ** 2)) * v[0] + (2 * r * cmc / (snc * cnc * clc)) * v[1] + (2 * r / (cnc * (snc ** 2))) * v[2],
                (2 * cnc * clc * cmc / snc) * v[0] + (1 - 2 * (cmc ** 2)) * v[1] - (2 * cmc * clc / snc) * v[2],
                (2 * cnc * (clc) ** 2 / (snc ** 2)) * v[0] - (2 * cmc * clc / snc) * v[1] + (1 - 2 * (clc ** 2) / (snc ** 2)) * v[2],
                v[3]
            ];

        },

        // fev
        d: (v) => {

            return [v[0], -v[1], v[2], v[3]];

        },

        e: (v) => {

            return v;

        },

        f: (v) => {

            const den = sn(1) * Math.sqrt(Math.abs(sm(1) ** 2 - cl(1) ** 2));

            return [
                cn(1) * cl(1) * v[0] / den,
                Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[1] / den,
                Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[2] / den,
                Math.sqrt(Math.abs(sn(1) ** 2 * sm(1) ** 2 - cl(1) ** 2)) * v[3] / den
            ];

        },

        faceReflections: [
            ""
        ],

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

            } else if ((l - 2) * (m - 2) == 4) {

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
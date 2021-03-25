import * as THREE from "../three-bits/three.module.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as RF from "../maths-functions/rotation-functions.js";

const eps = 1e-4;

function generateData(data, thetax, thetay, thetaz, number, intersection, invisibleLines, camera) {

    const vertices = generateVertices(data, thetax, thetay, thetaz);
    const spheres = generateSpheres(data, vertices);
    var uhpVertices = makeTheLines(data, number, vertices, spheres, intersection);

    if (intersection) {

        uhpVertices = uhpVertices.concat(outline(data, 2 * number, camera, spheres, vertices));

    }

    return cameraLines(data, uhpVertices, invisibleLines, camera, spheres, vertices);

}

// generate the positions of the vertices in several models
function generateVertices(data, thetax, thetay, thetaz) {

    var verts = [];

    if (data.cellType === "euclidean") {

        for (var i = 0; i < data.numVertices; i++) {

            const p = data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz));

            verts.push({
                "hyperboloid": p,
                "poincare": HF.hyperboloidToPoincare(p),
                "klein": HF.hyperboloidToKlein(p),
                "uhp": HF.hyperboloidToUpperHalfPlane(p)
            });

        }

    } else if (data.cellType === "hyperbolic") {

        for (var i = 0; i < data.numVertices; i++) {

            const p = data.flip(RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz));

            verts.push({
                "hyperboloid": p,
                "poincare": HF.hyperboloidToPoincare(p),
                "klein": HF.hyperboloidToKlein(p),
                "uhp": HF.hyperboloidToUpperHalfPlane(p)
            });

        }

    } else {

        for (var i = 0; i < data.numVertices; i++) {

            const p = RF.rxyz(data.f(data.vertices[i]), thetax, thetay, thetaz);

            verts.push({
                "hyperboloid": p,
                "poincare": HF.hyperboloidToPoincare(p),
                "klein": HF.hyperboloidToKlein(p),
                "uhp": HF.hyperboloidToUpperHalfPlane(p)
            });

        }

    }

    return verts;

}

// generate the spheres that bound the geometry (only for UHP)
function generateSpheres(data, vertices) {

    var spheres = [];

    for (var i = 0; i < data.numFaces; i++) {

        var v1, v2, v3;

        if (data.metric === "u") {

            var u1, u2, u3;

            u1 = vertices[data.faces[i][0]]["klein"];
            u2 = vertices[data.faces[i][1]]["klein"];
            u3 = vertices[data.faces[i][2]]["klein"];

            v1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u1, u2));
            v2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u2, u1));
            v3 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u2, u3));

        } else {

            v1 = vertices[data.faces[i][0]]["uhp"];
            v2 = vertices[data.faces[i][1]]["uhp"];
            v3 = vertices[data.faces[i][2]]["uhp"];

        }

        var center = HF.uhpCenter(v1, v2, v3);

        var sphereDict = {
            "hyperboloid": {},
            "poincare": {},
            "uhp": {
                center: center,
                radius: VF.distance(v1, center)
            },
        };
        spheres.push(sphereDict);

    }

    return spheres;

}

// find the coordinates of the lines
function makeTheLines(data, number, vertices, spheres, intersection) {

    var lineCoords = [];

    if (intersection) {

        data.edges.forEach((endpoints) => {

            var uhpVertices = [], e1, e2;

            if (data.metric === "u") {

                e1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(vertices[endpoints[0]]["klein"], vertices[endpoints[1]]["klein"]));
                e2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(vertices[endpoints[1]]["klein"], vertices[endpoints[0]]["klein"]));

            } else {

                [e1, e2] = HF.geodesicEndpoints(vertices[endpoints[0]]["hyperboloid"], vertices[endpoints[1]]["hyperboloid"]);
                e1 = HF.hyperboloidToUpperHalfPlane(e1);
                e2 = HF.hyperboloidToUpperHalfPlane(e2);

            }

            const p1 = vertices[endpoints[0]]["uhp"], p2 = vertices[endpoints[1]]["uhp"];

            const radVect = VF.vectorScale(VF.vectorDiff(e2, e1), 0.5);
            const center = VF.midpoint(e1, e2);
            const r = VF.norm(radVect);

            var startAngle, endAngle;

            if (data.metric === "h") {

                startAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p1, center), radVect) / (r ** 2));
                endAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p2, center), radVect) / (r ** 2));

            } else {

                startAngle = 0;
                endAngle = Math.PI;

            }

            const numPieces = Math.ceil(Math.max(Math.min(100 * r, number), 10) * (endAngle - startAngle) / Math.PI);
            const subAngle = (endAngle - startAngle) / numPieces;

            for (var i = 0; i <= numPieces; i++) {

                const theta = startAngle + i * subAngle;

                uhpVertices.push([
                    radVect[0] * Math.cos(theta) + center[0],
                    radVect[1] * Math.cos(theta) + center[1],
                    r * Math.sin(theta)
                ])

            }

            lineCoords.push(uhpVertices);

        });

    }

    // kinda works??
    if (data.metric === "u") {

        for (var j = 0; j < data.numFaces; j++) {

            const face = data.faces[j];

            for (var i = 0; i < data.numSides; i++) {

                var uhpVertices = [];

                var u = vertices[face[i]]["klein"], v = vertices[face[(i + 1) % data.numSides]]["klein"], w = vertices[face[(i + 2) % data.numSides]]["klein"];
                var p1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u, v));
                var p2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(w, v))

                var center = spheres[j]["uhp"].center;
                var r = spheres[j]["uhp"].radius;

                var theta1 = Math.acos(Math.max(-1, Math.min(1, (p1[0] - center[0]) / r))) * ((p1[1] - center[1] > 0) ? 1 : -1);
                var theta2 = Math.acos(Math.max(-1, Math.min(1, (p2[0] - center[0]) / r))) * ((p2[1] - center[1] > 0) ? 1 : -1);

                var startAngle = Math.min(theta1, theta2);
                var endAngle = Math.max(theta1, theta2);

                if (endAngle - startAngle > Math.PI) {

                    startAngle += 2 * Math.PI;
                    [startAngle, endAngle] = [endAngle, startAngle];

                }

                const numPieces = Math.ceil(Math.max(Math.abs(Math.min(100 * r, number), 10) * (endAngle - startAngle) / Math.PI));
                const subAngle = (endAngle - startAngle) / numPieces;

                for (var k = 0; k <= numPieces; k++) {

                    const theta = startAngle + k * subAngle;

                    uhpVertices.push([
                        r * Math.cos(theta) + center[0],
                        r * Math.sin(theta) + center[1],
                        0
                    ])

                }

                lineCoords.push(uhpVertices);

            }

        }

    }

    return lineCoords;

}

function outline(data, number, camera, spheres, vertices) {

    var lineCoords = [];
    const camPos = camera;

    var cos = [];
    var sin = [];

    for (var k = 0; k <= number; k++) {

        const theta = Math.PI * k / number;
        cos.push(Math.cos(theta));
        sin.push(Math.sin(theta));

    }

    for (var i = 0; i < data.numFaces; i++) {

        const center = spheres[i]["uhp"].center;
        const r = spheres[i]["uhp"].radius;

        const diff = VF.vectorDiff(center, camPos);
        const cs = VF.norm(diff);

        const h = r * Math.sqrt(cs ** 2 - r ** 2) / cs;
        const t = Math.sqrt(r ** 2 - h ** 2) / cs;
        const interp = VF.vectorSum(VF.vectorScale(center, 1 - t), VF.vectorScale(camPos, t));
        
        var perp = [1, 0, 0];

        if (Math.abs(diff[0]) > eps || Math.abs(diff[1]) > eps) {

            perp = [-diff[1] * h / VF.norm([diff[0], diff[1]]), diff[0] * h / VF.norm([diff[0], diff[1]]), 0];

        }

        var v = VF.vectorCross(perp, VF.vectorScale(diff, 1 / cs));

        if (v[2] < 0) {

            v = VF.vectorScale(v, -1);

        }

        var curve = [];

        for (var k = 0; k <= number; k++) {

            curve.push(VF.vectorSum(
                VF.vectorSum(VF.vectorScale(perp, cos[k]), VF.vectorScale(v, sin[k])),
                interp
            ));

        }

        var polygon = [];

        data.faces[i].forEach((j) => {
            polygon.push(vertices[j]["klein"]);
        });

        var drawVerts = [];

        curve.forEach((vert) => {

            drawVerts.push([vert, (pointInPolygon(HF.upperHalfPlaneToKlein(vert), polygon) && vert[2] >= 0)]);

        });

        var segments = [[drawVerts[0]]];
        var segmentsPoints = [[drawVerts[0][0]]];
        var segNum = 0;

        for (var k = 1; k < curve.length; k++) {

            if (drawVerts[k][1] === segments[segNum][segments[segNum].length - 1][1]) {

                segments[segNum].push(drawVerts[k]);
                segmentsPoints[segNum].push(drawVerts[k][0]);

            } else {

                segNum++;
                segments.push([drawVerts[k]]);
                segmentsPoints.push([drawVerts[k][0]]);

            }

        }

        for (var k = 0; k < segments.length; k++) {

            if ((segments[k].length > 1) && (segments[k][0][1])) {

                lineCoords.push(segmentsPoints[k], 0x000000);

            }

        }

    }

    return lineCoords;

}

function cameraLines(data, uhpVertices, invisibleLines, camera, spheres, vertices) {

    const camPos = camera;

    var lineGroup = new THREE.Group();

    uhpVertices.forEach((points) => {

        if (points.length > 0) {

            var drawVerts = [];

            for (var k = 0; k < points.length; k++) {

                drawVerts.push([points[k], visibilityTest(points[k], camPos, spheres, vertices, data)]);

            }

            var segments = [[drawVerts[0]]];
            var segmentsPoints = [[drawVerts[0][0]]];
            var segNum = 0;

            for (var k = 1; k < points.length; k++) {

                if (drawVerts[k][1] === segments[segNum][segments[segNum].length - 1][1]) {

                    segments[segNum].push(drawVerts[k]);
                    segmentsPoints[segNum].push(drawVerts[k][0]);

                } else {

                    segNum++;
                    segments.push([drawVerts[k]]);
                    segmentsPoints.push([drawVerts[k][0]]);

                }

            }

            for (var k = 0; k < segments.length; k++) {

                if ((segments[k].length > 1) && (segments[k][0][1])) {

                    lineGroup.add(drawLine(segmentsPoints[k], 0x333333, 2));

                } else {

                    if (invisibleLines) {

                        lineGroup.add(drawLine(segmentsPoints[k], 0xBBBBBB, 1));

                    }

                }

            }

        }

    });

    return lineGroup;

}

// ONLY WORKS FOR UHP
function visibilityTest(point, camera, spheres, vertices, data) {

    const c = camera;
    const p = point;
    const cp = VF.vectorDiff(c, p);

    for (var ii = 0; ii < data.numFaces; ii++) {

        const s = spheres[ii]["uhp"].center;
        const sr = spheres[ii]["uhp"].radius;
        const cs = VF.vectorDiff(c, s);

        const A = VF.vectorDot(cp, cp);
        const B = -2 * VF.vectorDot(cp, cs);
        const C = VF.vectorDot(cs, cs) - sr ** 2;

        var delta = B ** 2 - 4 * A * C;

        if ((delta <= 0) || isNaN(delta)) {

            continue;

        } else {

            var t1 = (-B + Math.sqrt(delta)) / (2 * A);
            var t2 = (-B - Math.sqrt(delta)) / (2 * A);

            var polygon = [];

            data.faces[ii].forEach((j) => {
                polygon.push(vertices[j]["klein"]);
            });

            if ((t1 > eps) && (t1 < 1 - eps)) {

                var x1 = VF.vectorSum(c, VF.vectorScale(cp, -t1));
                var v1 = HF.upperHalfPlaneToKlein(x1);

                if (pointInPolygon(v1, polygon) && (x1[2] >= 0)) {

                    return false;

                }

            }

            if ((t2 > eps) && (t2 < 1 - eps)) {

                var x2 = VF.vectorSum(c, VF.vectorScale(cp, -t2));
                var v2 = HF.upperHalfPlaneToKlein(x2);

                if (pointInPolygon(v2, polygon) && (x2[2] >= 0)) {

                    return false;

                }

            }

        }

    }

    return true;

}

function pointInPolygon(point, vertices) {

    for (var i = 1; i < vertices.length - 1; i++) {

        const v0 = VF.vectorDiff(vertices[i], vertices[0]);
        const v1 = VF.vectorDiff(vertices[i + 1], vertices[0]);
        const v2 = VF.vectorDiff(point, vertices[0]);

        const dot00 = VF.vectorDot(v0, v0);
        const dot01 = VF.vectorDot(v0, v1);
        const dot02 = VF.vectorDot(v0, v2);
        const dot11 = VF.vectorDot(v1, v1);
        const dot12 = VF.vectorDot(v1, v2);

        const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        const a = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const b = (dot00 * dot12 - dot01 * dot02) * invDenom;
        const c = 1 - a - b;

        if ((a >= 0) && (b >= 0) && (c >= 0)) {

            return true;

        }

    }

    return false;

}

function drawLine(vectors, col, width) {

    var threeVectors = [];

    vectors.forEach((vect) => {
        threeVectors.push(new THREE.Vector3().fromArray(vect));
    });

    var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col, linewidth: width }));

    return line;

}

export { generateData };
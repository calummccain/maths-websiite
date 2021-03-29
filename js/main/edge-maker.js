import * as THREE from "../three-bits/three.module.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as SF from "../maths-functions/spherical-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as RF from "../maths-functions/rotation-functions.js";

const eps = 1e-4;

// Works 
// but
// needs tidying

function generateData(data, thetax, thetay, thetaz, number, intersection, invisibleLines, camera, cells) {

    var spheres = [];
    var vertices = [];
    var drawableVertices = [];

    var lineGroup = new THREE.Group();

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        for (var i = 0; i < cells.length; i++) {

            const localVertices = generateVertices(data, thetax, thetay, thetaz, cells[i]);
            const localSpheres = generateSpheres(data, localVertices);

            vertices = vertices.concat(localVertices);
            spheres = spheres.concat(localSpheres);

            drawableVertices = drawableVertices.concat(makeTheLines(data, number, localVertices, localSpheres, intersection));

            if (intersection) {

                drawableVertices = drawableVertices.concat(outline(data, 2 * number, camera, localSpheres, localVertices));

            }

        }

    } else if (data.metric === "s") {

        for (var i = 0; i < cells.length; i++) {

            const localVertices = generateVertices(data, thetax, thetay, thetaz, cells[i]);
            const localSpheres = generateSpheres(data, localVertices);

            vertices = vertices.concat(localVertices);
            spheres = spheres.concat(localSpheres);

            drawableVertices = drawableVertices.concat(makeTheLines(data, number, localVertices, localSpheres, intersection));

            // drawableVertices = drawableVertices.concat(outline(data, 2 * number, camera, localSpheres, localVertices));

        }

    }

    lineGroup = cameraLines(data, drawableVertices, invisibleLines, camera, spheres, vertices);

    return lineGroup;

}

// generate the positions of the vertices in several models
function generateVertices(data, thetax, thetay, thetaz, cell) {

    // matrix dictionary
    function matrixDict(letter, vector) {

        if (letter === "a") {

            return data.a(vector)

        } else if (letter === "b") {

            return data.b(vector)

        } else if (letter === "c") {

            return data.c(vector)

        } else if (letter === "d") {

            return data.d(vector)

        } else if (letter === "e") {

            return data.e(vector)

        } else if (letter === "f") {

            return data.f(vector)

        } else {

            throw 'letter needs to be one of a, b, c, d, e, f!';

        }

    }

    // Transform the 'central' cell's vertices to the transformed cell's vertices
    var newVertices = VF.transformVertices(data.vertices, cell, matrixDict);

    var verts = [];

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        if (data.cellType === "euclidean") {

            for (var i = 0; i < data.numVertices; i++) {

                const p = data.flip(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz));

                verts.push({
                    "hyperboloid": p,
                    "poincare": HF.hyperboloidToPoincare(p),
                    "klein": HF.hyperboloidToKlein(p),
                    "uhp": HF.hyperboloidToUpperHalfPlane(p)
                });

            }

        } else if (data.cellType === "hyperbolic") {

            for (var i = 0; i < data.numVertices; i++) {

                const p = data.flip(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz));

                verts.push({
                    "hyperboloid": p,
                    "poincare": HF.hyperboloidToPoincare(p),
                    "klein": HF.hyperboloidToKlein(p),
                    "uhp": HF.hyperboloidToUpperHalfPlane(p)
                });

            }

        } else {

            for (var i = 0; i < data.numVertices; i++) {

                const p = RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz);

                verts.push({
                    "hyperboloid": p,
                    "poincare": HF.hyperboloidToPoincare(p),
                    "klein": HF.hyperboloidToKlein(p),
                    "uhp": HF.hyperboloidToUpperHalfPlane(p)
                });

            }

        }

    } else if (data.metric === "s") {

        for (var i = 0; i < data.numVertices; i++) {

            const p = data.f(newVertices[i]);

            verts.push({
                "hypersphere": p,
                "stereo": SF.sphereToPoincare(p, 1)
            });

        }

    }

    return verts;

}

// generate the spheres that bound the geometry (only for UHP)
function generateSpheres(data, vertices) {

    var spheres = [];

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

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
                }
            };

            spheres.push(sphereDict);

        }

    } else if (data.metric === "s") {

        for (var i = 0; i < data.numFaces; i++) {

            var u1, u2, u3, triCenter;

            u1 = vertices[data.faces[i][0]]["hypersphere"];
            u2 = vertices[data.faces[i][1]]["hypersphere"];
            u3 = vertices[data.faces[i][2]]["hypersphere"];

            triCenter = VF.vectorSum(u1, VF.vectorSum(u2, u3));
            triCenter = VF.vectorScale(triCenter, 1 / VF.norm(triCenter));

            var v1, v2, v3, triCenterStereo;

            v1 = vertices[data.faces[i][0]]["stereo"];
            v2 = vertices[data.faces[i][1]]["stereo"];
            v3 = vertices[data.faces[i][2]]["stereo"];

            triCenterStereo = SF.sphereToPoincare(triCenter, 1);

            const [center, radius] = VF.circum4(v1, v2, v3, triCenterStereo);

            const normalVector = VF.vectorCross(VF.vectorDiff(v1, v2), VF.vectorDiff(v3, v2));

            var sphereDict = {
                "stereo": {
                    center: center,
                    radius: radius,
                    normal: normalVector,
                    mag: VF.norm(normalVector)
                }
            };

            spheres.push(sphereDict);

        }

    }

    return spheres;

}

// find the coordinates of the lines
function makeTheLines(data, number, vertices, spheres, intersection) {

    var lineCoords = [];

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

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

    } else if (data.metric === "s") {

        var ratios = [];
        const ca = VF.vectorDot(vertices[data.edges[0][0]]["hypersphere"], vertices[data.edges[0][1]]["hypersphere"]);
        const sa = Math.sqrt(1 - ca ** 2);
        const a = Math.acos(ca);
        const denom = 1 / sa;
        var theta = 0;

        for (var i = 0; i <= number; i++) {

            ratios.push(Math.sin(theta) * denom);
            theta += a / number;

        }

        data.edges.forEach((endpoints) => {
            var line = [];
            const start = vertices[endpoints[0]]["hypersphere"], end = vertices[endpoints[1]]["hypersphere"];

            for (var i = 0; i <= number; i++) {

                line.push(
                    SF.sphereToPoincare(
                        VF.vectorSum(
                            VF.vectorScale(start, ratios[i]),
                            VF.vectorScale(end, ratios[number - i])
                        ), 1
                    )
                );

            }

            lineCoords.push(line);

        })

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

    var center, r, diff, cs, h, t, interp;

    for (var i = 0; i < data.numFaces; i++) {

        center = spheres[i]["uhp"].center;
        r = spheres[i]["uhp"].radius;

        diff = VF.vectorDiff(center, camPos);
        cs = VF.norm(diff);

        h = r * Math.sqrt(cs ** 2 - r ** 2) / cs;
        t = Math.sqrt(r ** 2 - h ** 2) / cs;
        interp = VF.vectorSum(VF.vectorScale(center, 1 - t), VF.vectorScale(camPos, t));

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

    if (data.metric === "h" || data.metric === "p" || data.metric === "u") {

        var s, sr, cs, A, B, C, delta;

        for (var ii = 0; ii < spheres.length; ii++) {

            s = spheres[ii]["uhp"].center;
            sr = spheres[ii]["uhp"].radius;
            cs = VF.vectorDiff(c, s);

            A = VF.vectorDot(cp, cp);
            B = -2 * VF.vectorDot(cp, cs);
            C = VF.vectorDot(cs, cs) - sr ** 2;

            delta = B ** 2 - 4 * A * C;

            if ((delta <= 0) || isNaN(delta)) {

                continue;

            } else {

                var t1 = (-B + Math.sqrt(delta)) / (2 * A);
                var t2 = (-B - Math.sqrt(delta)) / (2 * A);

                var polygon = [];

                data.faces[ii % data.numFaces].forEach((j) => {
                    polygon.push(vertices[j + (ii - (ii % data.numFaces)) * data.numVertices / data.numFaces]["klein"]);
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

    } else if (data.metric === "s") {

        for (var ii = 0; ii < spheres.length; ii++) {

            const s = spheres[ii]["stereo"].center;
            const sr = spheres[ii]["stereo"].radius;
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

                data.faces[ii % data.numFaces].forEach((j) => {
                    polygon.push(vertices[j + (ii - (ii % data.numFaces)) * data.numVertices / data.numFaces]["stereo"]);
                });

                if ((t1 > eps) && (t1 < 1 - eps)) {

                    var x1 = VF.vectorSum(c, VF.vectorScale(cp, -t1));

                    console.log(x1, c, polygon, spheres[ii]["stereo"].normal, spheres[ii]["stereo"].center);
                    if (pointInSphericalPolygon(x1, polygon, spheres[ii]["stereo"].normal, s)) {

                        return false;

                    }

                }

                if ((t2 > eps) && (t2 < 1 - eps)) {

                    var x2 = VF.vectorSum(c, VF.vectorScale(cp, -t2));

                    console.log(x2, c, polygon, spheres[ii]["stereo"].normal, spheres[ii]["stereo"].center);
                    if (pointInSphericalPolygon(x2, polygon, spheres[ii]["stereo"].normal, s)) {

                        return false;

                    }

                }

            }

        }

    }

    return true;

}

function pointInPolygon(point, vertices) {

    var v0, v1, v2, dot00, dot01, dot02, dot11, dot12, invDenom, a, b, c;

    for (var i = 1; i < vertices.length - 1; i++) {

        v0 = VF.vectorDiff(vertices[i], vertices[0]);
        v1 = VF.vectorDiff(vertices[i + 1], vertices[0]);
        v2 = VF.vectorDiff(point, vertices[0]);

        dot00 = VF.vectorDot(v0, v0);
        dot01 = VF.vectorDot(v0, v1);
        dot02 = VF.vectorDot(v0, v2);
        dot11 = VF.vectorDot(v1, v1);
        dot12 = VF.vectorDot(v1, v2);

        invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        a = (dot11 * dot02 - dot01 * dot12) * invDenom;
        b = (dot00 * dot12 - dot01 * dot02) * invDenom;
        c = 1 - a - b;

        if ((a >= 0) && (b >= 0) && (c >= 0)) {

            return true;

        }

    }

    return false;

}

// https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/ray-triangle-intersection-geometric-solution
function pointInSphericalPolygon(point, polygon, normal, center) {

    const ray = VF.vectorDiff(point, center);
    const normalDotRay = VF.vectorDot(ray, normal);

    if (Math.abs(normalDotRay) < eps) {

        // parallel
        return false

    }

    const d = VF.vectorDot(normal, polygon[0]);
    const t = (VF.vectorDot(normal, center) + d) / normalDotRay;

    if (t < 0) {

        return false;

    }

    const intersection = VF.vectorSum(center, VF.vectorScale(ray, t));

    return pointInPolygon(intersection, polygon)

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
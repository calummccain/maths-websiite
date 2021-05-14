// ========================================================
// Generates the edge and outline data for a hyperbolic
// cell
//
// Inputs: data
//         parameters
// Output: a three.js group of lines
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

import * as THREE from "../three-bits/three.module.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as RF from "../maths-functions/rotation-functions.js";
import { matrixDict } from "../maths-functions/generate-tesselations.js";

const eps = 1e-5;

function hyperbolicEdges(data, parameters) {

    // Parameter checks
    const cells = parameters.cells || [""];
    const [thetax, thetay, thetaz, thetau, thetav, thetaw] = parameters.angles || [0, 0, 0, 0, 0, 0];
    const number = parameters.number || 1;
    const camera = parameters.camera || [10, 0, 0];
    const width = parameters.width || 1;
    const invisibleLines = parameters.invisibleLines || false;

    const outlineRes = 4;

    // matrix dictionary
    const matrix = (letter, v) => matrixDict(letter, data.a, data.b, data.c, data.d, data.e, data.f, v);

    // calculate sin and cos vectors for efficiency
    var sin = [];
    var cos = [];
    var theta = 0;
    const change = 2 * Math.PI / (outlineRes * number);

    for (var k = 0; k <= outlineRes * number; k++) {

        cos.push(Math.cos(theta));
        sin.push(Math.sin(theta));

        theta += change;

    }

    // Variable definitions
    var localVertices;
    var vertices = [];
    var edges = [];
    var faces = [];

    // Step 1: Generate the vertex, edge and face data
    for (var i = 0; i < parameters.cells.length; i++) {

        localVertices = generateVertices(data, thetax, thetay, thetaz, thetau, thetav, thetaw, cells[i]);
        vertices = vertices.concat(localVertices);

        generateFaces(localVertices);

        edges = edges.concat(generateEdges(localVertices));

    }

    outline();

    var edgeGroup = visibleEdges()

    // generate the positions of the vertices in several models
    function generateVertices(cell) {

        var newVertices = VF.transformVertices(data.vertices, cell, matrix);
        var verts = [];
        var p;

        for (var i = 0; i < data.numVertices; i++) {

            if (data.cellType === "euclidean") {

                for (var i = 0; i < data.numVertices; i++) {

                    p = data.flip(RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric));

                }

            } else if (data.cellType === "hyperbolic") {

                for (var i = 0; i < data.numVertices; i++) {

                    p = data.flip(RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric));

                }

            } else {

                for (var i = 0; i < data.numVertices; i++) {

                    p = RF.ruvw(RF.rxyz(data.f(newVertices[i]), thetax, thetay, thetaz), thetau, thetav, thetaw, data.metric);

                }

            }

            verts.push({
                hyperboloid: p,
                klein: HF.hyperboloidToKlein(p),
                uhp: HF.hyperboloidToUpperHalfPlane(p)
            });

        }

        return verts;

    }

    // generate the faces that bound the geometry
    function generateFaces(localVertices) {

        var polygonKlein, polygonHyperboloid, polygonUhp, centerHyperboloid, v1, v2, v3, centerModel, normal, d, sphereCenter, radius;

        for (var i = 0; i < data.numFaces; i++) {

            polygonKlein = [];
            polygonHyperboloid = [];
            // polygonUhp = [];

            for (var j = 0; j < data.faces[i].length; j++) {

                polygonKlein.push(localVertices[data.faces[i][j]].klein);
                polygonHyperboloid.push(localVertices[data.faces[i][j]].hyperboloid);
                // polygonUhp.push(localVertices[data.faces[i][j]].uhp);

            }

            centerHyperboloid = VF.vectorSum(polygon4Hyperboloid);
            centerHyperboloid = VF.vectorScale(centerHyperboloid, 1 / HF.hyperbolicNorm(centerHyperboloid));

            if (data.metric === "u") {

                v1 = VF.lineSphereIntersection(vertices[data.faces[i][0]].klein, vertices[data.faces[i][1]].klein);
                v2 = VF.lineSphereIntersection(vertices[data.faces[i][1]].klein, vertices[data.faces[i][0]].klein);
                v3 = VF.lineSphereIntersection(vertices[data.faces[i][1]].klein, vertices[data.faces[i][2]].klein);

            } else {

                v1 = vertices[data.faces[i][0]].klein;
                v2 = vertices[data.faces[i][1]].klein;
                v3 = vertices[data.faces[i][2]].klein;

            }

            normal = VF.vectorCross(VF.vectorDiff(v2, v1), VF.vectorDiff(v3, v1));
            d = F.determinant3([v1, v2, v3]);

            if (parameters.model === "uhp") {

                v1 = HF.kleinToUpperHalfPlane(v1);
                v2 = HF.kleinToUpperHalfPlane(v2);
                v3 = HF.kleinToUpperHalfPlane(v3);
                centerModel = HF.hyperboloidToUpperHalfPlane(centerHyperboloid);


            } else {

                v1 = HF.kleinToPoincare(v1);
                v2 = HF.kleinToPoincare(v2);
                v3 = HF.kleinToPoincare(v3);
                centerModel = HF.hyperboloidToPoincare(centerHyperboloid);

            }

            if (Math.abs(VF.determinant3([v1, v2, v3])) > eps) {

                [sphereCenter, radius] = VF.circum4(v1, v2, v3, center);

                faces.push({
                    type: "sphere",
                    radius: radius,
                    normal: normal,
                    sphereCenter: sphereCenter,
                    centerHyperboloid: centerHyperboloid,
                    centerModel: centerModel,
                    d: d,
                    polygonHyperboloid: polygonHyperboloid,
                    polygonKlein: polygonKlein
                });

            } else {

                faces.push({
                    type: "plane",
                    radius: 0,
                    normal: normal,
                    sphereCenter: [0, 0, 0],
                    centerHyperboloid: centerHyperboloid,
                    centerModel: centerModel,
                    d: 0,
                    polygonHyperboloid: polygonHyperboloid,
                    polygonKlein: polygonKlein
                });

            }

        }

    }

    // find the coordinates of the edges

    / / 
    / / USE HYPERBOLIC GEODESIC?
    / / 
    function generateEdges(localVertices) {

        var modelVertices, e1, e2, p1, p2, radVect, center, r, startAngle, endAngle, numPieces, subAngle, theta;

        var edgeCoords = [];

        data.edges.forEach((endpoints) => {

            modelVertices = [];

            if (data.metric === "u") {

                e1 = VF.lineSphereIntersection(localVertices[endpoints[0]].klein, localVertices[endpoints[1]].klein);
                e2 = VF.lineSphereIntersection(localVertices[endpoints[1]].klein, localVertices[endpoints[0]].klein);

            } else {

                [e1, e2] = HF.geodesicEndpoints(vertices[endpoints[0]].hyperboloid, vertices[endpoints[1]].hyperboloid);

            }

            if (parameters.model === "uhp") {

                e1 = HF.hyperboloidToUpperHalfPlane(e1);
                e2 = HF.hyperboloidToUpperHalfPlane(e2);

            } else {

                e1 = HF.hyperboloidToPoincare(e1);
                e2 = HF.hyperboloidToPoincare(e2);

            }

            p1 = localVertices[endpoints[0]]["uhp"];
            p2 = localVertices[endpoints[1]]["uhp"];

            radVect = VF.vectorScale(VF.vectorDiff(e2, e1), 0.5);
            center = VF.midpoint(e1, e2);
            r = VF.norm(radVect);


            if (data.metric === "h") {

                startAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p1, center), radVect) / (r * r));
                endAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p2, center), radVect) / (r * r));

            } else {

                startAngle = 0;
                endAngle = Math.PI;

            }

            numPieces = Math.ceil(Math.max(Math.min(100 * r, number), 10) * (endAngle - startAngle) / Math.PI);
            subAngle = (endAngle - startAngle) / numPieces;

            for (var i = 0; i <= numPieces; i++) {

                theta = startAngle + i * subAngle;

                modelVertices.push([
                    radVect[0] * Math.cos(theta) + center[0],
                    radVect[1] * Math.cos(theta) + center[1],
                    r * Math.sin(theta)
                ])

            }

            edgeCoords.push(modelVertices);

        });

        // kinda works??
        if (data.metric === "u") {

            var face, uhpVertices, u, v, w, p1, p2, center, r, theta1, theta2, startAngle, endAngle, numPieces, subAngle, theta;

            for (var j = 0; j < data.numFaces; j++) {

                face = data.faces[j];

                for (var i = 0; i < face.length; i++) {

                    uhpVertices = [];

                    u = vertices[face[i]]["klein"];
                    v = vertices[face[(i + 1) % face.length]]["klein"];
                    w = vertices[face[(i + 2) % face.length]]["klein"];
                    p1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u, v));
                    p2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(w, v))

                    center = spheres[j]["uhp"].center;
                    r = spheres[j]["uhp"].radius;

                    theta1 = Math.acos(Math.max(-1, Math.min(1, (p1[0] - center[0]) / r))) * ((p1[1] - center[1] > 0) ? 1 : -1);
                    theta2 = Math.acos(Math.max(-1, Math.min(1, (p2[0] - center[0]) / r))) * ((p2[1] - center[1] > 0) ? 1 : -1);

                    startAngle = Math.min(theta1, theta2);
                    endAngle = Math.max(theta1, theta2);

                    if (endAngle - startAngle > Math.PI) {

                        startAngle += 2 * Math.PI;
                        [startAngle, endAngle] = [endAngle, startAngle];

                    }

                    numPieces = Math.ceil(Math.max(Math.abs(Math.min(100 * r, number), 10) * (endAngle - startAngle) / Math.PI));
                    subAngle = (endAngle - startAngle) / numPieces;

                    for (var k = 0; k <= numPieces; k++) {

                        theta = startAngle + k * subAngle;

                        uhpVertices.push([
                            r * Math.cos(theta) + center[0],
                            r * Math.sin(theta) + center[1],
                            0
                        ])

                    }

                    edgeCoords.push(uhpVertices);

                }

            }

        }

        return edgeCoords;

    }

    function outline() {

        var center, r, diff, cs, h, t, interp, perp, v, outline, testCoord;

        for (var i = 0; i < data.numFaces; i++) {

            if (faces[i].type === "sphere") {

                center = faces[i].sphereCenter;
                r = faces[i].radius;

            } else {

                continue;

            }

            diff = VF.vectorDiff(center, camera);
            cs = VF.norm(diff);

            t = (r * r) / (cs * cs);
            h = r * Math.sqrt(1 - t);
            interp = VF.vectorSum([VF.vectorScale(center, 1 - t), VF.vectorScale(camera, t)]);

            perp = [1, 0, 0];

            if (Math.abs(diff[0]) > eps || Math.abs(diff[1]) > eps) {

                perp = [-diff[1] * h / VF.norm([diff[0], diff[1]]), diff[0] * h / VF.norm([diff[0], diff[1]]), 0];

            }

            v = VF.vectorCross(perp, VF.vectorScale(diff, 1 / cs));

            if (v[2] < 0) {

                v = VF.vectorScale(v, -1);

            }

            outline = [];

            for (var k = 0; k <= outlineRes * number; k++) {

                testCoord = VF.vectorSum([VF.vectorScale(perp, cos[k]), VF.vectorScale(v, sin[k]), interp]);

                if (inSphericalFace(testCoord, i)) {

                    outline.push(testCoord);

                } else {

                    edges.push(outline);
                    outline = [];

                }

                k++

            }

            edges.push(outline)

        }

    }

    function inSphericalFace(point, face) {

        if (VF.vectorDot(SF.stereoToHyper(point), faces[face].center4) > 0)

            var d = faces[face].d / VF.vectorDot(point, faces[face].normal);
        var flatPoint = VF.vectorScale(point, d);

        return pointInPolygon(flatPoint, faces[face].polygon3);

    }

    function pointInPolygon(point, polygon) {

        var v0, v1, v2, dot01, dot12, dot20, dot11, dot22;

        for (var i = 1; i < polygon.length - 1; i++) {

            v0 = VF.vectorDiff(polygon[0], point);
            v1 = VF.vectorDiff(polygon[i], point);
            v2 = VF.vectorDiff(polygon[i + 1], point);

            dot01 = VF.vectorDot(v0, v1);
            dot12 = VF.vectorDot(v1, v2);
            dot20 = VF.vectorDot(v2, v0);
            dot11 = VF.vectorDot(v1, v1);
            dot22 = VF.vectorDot(v2, v2);

            if ((dot12 * dot20 > dot22 * dot01) && (dot01 * dot12 > dot11 * dot20)) {

                return true;

            }

        }

        return false;

    }

    function visibleEdges() {

        var edgeGroup = new THREE.Group();

        var drawVerts, segments, segmentsPoints, segNum;

        edges.forEach((points) => {

            if (points.length > 0) {

                drawVerts = [];

                for (var k = 0; k < points.length; k++) {

                    drawVerts.push([points[k], visibilityTest(points[k])]);

                }

                segments = [[drawVerts[0]]];
                segmentsPoints = [[drawVerts[0][0]]];
                segNum = 0;

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

                        edgeGroup.add(drawLine(segmentsPoints[k], 0x333333, 2));

                    } else {

                        if (invisibleLines) {

                            edgeGroup.add(drawLine(segmentsPoints[k], 0xBBBBBB, 2));

                        }

                    }

                }

            }

        });

        return edgeGroup;

    }

    function visibilityTest(point) {

        const pc = VF.vectorDiff(point, camera);

        var cs, A, B, C, delta, t1, t2;

        for (var i = 0; i < data.numFaces; i++) {

            if (faces[i].type === "sphere") {

                cs = VF.vectorDiff(camera, faces[i].sphereCenter);

                A = VF.vectorDot(pc, pc);
                B = 2 * VF.vectorDot(pc, cs);
                C = VF.vectorDot(cs, cs) - faces[i].radius * faces[i].radius;

                delta = B * B - 4 * A * C;

                if ((delta <= 0) || isNaN(delta)) {

                    continue;

                } else {

                    t1 = (-B + Math.sqrt(delta)) / (2 * A);
                    t2 = -B / A - t1;

                    if (eps < t1 && t1 < 1 - eps) {

                        if (inSphericalFace(VF.vectorSum([camera, VF.vectorScale(pc, t1)]), i)) {

                            return false;

                        }

                    }

                    if (eps < t2 && t2 < 1 - eps) {

                        if (inSphericalFace(VF.vectorSum([camera, VF.vectorScale(pc, t2)]), i)) {

                            return false;

                        }

                    }

                }

            } else if (faces[i].type === "plane") {

                t1 = -VF.vectorDot(camera, faces[i].normal) / VF.vectorDot(pc, faces[i].normal);

                if (eps < t1 && t1 < 1 - eps) {

                    return false;

                }

            }

        }

        return true;

    }

    function drawLine(vectors, col) {

        var threeVectors = [];

        vectors.forEach((vect) => {
            threeVectors.push(new THREE.Vector3().fromArray(vect));
        });

        var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col, linewidth: width }));

        return line;

    }

    return edgeGroup;

}

export { sphericalEdges };
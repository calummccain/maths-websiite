import * as THREE from "../three.module.js";
import { OrbitControls } from "../orbit-controls.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

const eps = 1e-3;
const sphere = false;

let WIDTH, HEIGHT, view;
let scene, spheres, vertices, uhpVertices, lineGroup, cameraConstants;

// generate the spheres that bound the geometry (only for UHP)
function generateSpheres(data) {

    var spheres = [];

    for (var i = 0; i < data.numFaces; i++) {

        var center = HF.uhpCenter(
            HF.hyperboloidToUpperHalfPlane(data.f(data.vertices[data.faces[i][0]])),
            HF.hyperboloidToUpperHalfPlane(data.f(data.vertices[data.faces[i][1]])),
            HF.hyperboloidToUpperHalfPlane(data.f(data.vertices[data.faces[i][2]]))
        );

        var sphereDict = {
            "hyperboloid": {
                //center: DATA.planeCenters[i]
            },
            "poincare": {
                //center: HF.hyperboloidToPoincareMod(DATA.planeCenters[i]),
                //radius: VF.norm(VF.vectorDiff(HF.hyperboloidToPoincareMod(f(DATA.vertices[DATA.faces[i][0]])), HF.hyperboloidToPoincareMod(DATA.planeCenters[i])))
            },
            "uhp": {
                center: center,
                radius: VF.distance(HF.hyperboloidToUpperHalfPlane(data.f(data.vertices[data.faces[i][0]])), center)
            },
        };
        spheres.push(sphereDict);

    }

    return spheres;

}

// generate the positions of the vertices in several models
function generateVertices(data) {

    var verts = [];

    for (var i = 0; i < data.numVertices; i++) {

        var vertDict = {
            "hyperboloid": data.f(data.vertices[i]),
            "poincare": HF.hyperboloidToPoincare(data.f(data.vertices[i])),
            "klein": HF.hyperboloidToKlein(data.f(data.vertices[i])),
            "uhp": HF.hyperboloidToUpperHalfPlane(data.f(data.vertices[i]))
        };

        verts.push(vertDict);

    }

    return verts;

}

// find the coordinates of the lines
function makeTheLines(data, number) {

    var lineCoords = [];

    data.edges.forEach((endpoints) => {

        var uhpVertices = [];

        var [e1, e2] = HF.geodesicEndpoints(vertices[endpoints[0]]["hyperboloid"], vertices[endpoints[1]]["hyperboloid"]);
        e1 = HF.hyperboloidToUpperHalfPlane(e1);
        e2 = HF.hyperboloidToUpperHalfPlane(e2);

        const p1 = vertices[endpoints[0]]["uhp"], p2 = vertices[endpoints[1]]["uhp"];

        const radVect = VF.vectorScale(VF.vectorDiff(e2, e1), 0.5);
        const center = VF.midpoint(e1, e2);
        const r = VF.norm(radVect);

        var startAngle, endAngle;

        if (data.compact() === "compact") {

            startAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p1, center), radVect) / (r ** 2));
            endAngle = Math.acos(VF.vectorDot(VF.vectorDiff(p2, center), radVect) / (r ** 2));

        } else {

            startAngle = 0;
            endAngle = Math.PI;

        }

        const numPieces = Math.ceil(number * (endAngle - startAngle) / Math.PI);
        const subAngle = (endAngle - startAngle) / numPieces

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

    // CHANGE!!
    if (data.compact() === "zoinks") {

        data.faces.forEach((face) => {

            for (var i = 0; i < data.numSides; i++) {

                var uhpVertices = [];

                var u = vertices[face[i]]["klein"], v = vertices[face[(i + 1) % data.numSides]]["klein"], w = vertices[face[(i + 2) % data.numSides]]["klein"];
                var p1 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(u, v));
                var p2 = HF.kleinToUpperHalfPlane(VF.lineSphereIntersection(w, v))

                var radVect = VF.vectorDiff(p2, p1);
                var center = VF.midpoint(p1, p2);
                var r = VF.norm(radVect) / 2;

                for (var j = 0; j <= number; j++) {

                    var theta = j * Math.PI / number - Math.PI / 2;

                    uhpVertices.push([
                        radVect[0] * Math.cos(theta) / 2 + center[0],
                        radVect[1] * Math.sin(theta) / 2 + center[1],
                        0
                    ])

                }

                lineCoords.push(uhpVertices);

            }

        })

    }

    return lineCoords;

}

function drawLine(vectors, col) {

    var threeVectors = [];
    vectors.forEach((vect) => {
        threeVectors.push(new THREE.Vector3().fromArray(vect));
    });
    var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col }));
    lineGroup.add(line);

}

function cameraLines(data) {

    lineGroup.children = [];

    var camPos = cameraConstants.camera.position.toArray();

    uhpVertices.forEach((points) => {

        for (var k = 0; k < points.length - 1; k++) {

            var e1 = points[k];
            var e2 = points[k + 1];

            if (visibilityTest(e1, camPos, spheres, vertices, "uhp", data) && visibilityTest(e2, camPos, spheres, vertices, "uhp", data)) {

                drawLine([e1, e2], 0x000000);

            } else {

                drawLine([e1, e2], 0xAAAAAA);

            }

        }

    });

}

function pointInPolygon(point, vertices) {

    for (var i = 1; i <= vertices.length - 2; i++) {

        var v = point, v0 = vertices[0], v1 = VF.vectorDiff(vertices[i], vertices[0]), v2 = VF.vectorDiff(vertices[i + 1], vertices[0]);
        var a = (VF.determinant2([v, v2]) - VF.determinant2([v0, v2])) / VF.determinant2([v1, v2]);
        var b = - (VF.determinant2([v, v1]) - VF.determinant2([v0, v1])) / VF.determinant2([v1, v2])

        if ((a > eps) && (b > eps) && (a + b < 1 - eps)) {

            return true;

        }

    }

    return false;

}

// ONLY WORKS FOR UHP
function visibilityTest(point, camera, spheres, vertices, model, data) {

    var o = camera;
    var u = VF.vectorDiff(point, camera);
    var uu = VF.norm(u) ** 2;

    for (var i = 0; i < data.numFaces; i++) {

        var oc = VF.vectorDiff(o, spheres[i][model].center);
        var uoc = VF.vectorDot(u, oc);
        var delta = (uoc ** 2) - uu * ((VF.norm(oc) ** 2) - (spheres[i][model].radius ** 2));

        if ((delta <= eps) || isNaN(delta)) {

            continue;

        } else {

            var t1 = (-uoc + Math.sqrt(delta)) / uu;
            var t2 = (-uoc - Math.sqrt(delta)) / uu;

            var polygon = [];
            data.faces[i].forEach((j) => {
                polygon.push([vertices[j]["uhp"][0], vertices[j]["uhp"][1]])
            });

            if ((t1 > eps) && (t1 < 1 - eps)) {

                var x1 = VF.vectorSum(o, VF.vectorScale(u, t1));
                var v1 = [x1[0], x1[1]];
                // drawLine(camera, x1, 0xFF0000);

                if (pointInPolygon(v1, polygon) && (x1[2] > 0)) {

                    return false;

                }

            }

            if ((t2 > eps) && (t2 < 1 - eps)) {

                var x2 = VF.vectorSum(o, VF.vectorScale(u, t2));
                var v2 = [x2[0], x2[1]];
                // drawLine(camera, x2, 0x00FF00);

                if (pointInPolygon(v2, polygon) && (x2[2] > 0)) {

                    return false;

                }

            }

        }

    }

    return true;

}

function main(data) {

    view = document.getElementById("view2");
    WIDTH = view.clientWidth, HEIGHT = view.clientHeight;

    // setup scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xEEEEEE);

    spheres = generateSpheres(data);
    vertices = generateVertices(data);
    uhpVertices = makeTheLines(data, 50);

    lineGroup = new THREE.Group();

    cameraConstants = {
        left: 0,
        bottom: 0,
        width: 1,
        height: 1.0,
        background: 0xDDDDDD,
        eye: [5, 0, 0],
        up: [0, 0, 1],
        fov: 30,
        updateCamera: function (camera, scene) {

            camera.lookAt(scene.position);

        }
    };

    const camera = new THREE.PerspectiveCamera(cameraConstants.fov, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.fromArray(cameraConstants.eye);
    camera.up.fromArray(cameraConstants.up);
    camera.lookAt(scene.position);
    cameraConstants.camera = camera;

    if (sphere) {

        var material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.2
        });

        spheres.forEach((sphere) => {
            var mesh = new THREE.Mesh(new THREE.SphereBufferGeometry(sphere["uhp"].radius, 20, 20), material);
            mesh.material.color = new THREE.Color(Math.random(), Math.random(), Math.random());
            mesh.position.fromArray(sphere["uhp"].center);
            scene.add(mesh);
        })

    }

    // setup the renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    // add controls to the camera
    var controls = new OrbitControls(cameraConstants.camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enabled = true;
    controls.minZoom = 1;
    controls.maxZoom = 5;
    controls.update();

    scene.add(lineGroup);

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener('keydown', (event) => { if (event.key === "Enter") { cameraLines(data); } });

    onWindowResize();

    // add the renderer to the 'view' div
    view.appendChild(renderer.domElement);

    render();

    function render() {

        requestAnimationFrame(render);

        const camera = cameraConstants.camera;

        cameraConstants.updateCamera(camera, scene);

        const left = Math.floor(WIDTH * cameraConstants.left);
        const bottom = Math.floor(HEIGHT * cameraConstants.bottom);
        const width = Math.floor(WIDTH * cameraConstants.width);
        const height = Math.floor(HEIGHT * cameraConstants.height);

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);
        renderer.setScissorTest(true);
        renderer.setClearColor(view.background);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);

    }


    function onWindowResize() {

        WIDTH = view.clientWidth;
        HEIGHT = view.clientHeight;

        renderer.setSize(WIDTH, HEIGHT);

    }

}

export { main };
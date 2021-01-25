import * as THREE from "../three.module.js";
import { OrbitControls } from "../orbit-controls.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as DATA from "../data/53n.js";

const eps = 1e-3;
const n = 6;

function f(x) {
    return DATA.f(n, DATA.d(n, x));
}

var lineGroup = new THREE.Group();

function drawLine(vectors, col) {

    var threeVectors = [];
    vectors.forEach((vect) => {
        threeVectors.push(new THREE.Vector3().fromArray(vect));
    });
    var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col }));
    lineGroup.add(line);

}

function generateSpheres() {
    var spheres = [];
    for (var i = 0; i < 12; i++) {
        var center = HF.uhpCenter(
            HF.hyperboloidToUpperHalfPlane(f(DATA.vertices[DATA.faces[i][0]])),
            HF.hyperboloidToUpperHalfPlane(f(DATA.vertices[DATA.faces[i][1]])),
            HF.hyperboloidToUpperHalfPlane(f(DATA.vertices[DATA.faces[i][2]]))
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
                radius: VF.norm(VF.vectorDiff(HF.hyperboloidToUpperHalfPlane(f(DATA.vertices[DATA.faces[i][0]])), center))
            },
        };
        spheres.push(sphereDict);
    }
    return spheres;
}

function generateVertices() {
    var verts = [];
    for (var i = 0; i < 20; i++) {
        var vertDict = {
            "hyperboloid": f(DATA.vertices[i]),
            "poincare": HF.hyperboloidToPoincareMod(f(DATA.vertices[i])),
            "klein": HF.hyperboloidToKlein(f(DATA.vertices[i])),
            "uhp": HF.hyperboloidToUpperHalfPlane(f(DATA.vertices[i]))
        };
        verts.push(vertDict);
    }
    return verts;
}

function det(p1, p2) {
    return p1[0] * p2[1] - p1[1] * p2[0];
}

function pointInPolygon(point, vertices) {
    for (var i = 1; i <= vertices.length - 2; i++) {
        var v = point, v0 = vertices[0], v1 = VF.vectorDiff(vertices[i], vertices[0]), v2 = VF.vectorDiff(vertices[i + 1], vertices[0]);
        var a = (det(v, v2) - det(v0, v2)) / det(v1, v2);
        var b = - (det(v, v1) - det(v0, v1)) / det(v1, v2)
        if ((a > eps) && (b > eps) && (a + b < 1 - eps)) {
            return true;
        }
    }
    return false;
}

// ONLY WORKS FOR UHP
function visibilityTest(point, camera, spheres, vertices, model) {

    var o = camera;
    var u = VF.vectorDiff(point, camera);
    var uu = VF.norm(u) ** 2;

    for (var i = 0; i < 12; i++) {
        var oc = VF.vectorDiff(o, spheres[i][model].center);
        var uoc = VF.vectorDot(u, oc);
        var delta = (uoc ** 2) - uu * ((VF.norm(oc) ** 2) - (spheres[i][model].radius ** 2));
        if ((delta <= eps) || isNaN(delta)) {
            continue;
        } else {

            var t1 = (-uoc + Math.sqrt(delta)) / uu;
            var t2 = (-uoc - Math.sqrt(delta)) / uu;

            var polygon = [];
            DATA.faces[i].forEach((j) => {
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

function main() {

    var view = document.getElementById("view");

    var WIDTH = view.clientWidth;
    var HEIGHT = view.clientHeight;

    // setup scene
    var scene = new THREE.Scene();
    scene.add(lineGroup);
    const pos = [3, 1, 1];

    // add camera and light to scene

    var cameras = [
        {
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
        }
    ];

    for (let ii = 0; ii < cameras.length; ++ii) {

        const view = cameras[ii];
        const camera = new THREE.PerspectiveCamera(view.fov, window.innerWidth / window.innerHeight, 0.01, 100);
        camera.position.fromArray(view.eye);
        camera.up.fromArray(view.up);
        camera.lookAt(scene.position);
        view.camera = camera;

    }

    // setup the renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    // add controls to the camera
    var controls = new OrbitControls(cameras[0].camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enabled = true;
    controls.minZoom = 1;
    controls.maxZoom = 5;
    controls.update();

    function makeTheLines(number) {

        var lineCoords = [];

        DATA.edges.forEach((endpoints) => {

            var p1 = vertices[endpoints[0]]["uhp"], p2 = vertices[endpoints[1]]["uhp"];
            var radVect = VF.vectorDiff(p2, p1);
            var center = VF.midpoint(p1, p2);
            var r = VF.norm(radVect) / 2;

            console.log(p1, p2, radVect, r)

            var uhpVertices = [];

            for (var i = 0; i <= number; i++) {
                var theta = i * Math.PI / number - Math.PI / 2;
                uhpVertices.push([
                    radVect[0] * Math.sin(theta) / 2 + center[0],
                    radVect[1] * Math.sin(theta) / 2 + center[1],
                    r * Math.cos(theta)
                ])
            }
            lineCoords.push(uhpVertices);
        })
        return lineCoords;
    }

    const spheres = generateSpheres();
    const vertices = generateVertices();
    const uhpVertices = makeTheLines(31);

    function cameraLines() {

        lineGroup.children = [];

        var camPos = cameras[0].camera.position.toArray();
        uhpVertices.forEach((points) => {
            for (var k = 0; k < points.length - 1; k++) {
                var e1 = points[k];
                var e2 = points[k + 1];

                if (visibilityTest(e1, camPos, spheres, vertices, "uhp") && visibilityTest(e2, camPos, spheres, vertices, "uhp")) {
                    drawLine([e1, e2], 0x000000);
                } else {
                    drawLine([e1, e2], 0xAAAAAA);
                }
            }
        });
    }

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener('keydown', (event) => { if (event.key === "Enter") { cameraLines(); } });
    // window.addEventListener('mousemove', () => { cameraLines(5); });

    onWindowResize();

    // add the renderer to the 'view' div
    view.appendChild(renderer.domElement);

    render();

    function render() {

        requestAnimationFrame(render);

        for (let ii = 0; ii < cameras.length; ++ii) {

            const view = cameras[ii];
            const camera = view.camera;

            view.updateCamera(camera, scene);

            const left = Math.floor(WIDTH * view.left);
            const bottom = Math.floor(HEIGHT * view.bottom);
            const width = Math.floor(WIDTH * view.width);
            const height = Math.floor(HEIGHT * view.height);

            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);
            renderer.setScissorTest(true);
            renderer.setClearColor(view.background);

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.render(scene, camera);

        }

    }


    function onWindowResize() {

        WIDTH = view.clientWidth;
        HEIGHT = view.clientHeight;

        renderer.setSize(WIDTH, HEIGHT);

    }

}

export { main };
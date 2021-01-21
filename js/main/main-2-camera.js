import * as MAIN from "./main-utilities.js";
import * as THREE from "../three.module.js";
import { OrbitControls } from "../orbit-controls.js";
import * as CONSTANTS from "./main-constants.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

function main(name, geometry, lines, vertices, f) {

    var view = document.getElementById("view");
    var canvas = document.getElementById("testcanvas");

    var WIDTH = view.clientWidth;
    var HEIGHT = view.clientHeight;
    var rect = view.getBoundingClientRect();

    // setup scene
    var scene = new THREE.Scene();
    const pos = [3, 1, 1];
    //scene.background = new THREE.Color(0xDDDDDD);

    // group of meshes
    var meshes = new THREE.Group();
    var ghosts = new THREE.Group();

    // add camera and light to scene

    var cameras = [
        {
            left: 0,
            bottom: 0,
            width: 1,
            height: 1.0,
            background: 0xDDDDDD,
            eye: [5, 0, 0],
            up: [0, 1, 0],
            fov: 30,
            updateCamera: function (camera, scene) {

                camera.lookAt(scene.position);

            }
        },
        {
            left: 0.75,
            bottom: 0.05,
            width: 0.2,
            height: 0.2,
            background: 0xAAAAAA,
            eye: pos,
            up: [0, 0, 1],
            fov: 30,
            updateCamera: function (camera, scene) {

                camera.setRotationFromEuler(cameras[0].camera.rotation);
                camera.lookAt(scene.position);

            }
        },
    ];

    for (let ii = 0; ii < cameras.length; ++ii) {

        const view = cameras[ii];
        const camera = new THREE.PerspectiveCamera(view.fov, window.innerWidth / window.innerHeight, 0.01, 100);
        camera.position.fromArray(view.eye);
        camera.up.fromArray(view.up);
        view.camera = camera;

    }

    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x555555));

    // add the main polyhedron to the scene
    MAIN.addCellToGroup({
        geometryFunction: geometry,
        group: meshes,
        metric: CONSTANTS.metric[name],
        refinement: CONSTANTS.individualDefinition,
        order: CONSTANTS.order[name],
        colour: CONSTANTS.colour[name],
        numberOfFaces: CONSTANTS.numberOfFaces[name],
        name: name,
        faceMode: true,
        transform: "",
        compact: CONSTANTS.compact[name],
        opacity: 0.01
    });

    // setup the renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    var intersectionObjectName, intersectionObject, clickObjectParams;

    // add controls to the camera
    var controls = new OrbitControls(cameras[0].camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enabled = true;
    controls.minZoom = 1;
    controls.maxZoom = 5;
    controls.update();

    const material2 = new THREE.LineBasicMaterial({ color: 0x000000 });

    var lineGroup = new THREE.Group();

    function drawLine(p1, p2) {

        var points = [p1, p2];
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var line = new THREE.Line(geometry, material2);
        lineGroup.add(line);
    }


    // add a raycaster to the scene for object selection
    var raycaster = new THREE.Raycaster(), mouseVector = new THREE.Vector2();

    function cameraLines() {

        lineGroup.children = [];

        var camPos = cameras[0].camera.position;
        const eps = 1e-2;

        lines.forEach((endpoints) => {

            var i = 0;
            var hypVerts = [f(vertices[endpoints[0]]), f(vertices[endpoints[1]])];

            while (i < 5) {

                var newHypVerts = [];

                for (var j = 0; j < hypVerts.length - 1; j++) {

                    newHypVerts.push(hypVerts[j]);
                    var sum = VF.vectorSum(hypVerts[j], hypVerts[j + 1]);
                    newHypVerts.push(VF.vectorScale(sum, 1 / Math.sqrt(HF.hyperbolicNorm(sum))));

                }

                newHypVerts.push(hypVerts[hypVerts.length - 1]);
                hypVerts = newHypVerts;
                i++;

            }

            for (var k = 0; k < hypVerts.length - 1; k++) {
                var e1 = new THREE.Vector3().fromArray(HF.hyperboloidToPoincare(hypVerts[k]));
                var e2 = new THREE.Vector3().fromArray(HF.hyperboloidToPoincare(hypVerts[k + 1]));
                var f1 = new THREE.Vector3().fromArray(HF.hyperboloidToPoincare(hypVerts[k]));
                var f2 = new THREE.Vector3().fromArray(HF.hyperboloidToPoincare(hypVerts[k + 1]));

                var d1 = camPos.distanceTo(e1);
                var d2 = camPos.distanceTo(e2);

                var o1 = new THREE.Raycaster(camPos, e1.sub(camPos).normalize()).intersectObjects(meshes.children);
                var o2 = new THREE.Raycaster(camPos, e2.sub(camPos).normalize()).intersectObjects(meshes.children);

                // if (o1.length != 0) {
                //     console.log(o1[0].object.faceName)
                // }

                if (o1.length === 0 && o2.length === 0) {
                    drawLine(f1, f2);
                } else {
                    if (o1.length === 0) {
                        if (d2 - o2[0].distance < eps) {
                            drawLine(f1, f2);
                        }
                    } else {
                        if (o2.length === 0) {
                            if (d1 - o1[0].distance < eps) {
                                drawLine(f1, f2);
                            }
                        } else if ((d1 - o1[0].distance < eps) && (d2 - o2[0].distance < eps)) {
                            drawLine(f1, f2);
                        }
                    }
                }
            }
        })
    }

    scene.add(lineGroup);

    // add the meshes to the scene
    //scene.add(meshes);
    //scene.add(ghosts);

    // add some event listeners
    //window.addEventListener("click", onMouseClick, false);
    //window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener('keydown', (event) => {
        if (event.key === "Enter"){
            cameraLines();
        }

    });
    //window.addEventListener("touchstart", touchStart, false);
    //window.addEventListener("touchend", touchEnd, false);

    var material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        flatShading: true,
        shininess: 0.5
    });

    var mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(0.1, 1), material);
    mesh.position.fromArray(pos);
    scene.add(mesh);

    onWindowResize();

    // add the renderer to the 'view' div
    view.appendChild(renderer.domElement);

    render();

    // click Object is the object clicked by the user
    var clickObject = "";

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

    // function updateSpritePosition() {

    //     const halfWidth = window.innerWidth / 2;
    //     const halfHeight = window.innerHeight / 2;

    //     const halfImageWidth = textureSize / 2;
    //     const halfImageHeight = textureSize / 2;

    //     sprite.position.set(- halfWidth + halfImageWidth, halfHeight - halfImageHeight, 1);

    // }

    function onMouseClick(event) {

        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, cameras[0].camera);

        var intersects = raycaster.intersectObjects(meshes.children);
        if (intersects.length != 0) {
            var obj = intersects[0].object;
            document.getElementById("content1").innerHTML = obj.cellName + obj.faceName + CONSTANTS.specialLetter[name];
            var colour = new THREE.Color(
                Math.min(Math.max(obj.material.color.r + (2 * Math.random() - 1) / 10, 0), 1),
                Math.min(Math.max(obj.material.color.g + (2 * Math.random() - 1) / 10, 0), 1),
                Math.min(Math.max(obj.material.color.b + (2 * Math.random() - 1) / 10, 0), 1)
            );
            document.getElementById("content2").innerHTML = colour.r;
            MAIN.addCellToGroup({
                geometryFunction: geometry,
                group: meshes,
                metric: CONSTANTS.metric[name],
                refinement: CONSTANTS.individualDefinition,
                order: CONSTANTS.order[name],
                colour: "#" + colour.getHexString(),
                numberOfFaces: CONSTANTS.numberOfFaces[name],
                name: name,
                faceMode: true,
                transform: obj.cellName + obj.faceName + CONSTANTS.specialLetter[name],
                compact: CONSTANTS.compact[name]
            });
        } else {
            clickObject = null;
            document.getElementById("content1").innerHTML = "empty space";
            document.getElementById("content2").innerHTML = "";
        }

    }

    function touchEnd(e) {

        var rect = view.getBoundingClientRect();

        e.preventDefault();

        var touches = e.changedTouches;

        mouseVector.x = ((touches[0].clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((touches[0].clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(meshes.children);

        if (intersects.length != 0) {

            var obj = intersects[0].object;
            document.getElementById("content1").innerHTML = obj.cellName + obj.faceName + CONSTANTS.specialLetter[name];
            var colour = new THREE.Color(
                Math.min(Math.max(obj.material.color.r + (2 * Math.random() - 1) / 10, 0), 1),
                Math.min(Math.max(obj.material.color.g + (2 * Math.random() - 1) / 10, 0), 1),
                Math.min(Math.max(obj.material.color.b + (2 * Math.random() - 1) / 10, 0), 1)
            );
            document.getElementById("content2").innerHTML = colour.r;
            MAIN.addCellToGroup({
                geometryFunction: geometry,
                group: meshes,
                metric: CONSTANTS.metric[name],
                refinement: CONSTANTS.individualDefinition,
                order: CONSTANTS.order[name],
                colour: "#" + colour.getHexString(),
                numberOfFaces: CONSTANTS.numberOfFaces[name],
                name: name,
                faceMode: true,
                transform: obj.cellName + obj.faceName + CONSTANTS.specialLetter[name],
                compact: CONSTANTS.compact[name]
            });

        } else {

            clickObject = null;
            document.getElementById("content1").innerHTML = "empty space";
            document.getElementById("content2").innerHTML = "";

        }

    }

    function onWindowResize() {

        WIDTH = view.clientWidth;
        HEIGHT = view.clientHeight;

        renderer.setSize(WIDTH, HEIGHT);

        // camera.aspect = WIDTH / HEIGHT;
        // camera.updateProjectionMatrix();

        // insetWidth = window.innerHeight / 4; // square
        // insetHeight = window.innerHeight / 4;

        // camera2.aspect = WIDTH / HEIGHT;
        // camera2.updateProjectionMatrix();

    }

    function onMouseMove(event) {

        event.preventDefault();

        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, cameras[0].camera);

        var intersects = raycaster.intersectObjects(meshes.children);

        if (intersects.length > 0) {
            var selectedObject = intersects[0].object;
            if (intersectionObject != selectedObject) {
                ghosts.children = [];
                intersectionObject = selectedObject;
                meshes.children.forEach(mesh => {
                    if (mesh === intersectionObject) {
                        document.getElementById("content2").innerHTML = mesh.cellName;
                        var colour = new THREE.Color(
                            selectedObject.material.color.r,
                            selectedObject.material.color.g,
                            selectedObject.material.color.b
                        );
                        mesh.material.emissive.setRGB(colour.r, colour.g, colour.b);
                        MAIN.addCellToGroup({
                            geometryFunction: geometry,
                            group: ghosts,
                            metric: CONSTANTS.metric[name],
                            refinement: Math.max(CONSTANTS.individualDefinition - 1, 1),
                            order: CONSTANTS.order[name],
                            colour: "#" + colour.getHexString(),
                            numberOfFaces: CONSTANTS.numberOfFaces[name],
                            name: name,
                            faceMode: true,
                            transform: selectedObject.cellName + selectedObject.faceName + CONSTANTS.specialLetter[name],
                            opacity: 0.5,
                            compact: CONSTANTS.compact[name]
                        });
                    } else {
                        mesh.material.emissive.setRGB(0, 0, 0);
                    }
                });
            }
        } else {
            meshes.children.forEach(mesh => { mesh.material.emissive.setRGB(0, 0, 0); });
            intersectionObjectName = null;
            ghosts.children = [];
        }
    }

}

export { main };
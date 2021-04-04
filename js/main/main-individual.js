import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";

window.onload = main;

function main() {

    var p = 5, q = 3, r = 3;
    var thetax = 0, thetay = 0, thetaz = 0;
    var geom;
    var ghostGeom;
    var k = 0;

    const canvas = document.getElementById("c");
    var rect = canvas.getBoundingClientRect();

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(0, 10, 0);
    camera.up = new THREE.Vector3(0, 0, 1);

    scene.add(camera);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 0, 0);
    camera.add(directionalLight);

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    var ghostGroup = new THREE.Group();
    scene.add(ghostGroup);

    var raycaster = new THREE.Raycaster(), mouseVector = new THREE.Vector2();
    var newObject, oldObject;

    var data = {
        p: p,
        q: q,
        r: r,
        model: "poincare",
        refinement: 3,
        transform: "d",
        position: [0, 0, 0],
        faceMode: true
    }

    var ghostData = {
        p: p,
        q: q,
        r: r,
        model: "poincare",
        refinement: 3,
        transform: "",
        position: [0, 0, 0],
        faceMode: false,
        opacity: 0.3
    }

    geom = objectMaker(data);

    lineGroup.children = geom.children;

    render();

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousemove", onMouseMove, false);

    function onWindowResize() {

        WIDTH = canvas.clientWidth;
        HEIGHT = canvas.clientHeight;

        renderer.setSize(WIDTH, HEIGHT);

        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    }

    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);

    }

    function onMouseMove(event) {

        event.preventDefault();

        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(lineGroup.children);

        if (intersects.length > 0) {

            if (k == 0) {

                oldObject = intersects[0].object;
                k++;

            }

            newObject = intersects[0].object;

            if (newObject.id != oldObject.id) {

                oldObject.material.emissive.setRGB(0, 0, 0);
                newObject.material.emissive.setRGB(0.1, 0.8, 0.1);

                oldObject = newObject;

                ghostData.transform = newObject.cellName + newObject.faceName + "d";
                ghostGeom = objectMaker(ghostData);
                ghostGroup.children = [ghostGeom];

            }

        } else {

            oldObject.material.emissive.setRGB(0, 0, 0);
            ghostGroup.children = [];

        }

    }

    window.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            geom = objectMaker(data);
            lineGroup.children = [geom];
        }
    });

    window.addEventListener("touchend", () => {
        geom = objectMaker(data);
        lineGroup.children = [geom];
    }, false);

    document.getElementById("myRangep").oninput = function () {
        data.p = this.value;
    };

    document.getElementById("myRangeq").oninput = function () {
        data.q = this.value;
    };

    document.getElementById("myRanger").oninput = function () {
        data.r = this.value / 2;
    };

    document.getElementById("myRangex").oninput = function () {
        thetax = Math.PI * this.value / 50;
    };

    document.getElementById("myRangey").oninput = function () {
        thetay = Math.PI * this.value / 50;
    };

    document.getElementById("myRangez").oninput = function () {
        thetaz = Math.PI * this.value / 50;
    };

}
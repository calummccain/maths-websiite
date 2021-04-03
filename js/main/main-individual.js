import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";

window.onload = main;

function main() {

    var p = 5, q = 3, r = 3;
    var thetax = 0, thetay = 0, thetaz = 0;
    var geom = {};

    const canvas = document.getElementById("c");

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

    var data = {
        p: p,
        q: q,
        r: r,
        model: "poincare",
        refinement: 3,
        transform: "d",
        position: [0, 0, 0],
    }

    geom = objectMaker(data);

    lineGroup.children = [geom];

    render();

    window.addEventListener("resize", onWindowResize, false);

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
import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";
import * as EM from "./edge-maker.js";
import { cubeDataTrunc } from "../data/43nt.js";

window.onload = main;

function main() {

    var r = 7;
    var thetax = 0, thetay = 0, thetaz = 0, thetau = 0, thetav = 0, thetaw = 0;
    var metric = "s";
    var invisible = false;
    var intersection = true;
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

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    var data = {
        p: 3,
        q: 3,
        r: r,
        model: "uhp",
        refinement: 50,
        intersection: intersection,
        invisibleLines: invisible,
        transform: "",
        position: [0, 0, 0],
        cells: [""],
        numFaces: 200
    }

    console.log(cubeDataTrunc(r))

    geom = (rx, ry, rz, ru, rv, rw, camera) => EM.generateData(
        cubeDataTrunc(r), rx, ry, rz, ru, rv, rw, data.refinement, data.intersection, data.invisibleLines, camera, data.cells
    );

    lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

    // const geometry = new THREE.SphereBufferGeometry(2, 64, 64);
    // const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 0.5, transparent: true });
    // const sphere1 = new THREE.Mesh(geometry, material1);
    // sphere1.position.set(-1,-1,-1);
    // scene.add(sphere1);

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
            geom = (rx, ry, rz, ru, rv, rw, camera) => EM.generateData(
                cubeDataTrunc(r), rx, ry, rz, ru, rv, rw, data.refinement, data.intersection, data.invisibleLines, camera, data.cells
            );
            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
        }
    });

    window.addEventListener("touchend", () => {
        geom = (rx, ry, rz, ru, rv, rw, camera) => EM.generateData(
            cubeDataTrunc(r), rx, ry, rz, ru, rv, rw, data.refinement, data.intersection, data.invisibleLines, camera, data.cells
        );
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    }, false);

    document.getElementById("myRanger").oninput = function () {
        r = this.value / 2;
        geom = (rx, ry, rz, ru, rv, rw, camera) => EM.generateData(
            cubeDataTrunc(r), rx, ry, rz, ru, rv, rw, data.refinement, data.intersection, data.invisibleLines, camera, data.cells
        );
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

    };

    document.getElementById("myRangex").oninput = function () {
        thetax = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangey").oninput = function () {
        thetay = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangez").oninput = function () {
        thetaz = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangeu").oninput = function () {
        (metric === "h" || metric === "p" || metric === "u") ? thetau = this.value / 30 :
            (metric === "e") ? thetau = this.value / 10 :
                (metric === "s") ? thetau = Math.PI * this.value / 50 : this.value;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangev").oninput = function () {
        (metric === "h" || metric === "p" || metric === "u") ? thetav = this.value / 30 :
            (metric === "e") ? thetav = this.value / 10 :
                (metric === "s") ? thetav = Math.PI * this.value / 50 : this.value;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

    };

    document.getElementById("myRangew").oninput = function () {
        (metric === "h" || metric === "p" || metric === "u") ? thetaw = this.value / 30 :
            (metric === "e") ? thetaw = this.value / 10 :
                (metric === "s") ? thetaw = Math.PI * this.value / 50 : this.value;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("visibleLines").addEventListener("click", function () {
        data.invisibleLines = !data.invisibleLines;
    });

    document.getElementById("intersection").addEventListener("click", function () {
        data.intersection = !data.intersection;
    });

}
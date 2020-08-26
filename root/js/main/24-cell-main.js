import * as THREE from "../three.module.js";
import * as GEOM from "../geometries/24-cell-geometry.js";
import * as XXIV from "../data/polychorons/24-cell.js";
import { OrbitControls } from "../orbit-controls.js";

var scene, camera, renderer, controls;

var objects = [];

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function init(n, opacityValue, cells, d) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    scene.add(new THREE.HemisphereLight(0xcccccc, 0x222222));

    //var light = new THREE.DirectionalLight(0xffffff, 0.5);
    //light.position.set(2, 0, 0);
    //scene.add(light);

    //var light = new THREE.PointLight(0xffffff, 2, 100);
    //light.position.set(0, 0, 0);
    //scene.add(light);

    initObjects(n, opacityValue, cells, d);

    initCamera();
    initRenderer();

    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(3, 0, 0);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initObjects(n, opacityValue, cells, d) {

    for (var i = 0; i < cells.length; i++) {

        var material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.6, 0.7),
            roughness: 0.5,
            metalness: 0,
            flatShading: true,
            opacity: opacityValue,
            transparent: true
        });

        material.side = THREE.DoubleSide;

        var geometry = GEOM.xxivCellGeometry(n, XXIV.cells[cells[i]], d);

        var cell = new THREE.Mesh(geometry, material);

        objects.push(cell);
        scene.add(cell);

    }

    return objects;
}

function rotateObjects() {

    for (var i = 0; i < objects.length; i++) {

        objects[i].rotation.x -= 0;
        objects[i].rotation.y -= 0.005;
        objects[i].rotation.z -= 0.01;

    }
}

function render() {

    requestAnimationFrame(render);
    //rotateObjects();

    controls.update();
    renderer.render(scene, camera);

}

export { init, render };

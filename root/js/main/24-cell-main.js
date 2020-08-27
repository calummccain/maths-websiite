import * as THREE from "../three.module.js";
import * as GEOM from "../geometries/24-cell-geometry.js";
import * as XXIV from "../data/polychorons/24-cell.js";
import { OrbitControls } from "../orbit-controls.js";

var scene, camera, renderer, controls, raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function init(n, opacityValue, cells, d) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    //scene.add(new THREE.HemisphereLight(0xcccccc, 0x222222));

    //var light = new THREE.DirectionalLight(0xffffff, 0.5);
    //light.position.set(2, 0, 0);
    //scene.add(light);

    //var light = new THREE.PointLight(0xffffff, 2, 100);
    //light.position.set(0, 0, 0);
    //scene.add(light);

    raycaster = new THREE.Raycaster();
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('click', onDocumentMouseClick, false);

    initObjects(n, opacityValue, cells, d);

    initCamera();
    camera.add(new THREE.HemisphereLight(0xcccccc, 0x222222));
    scene.add(camera);
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

        var col = Math.random();
        var geometry = GEOM.xxivCellGeometry(n, XXIV.cells[cells[i]], d);

        for (var j = 0; j < 8; j++) {
            scene.add(new THREE.Mesh(
                geometry[j],
                new THREE.MeshStandardMaterial({
                    color: new THREE.Color().setHSL(col, 0.6, 0.7),
                    roughness: 0.5,
                    metalness: 0,
                    flatShading: true,
                    opacity: opacityValue,
                    transparent: true,
                    side: THREE.DoubleSide
                })));
        }

    }

}

function render() {

    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);

}

function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) {
                INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            }
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
        }
    } else {
        if (INTERSECTED) {
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        }
        INTERSECTED = null;
    }

}

function onDocumentMouseClick(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        console.log(intersects[0].object.geometry.name);
    }

}

export { init, render };

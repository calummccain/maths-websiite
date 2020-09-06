import * as THREE from "../three.module.js";
import { OrbitControls } from "../orbit-controls.js";

var scene, camera, renderer, controls, raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;

var objects = [];

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function init(n, opacityValue, order, cells, s, geometryFunction, numberofFaces) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    raycaster = new THREE.Raycaster();
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('click', function () { onDocumentMouseClick(n, opacityValue, order, s, geometryFunction, numberofFaces); }, false);

    initObjects(n, opacityValue, order, cells, s, geometryFunction, numberofFaces);

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
    camera.position.set(1, 1, 1);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initObjects(n, opacityValue, order, cells, s, geometryFunction, numberofFaces) {
    for (var i = 0; i < cells.length; i++) {
        addCellToScene(n, opacityValue, order, cells[i], s, geometryFunction, numberofFaces);
    }
}

function addCellToScene(n, opacityValue, order, transform, s, geometryFunction, numberofFaces) {

    var col = Math.random();
    objects.push([transform]);

    var shapeGeometry = geometryFunction(order, n, transform, s);

    for (var j = 0; j < numberofFaces; j++) {
        scene.add(new THREE.Mesh(
            shapeGeometry[j],
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

function onDocumentMouseClick(n, opacityValue, order, s, geometryFunction, numberofFaces) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        var [face, cell] = intersects[0].object.geometry.name;

        console.log(face);
        console.log(cell);
        console.log(intersects[0].object.geometry.name);

        addCellToScene(n, opacityValue, order, cell + face + 'c', s, geometryFunction, numberofFaces);
    }

}

export { init, render };

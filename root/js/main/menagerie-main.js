import * as THREE from "../three.module.js";
import * as GEOM53N from "../geometries/53n-geometry.js";
import * as GEOM43N from "../geometries/43n-geometry.js";
import * as GEOM33N from "../geometries/33n-geometry.js";
import * as GEOM34N from "../geometries/34n-geometry.js";
import * as GEOM35N from "../geometries/35n-geometry.js";
import {OrbitControls} from "../orbit-controls.js"

var scene, camera, renderer, raycaster, controls;
var mouse = new THREE.Vector2(), INTERSECTED;

var objects = [];
var shapes = ['534', '535', '536', '435', '436', '336', '344', '353'];
var locations = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function init(n, opacityValue, s) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    scene.add(new THREE.HemisphereLight(0xcccccc, 0x222222));

    //var light = new THREE.DirectionalLight(0xffffff, 0.5);
    //light.position.set(1, -1, 1);
    //scene.add(light);

    //var light = new THREE.PointLight(0xffffff, 2, 100);
    //light.position.set(0, 0, 0);
    //scene.add(light);

    raycaster = new THREE.Raycaster();
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    initObjects(n, opacityValue, s);

    initCamera();
    initRenderer();

    controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(5, 0, 0);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initObjects(n, opacityValue, s) {

    for (var i = 0; i < shapes.length; i++) {

        var material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(i / (shapes.length - 1), 0.7, 0.8),
            roughness: 0.5,
            metalness: 0,
            flatShading: true,
            opacity: opacityValue,
            transparent: true
        });

        var geometry;
        var type = shapes[i].slice(0, 2);

        if (type === '53') {

            geometry = GEOM53N.hyperbolicDodecahedronGeometry(shapes[i][2], n, '', s);

        } else if (type === '43') {

            geometry = GEOM43N.hyperbolicCubeGeometry(shapes[i][2], n, '', s);

        } else if (type === '33') {

            geometry = GEOM33N.hyperbolicTetrahedronGeometry(shapes[i][2], n, '', s);

        } else if (type === '34') {

            geometry = GEOM34N.hyperbolicOctahedronGeometry(shapes[i][2], n, '', s);

        } else if (type === '35') {

            geometry = GEOM35N.hyperbolicIcosahedronGeometry(shapes[i][2], n, '', s);

        }

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

        objects[i].position.set(locations[i][0], locations[i][1], locations[i][2]);

    }
}

function rotateScene() {
    scene.rotation.x -= 0.001;
    scene.rotation.y -= 0.005;
    scene.rotation.z -= 0;
}

function render() {

    requestAnimationFrame(render);
    rotateObjects();
    //rotateScene();

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);

        }

    } else {

        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;

    }

    controls.update();

    renderer.render(scene, camera);

}

function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

export { init, render };

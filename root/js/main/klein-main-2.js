import * as THREE from "../three.module.js";
import * as GEOM from "../geometries/53n-geometry.js"

var scene, camera, renderer;
var objects = [];

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function init(n, transforms, opacityValue, s, order) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, -1, 1);
    scene.add(light);

    initObjects(n, transforms, opacityValue, s, order);

    initCamera();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, -2, 1);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initObjects(n, transforms, opacityValue, s, order) {

    // loop over the each transformation in transformation array

    for (var m = 0; m < transforms.length; m++) {

        // define a material for cell corresponding to transformation
        // colour is defined through HSL
        // transparency turn on/off - transparent
        // can change opacity too

        var material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.8),
            roughness: 0.5,
            metalness: 0,
            flatShading: true,
            opacity: opacityValue,
            transparent: true
        });

        var geometry = GEOM.hyperbolicDodecahedronGeometry(order, n, transforms[m], s);

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
    rotateObjects();
    renderer.render(scene, camera);

}

export { init, render };

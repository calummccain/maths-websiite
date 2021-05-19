import * as THREE from "../three-bits/three.module.js";
import * as VF from "../maths-functions/vector-functions.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { SVGRenderer } from "../three-bits/SVGRenderer.js";

window.onload = main;

function main() {

    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();

    var model = "uhp";

    var [mousex, mousey, mousez] = [0, 0, 0];

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new SVGRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE5E5E5);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(5, 5, 5);
    camera.up = new THREE.Vector3(0, 0, 1);


    scene.add(camera);

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const geometry = new THREE.PlaneBufferGeometry(20, 20, 10, 10);
    const material = new THREE.MeshLambertMaterial({ color: 0x999999, side: THREE.DoubleSide, opacity: 0.7, transparent: true });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

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

    document.getElementById("model").addEventListener("click", function () {
        model = (model === "uhp") ? "poincare" : "uhp";
    });

    canvas.addEventListener("mouseup", onClick);

    function onClick(event) {

        event.preventDefault();

        // Get the relative position of the mouse to the canvas
        mousex = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mousey = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;
        mousez = 1;

        var cam = camera.position.toArray();

        var ray = VF.vectorDiff([mousex, mousey, mousez], cam);

        var intersect = VF.vectorSum([VF.vectorScale(ray, -cam[2] / ray[2]), cam])

        var l1 = new THREE.PointLight(0xff0000, 10, 100);
        l1.position.set(intersect[0], intersect[1], intersect[2]);
        console.log(l1);
        scene.add(l1);

        for (var i in scene.children) {
            if (scene.children[i].material) scene.children[i].material.needsUpdate = true;
        }
    }

}
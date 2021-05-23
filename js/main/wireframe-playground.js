import * as THREE from "../three-bits/three.module.js";
import * as VF from "../maths-functions/vector-functions.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { SVGRenderer } from "../three-bits/SVGRenderer.js";

import * as HG from "../maths-functions/hyperbolic-geodesic.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

window.onload = main;

function main() {

    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE5E5E5);
    var mode = "move";

    var coords;

    const width = 2;

    const number = 50;

    var intersects;

    var model = "uhp";

    const geometrySphere = new THREE.SphereBufferGeometry(0.2, 4, 4);
    const materialSphere = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var sphereMouse = new THREE.Mesh(geometrySphere, materialSphere);
    scene.add(sphereMouse);

    const materialSphere1 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const materialSphere2 = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const materialSphere3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    var sphere1 = new THREE.Mesh(geometrySphere, materialSphere1);
    var sphere2 = new THREE.Mesh(geometrySphere, materialSphere2);
    var sphere3 = new THREE.Mesh(geometrySphere, materialSphere3);

    sphere1.position.set(1, 0, 0);
    sphere2.position.set(0, 1, 0);
    sphere3.position.set(0, 0, 1);

    scene.add(sphere1, sphere2, sphere3)

    var vertex = [sphere1];
    var edge = [sphere1, sphere2];
    var face = [sphere1, sphere2, sphere3];

    var edgeMarker = 0;
    var faceMarker = 0;

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new SVGRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

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
    const material = new THREE.MeshLambertMaterial({ color: 0xBBBBBB, side: THREE.DoubleSide, opacity: 0.1, transparent: true });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Make raycaster and mouse vector
    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();

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

    document.getElementById("addvertices").addEventListener("click", function () {
        mode = "addvertices";
    });

    document.getElementById("addedges").addEventListener("click", function () {
        mode = "addedges";
    });

    document.getElementById("addfaces").addEventListener("click", function () {
        mode = "addfaces";
    });

    document.getElementById("move").addEventListener("click", function () {
        mode = "move";
    });

    canvas.addEventListener("mouseup", onClick);

    canvas.addEventListener("mousemove", mouseMove);

    function mouseMove(event) {

        event.preventDefault();

        // Get the relative position of the mouse to the canvas
        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects([plane]);

        if (intersects.length > 0) {

            sphereMouse.position.copy(intersects[0].point);

        }

    }

    function onClick(event) {

        event.preventDefault();

        if (mode === "addvertices") {

            vertex[0].position.copy(sphereMouse.position);

        } else if (mode === "addedges") {

            edge[edgeMarker].position.copy(sphereMouse.position);

            edgeMarker++;

            if (edgeMarker == 2) {

                console.log( edge[0].position.toArray(), HF.upperHalfPlaneToHyperboloid(edge[0].position.toArray()))

                coords = HG.hyperbolicGeodesic(
                    { hyperboloid: HF.upperHalfPlaneToHyperboloid(edge[0].position.toArray()) },
                    { hyperboloid: HF.upperHalfPlaneToHyperboloid(edge[1].position.toArray()) },
                    number,
                    model
                );

                scene.add(drawLine(coords, 0x000000));

                edgeMarker = 0;

            }

        } else if (mode === "addfaces") {

            face[faceMarker].position.copy(sphereMouse.position);

            faceMarker = (faceMarker + 1) % 3;

        }

    }

    function drawLine(vectors, col) {

        var threeVectors = [];

        vectors.forEach((vect) => {
            threeVectors.push(new THREE.Vector3().fromArray(vect));
        });

        var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col, linewidth: width }));

        return line;

    }

}
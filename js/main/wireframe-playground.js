import * as THREE from "../three-bits/three.module.js";
import * as VF from "../maths-functions/vector-functions.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { SVGRenderer } from "../three-bits/SVGRenderer.js";

import * as HG from "../maths-functions/hyperbolic-geodesic.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";

window.onload = main;

function main() {

    // Canvas constants
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    // Define scene and background colour
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE5E5E5);

    // mode - the current selected move/vertex/edge/face/cell
    var mode = "move";

    // hyperbolic model
    var model = "uhp";

    // parameters for the edges
    const edgeNumber = 50;
    const edgeWidth = 2;

    var intersects;

    // Mouse location
    const geometrySphere = new THREE.SphereBufferGeometry(0.2, 4, 4);
    const materialSphere = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var sphereMouse = new THREE.Mesh(geometrySphere, materialSphere);
    scene.add(sphereMouse);

    // Locations of the control points
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

    // control arrays
    var vertexControl = [sphere1];
    var edgeControl = [sphere1, sphere2];
    var faceControl = [sphere1, sphere2, sphere3];

    // selector markers
    var edgeMarker = 0;
    var faceMarker = 0;

    // arrays of vertex/edge/face/cell data

    var vertices = [];
    var edges = [];
    var faces = [];
    var cells = [];

    var edgeGroup = new THREE.Group();
    scene.add(edgeGroup);

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

    document.getElementById("model").addEventListener("click", function () {
        model = (model === "uhp") ? "poincare" : "uhp";
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

            vertexControl[0].position.copy(sphereMouse.position);

            addToVertices(HF.upperHalfPlaneToHyperboloid(sphereMouse.position.toArray()), [], [], []);

        } else if (mode === "addedges") {

            edgeControl[edgeMarker].position.copy(sphereMouse.position);

            edgeMarker++;

            if (edgeMarker == 2) {

                addToVertices(HF.upperHalfPlaneToHyperboloid(edgeControl[0].position.toArray()), [edges.length - 1], [], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(edgeControl[1].position.toArray()), [edges.length - 1], [], []);

                addToEdges(HG.hyperbolicGeodesic(vertices[vertices.length - 2], vertices[vertices.length - 1], edgeNumber), [vertices.length - 2, vertices.length - 1], [], []);

                if (model === "poincare") {

                    edgeGroup.add(drawLine(edges[edges.length - 1].poincareCoords, 0x000000));

                } else if (model === "uhp") {

                    edgeGroup.add(drawLine(edges[edges.length - 1].uhpCoords, 0x000000));

                }


                edgeMarker = 0;

            }

        } else if (mode === "addfaces") {

            faceControl[faceMarker].position.copy(sphereMouse.position);

            faceMarker++;

            if (faceMarker == 3) {

                addToVertices(HF.upperHalfPlaneToHyperboloid(faceControl[0].position.toArray()), [edges.length - 3, edges.length - 1], [faces.length - 1], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(faceControl[1].position.toArray()), [edges.length - 3, edges.length - 2], [faces.length - 1], []);
                addToVertices(HF.upperHalfPlaneToHyperboloid(faceControl[2].position.toArray()), [edges.length - 2, edges.length - 1], [faces.length - 1], []);

                addToEdges(HG.hyperbolicGeodesic(vertices[vertices.length - 3], vertices[vertices.length - 2], edgeNumber), [vertices.length - 3, vertices.length - 2], [], []);
                addToEdges(HG.hyperbolicGeodesic(vertices[vertices.length - 2], vertices[vertices.length - 1], edgeNumber), [vertices.length - 2, vertices.length - 1], [], []);
                addToEdges(HG.hyperbolicGeodesic(vertices[vertices.length - 1], vertices[vertices.length - 3], edgeNumber), [vertices.length - 3, vertices.length - 1], [], []);

                if (model === "poincare") {

                    edgeGroup.add(drawLine(edges[edges.length - 3].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 2].poincareCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 1].poincareCoords, 0x000000));

                } else if (model === "uhp") {

                    edgeGroup.add(drawLine(edges[edges.length - 3].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 2].uhpCoords, 0x000000));
                    edgeGroup.add(drawLine(edges[edges.length - 1].uhpCoords, 0x000000));

                }


                faceMarker = 0;

            }

        }

    }

    function drawLine(vectors, col) {

        var threeVectors = [];

        vectors.forEach((vect) => {
            threeVectors.push(new THREE.Vector3().fromArray(vect));
        });

        var geometry = new THREE.BufferGeometry().setFromPoints(threeVectors);
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: col, linewidth: edgeWidth }));

        return line;

    }

    function addToVertices(vertex, edges, faces, cells) {

        vertices.push({
            hyperboloid: vertex,
            klein: HF.hyperboloidToKlein(vertex),
            poincare: HF.hyperboloidToPoincare(vertex),
            uhp: HF.hyperboloidToUpperHalfPlane(vertex),
            edges: edges,
            faces: faces,
            cells: cells
        });

    }

    function addToEdges(coords, vertices, faces, cells) {

        edges.push({
            poincareCoords: coords.poincare,
            uhpCoords: coords.uhp,
            vertices: vertices,
            faces: faces,
            cells: cells
        });

    }

}
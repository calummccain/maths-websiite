// ========================================================
// main for the solid viewer
// 
// Inputs: 
// Output:
//
// Change history:
//     ??/??/?? Initial commit
//=========================================================

import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";
import { typeOfCell } from "../data/geometry-decider.js";

window.onload = main;

function main() {

    // Initial values for p, q, r
    var p = 3, q = 3, r = 3;

    // Initial values for the rotation values
    var thetax = 0, thetay = 0, thetaz = 0, thetau = 0, thetav = 0, thetaw = 0;

    // Flag to determine if the geometry has just changed or not: k = 0 => new geometry
    var k = 0;

    //
    const initialCell = "d";
    var list = [initialCell];

    // Determines current mode of clicking: add, remove, move
    var mode = "add";

    //
    var cellType;

    // Setup canvas and get dimensions
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();
    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    // Setup and add renderer to canvas
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    canvas.appendChild(renderer.domElement);

    // Make scene and set background colour
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    // Setup camera, position
    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(5, 5, 0);
    scene.add(camera);

    // Setup and add lighting
    const pointlight = new THREE.PointLight(0xffffff, 1, 100);
    pointlight.position.set(10, 0, 0);
    pointlight.castShadow = true;
    camera.add(pointlight);

    // Setup controls and add to camera
    var controls = new OrbitControls(camera, canvas);
    controls.update();

    // visibleGroup is the set of objects visible to the camera
    var visibleGroup = new THREE.Group();
    scene.add(visibleGroup);

    // ghostGroup is the object under the mouse when adding objects
    var ghostGroup = new THREE.Group();
    scene.add(ghostGroup);

    // Make raycaster and mouse vector
    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2();

    // intersects: what the raycaster hits (if anything)
    // newObject: What the raycaster is currently selecting
    // oldObject: what the raycaster selected just before
    // clickObject: what the user has clicked on
    // removeObject: highlighted removable object
    var intersects, newObject, oldObject, clickObject, removeObject;

    // data is the dictionary of parameters for the geometries
    var data = {
        p: p,
        q: q,
        r: r,
        model: "poincare",
        refinement: 4,
        transform: initialCell,
        position: [0, 0, 0],
        faceMode: true,
        numFaces: 200,
        shader: "toon",
        slices: 10,
        truncated: false
    }

    // ghostData is the dictionary of parameters for the ghost geometries
    var ghostData = {
        p: p,
        q: q,
        r: r,
        model: "poincare",
        refinement: 3,
        transform: "",
        position: [0, 0, 0],
        faceMode: false,
        opacity: 0.3,
        numFaces: 50,
        shader: "toon",
        slices: 10
    }

    // Using the data dictionary make a geometry using objectMaker and add to the visibleGroup
    visibleGroup.children = objectMaker(data).children;

    // Add some event listeners to the page
    window.addEventListener("resize", onResize, false);

    window.addEventListener("mousemove", onMouseMove, false);

    window.addEventListener("click", onClick, false);

    // window.addEventListener("touchend", () => { visibleGroup.children = objectMaker(data).children; }, false);

    window.addEventListener('keydown', onKeyDown, false);

    render();

    function onResize() {

        // Redefine the width, height
        WIDTH = canvas.clientWidth;
        HEIGHT = canvas.clientHeight;

        // Update the renderer size
        renderer.setSize(WIDTH, HEIGHT);

        // Update the camera aspect ratio
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    }

    function onMouseMove(event) {

        event.preventDefault();

        // Get mouse position relative to canvas
        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;

        // See what the ray intersects
        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects(visibleGroup.children);

        if (mode === "add") {

            // If the ray intersects something
            if (intersects.length > 0) {

                // If nothing selected before i.e. new geometry
                if (k == 0) {

                    oldObject = intersects[0].object;
                    k++;

                }

                // Updates the newObject
                newObject = intersects[0].object;

                // If the newObject is different from the oldObject change their colours, update oldObject and ghostData
                if (newObject.id != oldObject.id) {

                    oldObject.material.emissive.setRGB(0, 0, 0);
                    newObject.material.emissive.setRGB(0.1, 0.8, 0.1);

                    oldObject = newObject;

                    ghostData.transform = newObject.cellName + newObject.faceName + "d";
                    ghostGroup.children = [objectMaker(ghostData)];

                }

            } else {

                // If nothing selected (empty space) reset oldObject and empty the ghostGroup
                if (k != 0) {

                    oldObject.material.emissive.setRGB(0, 0, 0);
                    ghostGroup.children = [];

                }

            }

        } else if (mode === "remove") {

            // If ray hits something
            if (intersects.length > 0) {

                // Get the name of the object to be removed
                removeObject = intersects[0].object.cellName;

                // aHighlight all faces with the removeObjects name
                visibleGroup.children.forEach((mesh) => {

                    if (mesh.cellName === removeObject) {

                        mesh.material.emissive.setRGB(0.8, 0.1, 0.1);

                    } else {

                        mesh.material.emissive.setRGB(0, 0, 0);

                    }

                })

            } else {

                // Otherwise reset emmisivity of all faces
                visibleGroup.children.forEach((mesh) => {

                    mesh.material.emissive.setRGB(0, 0, 0);

                })

            }

        }

    }

    function onClick(event) {

        event.preventDefault();

        // Get the relative position of the mouse to the canvas
        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;

        // Find what the raycaster hits
        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects(visibleGroup.children);

        if (intersects.length > 0) {

            clickObject = intersects[0].object;

            // If mode is 'add' then add the cell from the face
            // If mode is 'rmeove' then remove the cell 
            if (mode === "add") {

                data.transform = clickObject.cellName + clickObject.faceName + "d";

                visibleGroup.children = visibleGroup.children.concat(objectMaker(data).children);

                list.push(data.transform);

            } else if (mode === "remove") {

                const removeCell = clickObject.cellName;
                var newChildren = [];

                visibleGroup.children.forEach((mesh) => {

                    if (mesh.cellName !== removeCell) {

                        newChildren.push(mesh);

                    }

                })

                var newList = [];

                list.forEach((elem) => {

                    if (elem !== removeCell) {

                        newList.push(elem);

                    }

                })

                visibleGroup.children = newChildren;
                list = newList;

            }

        } else if (visibleGroup.children.length == 0 && mode === "add") {

            visibleGroup.children = visibleGroup.children.concat(objectMaker(data).children);

        }

    }

    function onKeyDown(event) {

        // If 'enter' pressed, redraw the scene with the initial cell
        if (event.key === "Enter") {

            data.transform = initialCell;
            list = [initialCell];
            k = 0;
            visibleGroup.children = objectMaker(data).children;

        }

    }

    // render the scene...
    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);

    }

    // Add functionality to the menu
    document.getElementById("list").addEventListener("click", function () {
        alert(list);
    });

    document.getElementById("add").addEventListener("click", function () {
        mode = "add";
        ghostGroup.children = [];
    });

    document.getElementById("remove").addEventListener("click", function () {
        mode = "remove";
        ghostGroup.children = [];
    });

    document.getElementById("draw").addEventListener("click", function () {
        data.transform = initialCell;
        list = [initialCell];
        k = 0;
        visibleGroup.children = objectMaker(data).children;
    });

    document.getElementById("move").addEventListener("click", function () {
        mode = "move";
        ghostGroup.children = [];
    });

    document.getElementById("truncated").addEventListener("click", function () {
        data.truncated = !data.truncated;
    });

    $(document).ready(function () {

        updateCellSelector(data.p);

        $("#pqr").click(function () {
            $("#pqrselector").toggle();
        });

        $("#rightarrow").click(function () {
            data.p = Math.min(data.p + 1, 8);
            ghostData.p = Math.min(data.p + 1, 8);
            updateCellSelector(data.p);
        });

        $("#leftarrow").click(function () {
            data.p = Math.max(data.p - 1, 3);
            ghostData.p = Math.max(data.p - 1, 3);
            updateCellSelector(data.p);
        });

        $(".cellselector").click(function () {
            [q, r] = $(this).attr("id").split("-");
            data.q = Number(q), data.r = Number(r);
            ghostData.q = Number(q), ghostData.r = Number(r);
            visibleGroup.children = objectMaker(data).children;
        })

    });

    const cellTypeColours = {
        "s": "#FFB3BA",
        "e": "#FFDFBA",
        "h": "#FFFFBA",
        "p": "#BAFFC9",
        "u": "#BAE1FF"
    }

    function updateCellSelector(p) {

        for (var q = 3; q <= 8; q++) {

            for (var r = 3; r <= 8; r++) {

                cellType = typeOfCell(p, q, r);

                document.getElementById(q + "-" + r).innerHTML = "{" + p + "," + q + "," + r + "}";
                document.getElementById(q + "-" + r).style.backgroundColor = cellTypeColours[cellType];

            }

        }

    }

}
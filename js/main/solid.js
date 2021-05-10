import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";

window.onload = main;

function main() {

    var p = 3, q = 3, r = 3;
    var k = 0;
    const initialCell = "d";
    var mode = "add";
    var cellType;

    const canvas = document.getElementById("canvas");
    var rect = canvas.getBoundingClientRect();

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(5, 5, 0);
    camera.up = new THREE.Vector3(0, 0, 1);

    scene.add(camera);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(10, 0, 0);
    // scene.add(directionalLight);

    const pointlight = new THREE.PointLight(0xffffff, 1, 100);
    pointlight.position.set(10, 0, 0);
    pointlight.castShadow = true;
    camera.add(pointlight);

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    var ghostGroup = new THREE.Group();
    scene.add(ghostGroup);

    var raycaster = new THREE.Raycaster(), mouseVector = new THREE.Vector2();
    var newObject, oldObject, clickObject;

    var data = {
        p: p,
        q: q,
        r: r,
        model: "poincare",
        refinement: 3,
        transform: initialCell,
        position: [0, 0, 0],
        faceMode: true,
        numFaces: 200,
        shader: "toon",
        slices: 10,
        truncated: false
    }

    var list = [initialCell];

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

    lineGroup.children = objectMaker(data).children;

    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("click", onMouseClick, false);

    render();

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

    function onMouseMove(event) {

        event.preventDefault();

        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(lineGroup.children);

        if (mode === "add") {

            if (intersects.length > 0) {

                if (k == 0) {

                    oldObject = intersects[0].object;
                    k++;

                }

                newObject = intersects[0].object;

                if (newObject.id != oldObject.id) {

                    oldObject.material.emissive.setRGB(0, 0, 0);
                    newObject.material.emissive.setRGB(0.1, 0.8, 0.1);

                    oldObject = newObject;

                    ghostData.transform = newObject.cellName + newObject.faceName + "d";
                    ghostGroup.children = [objectMaker(ghostData)];

                }

            } else {

                if (k != 0) {

                    oldObject.material.emissive.setRGB(0, 0, 0);
                    ghostGroup.children = [];

                }

            }

        } else if (mode === "remove") {

            if (intersects.length > 0) {

                var removeCell = intersects[0].object.cellName;

                lineGroup.children.forEach((mesh) => {

                    if (mesh.cellName === removeCell) {

                        mesh.material.emissive.setRGB(0.8, 0.1, 0.1);

                    } else {

                        mesh.material.emissive.setRGB(0, 0, 0);

                    }

                })

            } else {

                lineGroup.children.forEach((mesh) => {

                    mesh.material.emissive.setRGB(0, 0, 0);

                })

            }

        }

    }

    function onMouseClick(event) {

        event.preventDefault();

        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects2 = raycaster.intersectObjects(lineGroup.children);

        if (intersects2.length > 0) {

            clickObject = intersects2[0].object;

            if (mode === "add") {

                data.transform = clickObject.cellName + clickObject.faceName + "d";

                lineGroup.children = lineGroup.children.concat(objectMaker(data).children);

                list.push(data.transform);

            } else if (mode === "remove") {

                const removeCell = clickObject.cellName;
                var newChildren = [];

                lineGroup.children.forEach((mesh) => {

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

                lineGroup.children = newChildren;
                list = newList;

            }

        } else if (lineGroup.children.length == 0 && mode === "add") {

            lineGroup.children = lineGroup.children.concat(objectMaker(data).children);

        }

    }

    window.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            data.transform = initialCell;
            list = [initialCell];
            k = 0;
            lineGroup.children = objectMaker(data).children;
        }
    });

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

    document.getElementById("move").addEventListener("click", function () {
        mode = "move";
        // ghostGroup.children = [];
    });

    window.addEventListener("touchend", () => {
        lineGroup.children = objectMaker(data).children;
    }, false);

    document.getElementById("myRangex").oninput = function () {
        thetax = Math.PI * this.value / 50;
    };

    document.getElementById("myRangey").oninput = function () {
        thetay = Math.PI * this.value / 50;
    };

    document.getElementById("myRangez").oninput = function () {
        thetaz = Math.PI * this.value / 50;
    };

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
            updateCellSelector(data.p);
        });

        $("#leftarrow").click(function () {
            data.p = Math.max(data.p - 1, 3);
            updateCellSelector(data.p);
        });

        $(".cellselector").click(function () {
            [q, r] = $(this).attr("id").split("-");
            data.q = Number(q), data.r = Number(r);
            lineGroup.children = objectMaker(data).children;
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

    function typeOfCell(p, q, r) {

        const name = p + "-" + q + "-" + r;

        if (["3-3-3", "3-3-4", "3-3-5", "3-4-3", "4-3-3", "5-3-3"].includes(name)) {

            return "s";

        } else if (name === "4-3-4") {

            return "e";

        } else {

            const qr = (q - 2) * (r - 2);

            if (qr < 4) {

                return "h"

            } else if (qr == 4) {

                return "p"

            } else {

                return "u"

            }

        }

    }


}
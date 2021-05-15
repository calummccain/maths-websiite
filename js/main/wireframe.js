import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";
import { typeOfCell } from "../data/geometry-decider.js";

window.onload = main;

function main() {

    var p = 4, q = 3, r = 5;
    var thetax = 0, thetay = 0, thetaz = 0, thetau = 0, thetav = 0, thetaw = 0;
    var invisible = false;
    var intersection = true;
    var geom = {};
    var cellType;

    const canvas = document.getElementById("canvas");

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE5E5E5);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(0, 10, 0);
    camera.up = new THREE.Vector3(0, 0, 1);

    scene.add(camera);

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    var data = {
        p: p,
        q: q,
        r: r,
        truncated: false,
        model: "poincare",
        refinement: 50,
        intersection: intersection,
        invisibleLines: invisible,
        cells: [""],
        numFaces: 200
    }

    geom = objectMaker(data);
    lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

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

    window.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            geom = objectMaker(data);
            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
        }
    });

    window.addEventListener("touchend", () => {
        geom = objectMaker(data);
    }, false);

    document.getElementById("myRangex").oninput = function () {
        thetax = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangey").oninput = function () {
        thetay = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangez").oninput = function () {
        thetaz = Math.PI * this.value / 50;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangeu").oninput = function () {
        thetau = Math.PI * this.value / 50 - Math.PI;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangev").oninput = function () {
        thetav = Math.PI * this.value / 50 - Math.PI;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("myRangew").oninput = function () {
        thetaw = Math.PI * this.value / 50 - Math.PI;
        lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
    };

    document.getElementById("visibleLines").addEventListener("click", function () {
        data.invisibleLines = !data.invisibleLines;
    });

    document.getElementById("intersection").addEventListener("click", function () {
        data.intersection = !data.intersection;
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
            updateCellSelector(data.p);
        });

        $("#leftarrow").click(function () {
            data.p = Math.max(data.p - 1, 3);
            updateCellSelector(data.p);
        });

        $(".cellselector").click(function () {
            [q, r] = $(this).attr("id").split("-");
            data.q = Number(q), data.r = Number(r);
            geom = objectMaker(data);
            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];
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
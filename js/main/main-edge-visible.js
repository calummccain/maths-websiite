import * as THREE from "../three-bits/three.module.js";
import { OrbitControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";
import { SVGRenderer } from "../three-bits/SVGRenderer.js";

window.onload = main;

function main() {

    var p = 5, q = 3, r = 3;
    var thetax = 0, thetay = 0, thetaz = 0;
    var invisible = false;
    var intersection = true;
    var geom = {};

    const canvas = document.getElementById("c");

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new SVGRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

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
        model: "uhp",
        refinement: 50,
        intersection: intersection,
        invisibleLines: invisible,
        transform: "",
        position: [0, 0, 0],
        cells: ["d"]
    }

    geom = objectMaker(data);

    lineGroup.children = [geom(thetax, thetay, thetaz, camera.position.toArray())];

    // const geometry = new THREE.SphereBufferGeometry(2, 64, 64);
    // const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 0.5, transparent: true });
    // const sphere1 = new THREE.Mesh(geometry, material1);
    // sphere1.position.set(-1,-1,-1);
    // scene.add(sphere1);

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

    function ExportToSVG(filename) {
        var XMLS = new XMLSerializer();
        var svgfile = XMLS.serializeToString(renderer.domElement);

        var svgData = svgfile;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            geom = objectMaker(data);
            lineGroup.children = [geom(thetax, thetay, thetaz, camera.position.toArray())];
        }
    });

    window.addEventListener("touchend", () => {
        geom = objectMaker(data);
        lineGroup.children = [geom(thetax, thetay, thetaz, camera.position.toArray())];
    }, false);

    document.getElementById("svg").addEventListener("click", function () {
        ExportToSVG(p + "-" + q + "-" + r + ".svg");
    });

    document.getElementById("myRangep").oninput = function () {
        data.p = this.value;
    };

    document.getElementById("myRangeq").oninput = function () {
        data.q = this.value;
    };

    document.getElementById("myRanger").oninput = function () {
        data.r = this.value / 2;
    };

    document.getElementById("myRangex").oninput = function () {
        thetax = Math.PI * this.value / 50;
    };

    document.getElementById("myRangey").oninput = function () {
        thetay = Math.PI * this.value / 50;
    };

    document.getElementById("myRangez").oninput = function () {
        thetaz = Math.PI * this.value / 50;
    };

    document.getElementById("visibleLines").addEventListener("click", function () {
        data.invisibleLines = !data.invisibleLines;
    });

    document.getElementById("intersection").addEventListener("click", function () {
        data.intersection = !data.intersection;
    });

}
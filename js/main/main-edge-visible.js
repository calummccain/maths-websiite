import * as THREE from "../three-bits/three.module.js";
import { MapControls } from "../three-bits/orbit-controls.js";
import { objectMaker } from "./object-maker.js";
import { SVGRenderer } from "../three-bits/SVGRenderer.js";

window.onload = main;

function main() {

    var p = 3, q = 7, r = 3;
    var thetax = 0, thetay = 0, thetaz = 0;
    var invisible = true;
    var intersection = false;
    var geom = {};

    const canvas = document.getElementById("c");


    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new SVGRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 0);
    canvas.appendChild(renderer.domElement)

    // renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xEEEEEE);

    var camera = new THREE.PerspectiveCamera(70, WIDTH, HEIGHT, 0.1, 100);
    camera.position.set(0, 3, 0);
    camera.lookAt(0, 0, 0);

    scene.add(camera)

    var controls = new MapControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    const light = new THREE.HemisphereLight(0xFFFFFF, 0x333333, 1);
    // light.position.set(0, 2, 0);
    scene.add(light);

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    geom = objectMaker({
        name: "{" + p + "," + q + "," + r + "}",
        model: "uhp",
        refinement: 1,
        intersection: intersection,
        invisibleLines: invisible,
        transform: "",
        position: [0, 0, 0]
    });
    lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    // geom(thetax, thetay, thetaz, camera.position.toArray()).children.forEach((kid) => { console.log(kid.geometry.attributes.position.array) })
    console.log(lineGroup);
    // console.log(scene)

    render();
    //return;

    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {

        WIDTH = canvas.clientWidth;
        HEIGHT = canvas.clientHeight;

        renderer.setSize(WIDTH, HEIGHT);

    }

    function render() {

        requestAnimationFrame(render);

        renderer.render(scene, camera);

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

    document.getElementById("svg").addEventListener("click", function () {
        ExportToSVG("test.svg");
    });

    document.getElementById("myRangep").oninput = function () {
        p = this.value / 2;
        geom = objectMaker({ name: "{" + p + "," + q + "," + r + "}", model: "uhp", refinement: 10, intersection: intersection, invisibleLines: invisible, transform: "", position: [0, 0, 0] });
        lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    }

    document.getElementById("myRangeq").oninput = function () {
        q = this.value / 2;
        geom = objectMaker({ name: "{" + p + "," + q + "," + r + "}", model: "uhp", refinement: 10, intersection: intersection, invisibleLines: invisible, transform: "", position: [0, 0, 0] });
        lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    }

    document.getElementById("myRanger").oninput = function () {
        r = this.value / 2;
        geom = objectMaker({ name: "{" + p + "," + q + "," + r + "}", model: "uhp", refinement: 10, intersection: intersection, invisibleLines: invisible, transform: "", position: [0, 0, 0] });
        lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    }

    document.getElementById("myRangex").oninput = function () {
        thetax = Math.PI * this.value / 10;
        lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    }

    document.getElementById("myRangey").oninput = function () {
        thetay = Math.PI * this.value / 10;
        lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    }

    document.getElementById("myRangez").oninput = function () {
        thetaz = Math.PI * this.value / 10;
        lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    }

    document.getElementById("visibleLines").addEventListener("click", function () {
        invisible = !invisible;
        geom = objectMaker({ name: "{" + p + "," + q + "," + r + "}", model: "uhp", refinement: 10, intersection: intersection, invisibleLines: invisible, transform: "", position: [0, 0, 0] });
        lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    });

    document.getElementById("intersection").addEventListener("click", function () {
        intersection = !intersection;
        geom = objectMaker({ name: "{" + p + "," + q + "," + r + "}", model: "uhp", refinement: 10, intersection: intersection, invisibleLines: invisible, transform: "", position: [0, 0, 0] });
        lineGroup = geom(thetax, thetay, thetaz, camera.position.toArray());
    });

}
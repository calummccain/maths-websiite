// ========================================================
// main for the wireframe viewer
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
import { SVGRenderer } from "../three-bits/SVGRenderer.js";

window.onload = main;

function main() {

    var thetax = 0, thetay = 0, thetaz = 0, thetau = 0, thetav = 0, thetaw = 0;
    var geom = {};
    var metricValues = {};

    const canvas = document.getElementById("canvas");

    var WIDTH = canvas.clientWidth;
    var HEIGHT = canvas.clientHeight;

    var renderer = new SVGRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE5E5E5);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.01, 100);
    camera.position.set(0, 10, 0);
    camera.up = new THREE.Vector3(0, 0, 1);

    scene.add(camera);

    var controls = new OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.update();

    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const n_max = 13;

    var data = {
        p: 4,
        q: 3,
        r: 3,
        modifier: "",
        view: "wireframe",
        model: "poincare",
        refinement: 50,
        invisibleLines: false,
        cells: [""],
        numFaces: 50,
        position: [0, 0, 0]
    };

    // const geometry1 = new THREE.SphereBufferGeometry(0.1949, 64, 64);
    // const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 0.5, transparent: true });
    // const sphere1 = new THREE.Mesh(geometry1, material1);
    // sphere1.position.set(0.613, 0.304, 0.754);
    // scene.add(sphere1);

    // const geometry2 = new THREE.SphereBufferGeometry(1, 64, 64);
    // const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff, opacity: 0.3, transparent: true });
    // const sphere2 = new THREE.Mesh(geometry2, material2);
    // sphere2.position.set(0, 0, 0);


    // scene.add(sphere1, sphere2);

    [geom, metricValues] = objectMaker(data);

    const dotColours = {
        "s": "#BCE784",
        "e": "#5DD39E",
        "h": "#348AA7",
        "p": "#525174",
        "u": "#513B56"
    }

    updateMetricBar();

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

            [geom, metricValues] = objectMaker(data);
            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

        }

    });

    window.addEventListener("touchend", () => {
        [geom, metricValues] = objectMaker(data);
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

    document.getElementById("model").addEventListener("click", function () {
        data.model = (data.model === "uhp") ? "poincare" : "uhp";
    });

    $(document).ready(function () {

        updateCellSelector();

        $("#pqr").click(function () {

            $("#pqrselector").toggle();

        });

        $(".cellselector").click(function () {

            var [p, q, modifier] = $(this).attr("id").split("-");
            data.p = Number(p), data.q = Number(q), data.modifier = modifier;
            [geom, metricValues] = objectMaker(data);

            updateMetricBar();

            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

        });

        $(".metricNumber").hover(function () {

            $(this).css({
                "width": "20px",
                "height": "20px",
                "z-index": "16"
            });


        }, function () {

            $(this).css({
                "width": "10px",
                "height": "10px",
                "z-index": "15",
            });

        });

        $(".metricNumber").click(function () {

            if (!(isNaN(parseInt($(this).attr("id"))))) {

                data.r = parseInt($(this).attr("id"))

            } else {

                data.r = metricValues[$(this).attr("id")[0]]

            }

            [geom, metricValues] = objectMaker(data);
            lineGroup.children = [geom(thetax, thetay, thetaz, thetau, thetav, thetaw, camera.position.toArray())];

        });

    });

    const cellColours = {
        "s": "#FFD2BC",
        "e": "#F9AAAA",
        "h": "#DB6D98"
    }

    function updateCellSelector() {

        const spherical = ["3,3", "3,4", "3,5", "4,3", "5,3"];
        const euclidean = ["3,6", "4,4", "6,3"]

        for (var p = 3; p <= 8; p++) {

            for (var q = 3; q <= 8; q++) {

                if (spherical.includes(p + "," + q)) {

                    document.getElementById(p + "-" + q + "-").style.backgroundColor = cellColours["s"];

                } else if (euclidean.includes(p + "," + q)) {

                    document.getElementById(p + "-" + q + "-").style.backgroundColor = cellColours["e"];

                } else {

                    document.getElementById(p + "-" + q + "-").style.backgroundColor = cellColours["h"];

                }

                document.getElementById(p + "-" + q + "-").innerHTML = "{" + p + "," + q + "}";


            }

        }

        [[3, 3], [3, 4], [3, 5], [4, 3], [5, 3]].forEach(([p, q]) => {

            ["t", "r"].forEach((affix) => {

                document.getElementById(p + "-" + q + "-" + affix).innerHTML = affix + "{" + p + "," + q + "}";
                document.getElementById(p + "-" + q + "-" + affix).style.backgroundColor = cellColours["s"];

            })

        })

    }

    function updateMetricBar() {

        document.getElementById("s").style.width = (Math.max(2, metricValues["e"]) - 2) / (n_max - 2) * 100 + "%";
        document.getElementById("h").style.width = (Math.min(n_max, metricValues["p"]) - 2) / (n_max - 2) * 100 + "%";

        for (var i = 3; i < n_max; i++) {

            document.getElementById(i.toString()).style.left = (i - 2) / (n_max - 2) * 100 + "%";

            (i < metricValues["e"]) ?
                document.getElementById(i.toString()).style.backgroundColor = dotColours["s"] :
                (i == metricValues["e"]) ?
                    document.getElementById(i.toString()).style.backgroundColor = dotColours["e"] :
                    (i < metricValues["p"]) ?
                        document.getElementById(i.toString()).style.backgroundColor = dotColours["h"] :
                        (i == metricValues["p"]) ?
                            document.getElementById(i.toString()).style.backgroundColor = dotColours["p"] :
                            document.getElementById(i.toString()).style.backgroundColor = dotColours["u"]

        }

        document.getElementById("euclidean").style.backgroundColor = dotColours["e"];
        document.getElementById("paracompact").style.backgroundColor = dotColours["p"];

        if (!(Number.isInteger(metricValues["e"])) && metricValues["e"] > 2) {

            document.getElementById("euclidean").style.display = "block";
            document.getElementById("euclidean").style.left = (metricValues["e"] - 2) / (n_max - 2) * 100 + "%";

        } else {

            document.getElementById("euclidean").style.display = "none";

        }

        if (!(Number.isInteger(metricValues["p"])) && isFinite(metricValues["p"])) {

            document.getElementById("paracompact").style.display = "block";
            document.getElementById("paracompact").style.left = (metricValues["p"] - 2) / (n_max - 2) * 100 + "%";

        } else {

            document.getElementById("paracompact").style.display = "none";

        }

    }

}
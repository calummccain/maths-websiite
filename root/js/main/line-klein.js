import * as THREE from "../three.module.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";

var scene, camera, renderer;
var objects = [];

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function init(n, transforms, s, matrixDict, vertices, center, f, lines) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    //scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

    //var light = new THREE.DirectionalLight(0xffffff, 0.5);
    //light.position.set(1, -1, 1);
    //scene.add(light);

    initObjects(n, transforms, s, matrixDict, vertices, center, f, lines);
    initCamera();
    initRenderer();

    document.body.appendChild(renderer.domElement);

}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(1, 1, 1);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
}

// Input an array of transformations and resolution of faces n
// transformations must be strings made up of a b c d 
// the number of small triangular faces per hyperbolic face scales as O(2^(2n+1))

function initObjects(n, transforms, s, matrixDict, vertices, center, f, lines) {

    // loop over the each transformation in transformation array

    for (var m = 0; m < transforms.length; m++) {

        // define a material for cell corresponding to transformation
        // colour is defined through HSL

        var material = new THREE.LineBasicMaterial({

            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.8),
            linewidth: 5, // in pixels
            //colour: 0xffffff

        });

        // convert word to matrix transformation

        var transform = HF.wordToTransform(transforms[m], matrixDict);

        // transform the vertices of the base cell to the new coordinates - still in modified coordinates

        var newVertices = HF.transformVertices(vertices, transform);

        // put the vertices in the klein model

        var kleinVertices = [];

        for (var i = 0; i < newVertices.length; i++) {

            kleinVertices[i] = [HF.hyperboloidToKlein(VF.transpose(VF.matrixMultiplication(f, VF.transpose(newVertices[i]))))];

        }

        // transform center of cell
        var newCenter = HF.transformVertices([center], transform);
        var kleinCenter = [HF.hyperboloidToKlein(VF.transpose(VF.matrixMultiplication(f, VF.transpose(newCenter[0]))))];

        // loop over the lines

        for (var i = 0; i < lines.length; i++) {

            var points = []

            for (var j = 0; j <= n; j++) {

                var kleinPoint = VF.vectorSum(
                    VF.vectorScale(
                        VF.vectorSum(
                            VF.vectorScale(kleinVertices[lines[i][0]], j / n),
                            VF.vectorScale(kleinVertices[lines[i][1]], 1 - j / n)
                        ), 1 - s),
                    VF.vectorScale(kleinCenter, s)
                );

                var poincarePoint = HF.kleinToPoincare(kleinPoint);
                //alert(poincarePoint[0])
                points[j] = new THREE.Vector3(poincarePoint[0][0], poincarePoint[0][1], poincarePoint[0][2]);

            }

            var geometry = new THREE.BufferGeometry().setFromPoints(points);
            var line = new THREE.Line(geometry, material);

            scene.add(line);
            objects[i + m * lines.length] = line;

        }
    }
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

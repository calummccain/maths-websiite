import * as THREE from "../three.module.js";
import * as HF from "../maths-functions/hyperbolic-functions.js";
import * as VF from "../maths-functions/vector-functions.js";
import * as TRI from "../faces/klein-triangle-faces.js";
import * as QUAD from "../faces/klein-square-faces.js";
import * as PENT from "../faces/klein-pentagon-faces.js";

var scene, camera, renderer;
var objects = [];

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init(n, transforms, opacityValue, s, matrixDict, vertices, center, f, faces, faceType) {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, -1, 1);
    scene.add(light);

    initObjects(n, transforms, opacityValue, s, matrixDict, vertices, center, f, faces, faceType);

    initCamera();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, -2, 1);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

// Input an array of transformations and resolution of faces n
// transformations must be strings made up of a b c d 
// the number of small triangular faces per hyperbolic face scales as O(2^(2n+1))

function initObjects(n, transforms, opacityValue, s, matrixDict, vertices, center, f, faces, faceType) {

    // loop over the each transformation in transformation array

    for (var m = 0; m < transforms.length; m++) {

        // define a material for cell corresponding to transformation
        // colour is defined through HSL
        // transparency turn on/off - transparent
        // can change opacity too

        var material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.8),
            roughness: 0.5,
            metalness: 0,
            flatShading: true,
            opacity: opacityValue,
            transparent: true
        });

        // convert word to  matrix transformation

        var transform = HF.wordToTransform(transforms[m], matrixDict);

        // transform the vertices of the base cell to the new coordinates - still in modified coordinates

        var newVertices = HF.transformVertices(vertices, transform);

        // put the vertices in the klein model

        var kleinVertices = [];

        for (var i = 0; i < newVertices.length; i++){
            
            kleinVertices[i] = [HF.hyperboloidToKlein(VF.transpose(VF.matrixMultiplication(f, VF.transpose(newVertices[i]))))];

        }

        // transform center of cell
        var newCenter = HF.transformVertices([center], transform);
        var kleinCenter = [HF.hyperboloidToKlein(VF.transpose(VF.matrixMultiplication(f, VF.transpose(newCenter[0]))))];

        // loop over the faces listed to generate mesh

        for (var i = 0; i < faces.length; i++) {

            var geometry = new THREE.Geometry();
            var faceData;

            // faceData consists of two arrays - coordinates of mesh vertices in hyperbolic space and which 
            // vertices correspond to each face
            //
            // The coordinates are originally in the form of a row vector so transposes are required as well 
            // as multiplication by the f matrix to get them into the standard coordinates

            if (faceType === "triangle") {

                faceData = TRI.kleinFace(
                    kleinVertices[faces[i][0]],
                    kleinVertices[faces[i][1]],
                    kleinVertices[faces[i][2]],
                    n
                );

            } else if (faceType === "square") {

                faceData = QUAD.kleinFace(
                    kleinVertices[faces[i][0]],
                    kleinVertices[faces[i][1]],
                    kleinVertices[faces[i][2]],
                    kleinVertices[faces[i][3]],
                    n
                );

            } else if (faceType === "pentagon") {

                faceData = PENT.kleinFace(
                    kleinVertices[faces[i][0]],
                    kleinVertices[faces[i][1]],
                    kleinVertices[faces[i][2]],
                    kleinVertices[faces[i][3]],
                    kleinVertices[faces[i][4]],
                    n
                );

            }

            // facets is the list of small trianglular faces that make up the mesh and which vertices make them up 

            var facets = faceData[0];
            var hyperboloidVertices = faceData[1];

            // transform the vertices to the appropriate model - poincare disk or hyperboloid model
            // scale them to the center
            // add them to the geometry

            for (var j = 0; j < hyperboloidVertices.length; j++) {

                var vertex = HF.kleinToPoincare(hyperboloidVertices[j]);
                var vertex2 = VF.vectorSum(VF.vectorScale(vertex, 1 - s), VF.vectorScale(kleinCenter, s));
                geometry.vertices.push(new THREE.Vector3(vertex2[0][0], vertex2[0][1], vertex2[0][2]));

            }

            // add the facets to the geometry

            for (var k = 0; k < facets.length; k++) {

                var facetPiece = facets[k];
                geometry.faces.push(new THREE.Face3(facetPiece[(transforms[m].length) % 2], facetPiece[2], facetPiece[(transforms[m].length + 1) % 2]));
                //geometry.faces.push(new THREE.Face3(facetPiece[1], facetPiece[2], facetPiece[0]));
            
            }

            // If you want face normal coloured shape uncomment out this and comment out colour block upstairs

            //geometry.computeFaceNormals();
            //var material = new THREE.MeshNormalMaterial({ color: 0x999999 });

            // make mesh and add it to the scene and list of objects and optimise geometry

            geometry.mergeVertices();

            var curvedFace = new THREE.Mesh(geometry, material);
            scene.add(curvedFace);
            objects[i + faces.length * m] = curvedFace;

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

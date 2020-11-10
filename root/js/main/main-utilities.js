import * as THREE from "../three.module.js";

function addCellToScene(params) {

    var geometryFunction = params.geometryFunction;
    var scene = params.scene;
    var metric = params.metric || "spherical";
    var refinement = params.refinement || 3;
    var cell = params.cell || 0;
    var opacityValue = params.opacity || 1;
    var d = params.d || 1;
    var transform = params.transform || "";
    var order = params.order || 0;
    var compact = params.compact || "compact";
    var colour = params.colour || "normal";
    var numberofFaces = params.numberOfFaces || 0;
    var x = params.x || 0;
    var y = params.y || 0;
    var z = params.z || 0;

    var shapeGeometry;

    if (metric === "spherical") {

        var d = 1;

        shapeGeometry = geometryFunction(refinement, cell, d);

        console.log(shapeGeometry[0].faces);

    } else if (metric === "euclidean") {

        // TODO

    } else if (metric === "hyperbolic") {

        shapeGeometry = geometryFunction(transform, order, refinement, compact);

    } else {

        console.log("I don't know what you've done but this ain't it");

    }

    for (var j = 0; j < numberofFaces; j++) {

        if (colour === "normal") {

            shapeGeometry[j].computeVertexNormals();
            var faceMesh = new THREE.Mesh(
                shapeGeometry[j],
                new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                    //wireframe: true,
                    //wireframeLineWidth: 2
                }));

        } else {

            var faceMesh = new THREE.Mesh(
                shapeGeometry[j],
                new THREE.MeshStandardMaterial({
                    color: new THREE.Color(colour),
                    roughness: 0.5,
                    metalness: 0,
                    flatShading: true,
                    opacity: opacityValue,
                    transparent: true,
                    side: THREE.DoubleSide
                }));

        }

        faceMesh.position.set(x, y, z);

        scene.add(faceMesh);

    }

}

function onWindowResize(camera, renderer, div) {

    console.log(div.clientHeight, div.clientWidth)

    camera.aspect = div.clientWidth / div.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(div.clientWidth, div.clientHeight);

}

function render() {

    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);

}

function onDocumentMouseMove(event, mouse, raycaster, camera, scene, INTERSECTED) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) {
                INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            }
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
        }
    } else {
        if (INTERSECTED) {
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        }
        INTERSECTED = null;
    }

    return INTERSECTED;

}

function onDocumentMouseClick(refinement, opacityValue, order, scale, geometryFunction, numberofFaces, specialLetter, mouse, raycaster, camera, scene, compact) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

        var [face, cell] = intersects[0].object.geometry.name;

        console.log(face);
        console.log(cell);
        console.log(intersects[0].object.geometry.name);

        addCellToScene(
            refinement,
            opacityValue,
            order,
            cell + face + specialLetter,
            scale,
            geometryFunction,
            numberofFaces,
            scene,
            compact,
            0, 0, 0);
            
    }

}

export {
    render,
    addCellToScene,
    onDocumentMouseClick,
    onDocumentMouseMove,
    onWindowResize
};

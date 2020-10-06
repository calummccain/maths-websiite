import * as THREE from "../three.module.js";

function addCellToScene(
    refinement,
    opacityValue,
    order,
    transform,
    geometryFunction,
    numberofFaces,
    scene,
    compact,
    x, y, z
) {

    var col = Math.random();

    var shapeGeometry = geometryFunction(transform, order, refinement, compact);

    for (var j = 0; j < numberofFaces; j++) {

        //shapeGeometry[j].computeVertexNormals();
        var faceMesh = new THREE.Mesh(
            shapeGeometry[j],
            new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(col, 0.6, 0.7),
                roughness: 0.5,
                metalness: 0,
                flatShading: true,
                opacity: opacityValue,
                transparent: true,
                side: THREE.DoubleSide
            }));

        // shapeGeometry[j].computeVertexNormals();
        // var faceMesh = new THREE.Mesh(
        //     shapeGeometry[j],
        //     new THREE.MeshNormalMaterial({ 
        //         color: 0x7777ff, 
        //         side: THREE.DoubleSide
        //         //wireframe: true,
        //         //wireframeLineWidth: 2
        //     }));

        // var faceMesh = new THREE.Mesh(
        //     shapeGeometry[j],
        //     new THREE.MeshToonMaterial({
        //         color: new THREE.Color().setHSL(col, 0.6, 0.7),
        //         roughness: 0.5,
        //         metalness: 0,
        //         flatShading: true,
        //         opacity: opacityValue,
        //         transparent: true,
        //         side: THREE.DoubleSide
        //     }));

        faceMesh.position.set(x, y, z);

        scene.add(faceMesh);

    }

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
            0, 0, 0)
    }

}

export {
    render,
    addCellToScene,
    onDocumentMouseClick,
    onDocumentMouseMove
};

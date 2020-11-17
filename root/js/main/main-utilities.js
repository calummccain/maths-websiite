import * as THREE from "../three.module.js";

function addCellToGroup(params) {

    var geometryFunction = params.geometryFunction;
    var group = params.group;
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
    var position = params.position || [0, 0, 0];
    var name = params.name || "";
    var faceMode = params.faceMode || false;

    var shapeGeometry;

    if (metric === "spherical") {

        var d = 1;

        shapeGeometry = geometryFunction(refinement, cell, d);

    } else if (metric === "euclidean") {

        shapeGeometry = new THREE.BoxGeometry(1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3));

    } else if (metric === "hyperbolic") {

        shapeGeometry = geometryFunction(transform, order, refinement, compact);

    } else {

        console.log("I don't know what you've done but this ain't it - please enter \"spherical\" or \"euclidean\" or \"hyperbolic\"");

    }

    // faceMode keeps the faces as seperate meshes (and hence seperate objects)
    // without faceMode the polyhedron is made as one mesh/object and the individual faces cannot be selected by ray-casting
    if (faceMode) {

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

            faceMesh.position.set(position[0], position[1], position[2]);
            faceMesh.name = name;

            group.add(faceMesh);

        }

    } else {

        if (metric === "euclidean") {

            if (colour === "normal") {

                shapeGeometry.computeVertexNormals();
                var cellMesh = new THREE.Mesh(
                    shapeGeometry,
                    new THREE.MeshNormalMaterial({
                        side: THREE.DoubleSide
                        //wireframe: true,
                        //wireframeLineWidth: 2
                    }));

            } else {

                var cellMesh = new THREE.Mesh(
                    shapeGeometry,
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

            cellMesh.position.set(position[0], position[1], position[2]);
            cellMesh.name = name;

            group.add(cellMesh);

        } else {

            var cellGeometry = new THREE.Geometry();

            for (var j = 0; j < numberofFaces; j++) {

                cellGeometry.merge(shapeGeometry[j]);

            }

            if (colour === "normal") {

                cellGeometry.computeVertexNormals();
                var cellMesh = new THREE.Mesh(
                    cellGeometry,
                    new THREE.MeshNormalMaterial({
                        side: THREE.DoubleSide
                        //wireframe: true,
                        //wireframeLineWidth: 2
                    }));

            } else {

                var cellMesh = new THREE.Mesh(
                    cellGeometry,
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

            cellMesh.position.set(position[0], position[1], position[2]);
            cellMesh.name = name;

            group.add(cellMesh);

        }

    }

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

export {
    addCellToGroup,
    onDocumentMouseMove
};

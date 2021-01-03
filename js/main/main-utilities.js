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

    var shapeGeometry, faceReflections;

    if (metric === "spherical") {

        var d = 1;

        shapeGeometry = geometryFunction(refinement, cell, d);

    } else if (metric === "euclidean") {

        shapeGeometry = new THREE.BoxGeometry(1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3));

    } else if (metric === "hyperbolic") {

        [shapeGeometry, faceReflections] = geometryFunction(transform, order, refinement, compact);

    } else {

        console.log("Please enter \"spherical\" or \"euclidean\" or \"hyperbolic\"");

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
            faceMesh.cellName = transform;
            faceMesh.name = name;
            faceMesh.faceName = faceReflections[j];
            faceMesh.params = params;

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
                cellGeometry.computeFaceNormals();
                var cellMesh = new THREE.Mesh(
                    cellGeometry,
                    new THREE.MeshLambertMaterial({
                        color: new THREE.Color(colour),
                        //roughness: 0,
                        //metalness: 0,
                        // wireframe: true,
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

function removeCellFromGroup(cellName, group) {

    var newChilren = [];
    group.children.forEach(element => {
        if (element.cellName !== cellName) {
            newChilren.push(element);
        }
    });
    group.children = newChilren;

}

export {
    addCellToGroup,
    removeCellFromGroup
};

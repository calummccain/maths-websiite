import * as THREE from "../three.module.js";

function addCellToGroup(params) {

    var geometryFunction = params.geometryFunction;
    var group = params.group;
    var refinement = params.refinement || 3;
    var order = params.order || 0;
    var opacityValue = params.opacity || 1;
    var transform = params.transform || "";
    var colour = params.colour || "#" + Math.floor(Math.random() * 16777215).toString(16);
    var position = params.position || [0, 0, 0];
    var name = params.name || "";
    var faceMode = params.faceMode || false;
    var model = params.model || "";

    var shapeGeometry, faceReflections, numberofFaces;

    [shapeGeometry, faceReflections, numberofFaces] = geometryFunction(transform, order, refinement, model);

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

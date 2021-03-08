import * as THREE from "../three.module.js";
import * as GM from "../geometries/geometry-maker.js";

import { tetrahedronData } from "../data/33n.js";
import { octahedronData } from "../data/34n.js";
import { icosahedronData } from "../data/35n.js";
import { cubeData } from "../data/43n.js";
import { dodecahedronData } from "../data/53n.js";
import { hexagonData } from "../data/63n.js";
import { squareData } from "../data/44n.js";
import { triangleData } from "../data/36n.js";
import { pqrData } from "../data/pqr.js";

const geom = {
    "{3,3}": tetrahedronData,
    "{3,4}": octahedronData,
    "{3,5}": icosahedronData,
    "{3,6}": triangleData,
    "{4,3}": cubeData,
    "{4,4}": squareData,
    "{5,3}": dodecahedronData,
    "{6,3}": hexagonData
};

function objectMaker(parameters) {

    const name = parameters.name;
    const position = parameters.position;

    const [p, q, r] = [
        parseInt(name.split(",")[0].replace("{", "")),
        parseInt(name.split(",")[1]),
        parseInt(name.split(",")[2].replace("}", ""))
    ];

    const data = (!("{" + p + "," + q + "}" in geom)) ? pqrData(p, q, r) : geom["{" + p + "," + q + "}"](r);
    const shapeGeometry = GM.honeycombGeometry(data, parameters.transform, parameters.refinement, parameters.model);

    if (parameters.faceMode) {

        for (var j = 0; j < data.numFaces; j++) {

            var faceMesh = new THREE.Mesh(
                shapeGeometry[j],
                new THREE.MeshLambertMaterial({
                    color: new THREE.Color(parameters.colour),
                    opacity: 1,
                    transparent: true,
                    side: THREE.DoubleSide
                }));

            faceMesh.position.set(position[0], position[1], position[2]);
            faceMesh.cellName = parameters.transform;
            faceMesh.name = name;
            faceMesh.faceName = data.faceReflections[j];
            faceMesh.parameters = parameters;
            faceMesh.geometry.computeVertexNormals();

            // RETURN WHAT???

        }

    } else {

        var cellGeometry = new THREE.Geometry();

        for (var j = 0; j < data.numFaces; j++) {

            cellGeometry.merge(shapeGeometry[j]);

        }

        var cellMesh = new THREE.Mesh(
            cellGeometry,
            new THREE.MeshLambertMaterial({
                color: new THREE.Color(parameters.colour),
                opacity: 1,
                transparent: true,
                side: THREE.DoubleSide
            }));

        cellMesh.position.set(position[0], position[1], position[2]);
        cellMesh.name = name;
        cellMesh.geometry.computeVertexNormals();

        return cellMesh;

    }

}

export { objectMaker };
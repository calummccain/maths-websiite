import * as CXX from "../data/polychorons/120-cell.js";
import * as GEOM from "./spherical-geometry.js";
import * as LOAD from "../load-data.js";

console.log("hello calum");
console.log(LOAD.loadJSON("/root/js/data/polychorons/json-data/120-data.json"));
console.log("no problems?");

function cxxCellGeometry(refinement, cellName, d) {

    var cellFaceDict = CXX.cellFaceDict;
    var vertexDict = CXX.vertexDict;
    var faceDict = CXX.faceDict;

    var dodecahedron = GEOM.sphericalGeometry(cellName, cellFaceDict, vertexDict, refinement, d,  5, faceDict);

    return dodecahedron;
}

export { cxxCellGeometry };
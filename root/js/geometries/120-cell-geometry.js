import * as CXX from "../data/polychorons/120-cell.js";
import * as GEOM from "./spherical-geometry.js";

function cxxCellGeometry(refinement, cellName, d) {

    var cellFaceDict = CXX.cellFaceDict;
    var vertexDict = CXX.vertexDict;
    var faceDict = CXX.faceDict;

    var dodecahedron = GEOM.sphericalGeometry(cellName, cellFaceDict, vertexDict, refinement, d,  5, faceDict);

    return dodecahedron;
}

export { cxxCellGeometry };
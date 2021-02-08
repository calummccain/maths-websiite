import { main, addDataToView } from "./main/main-edge-visible.js";
import { tetrahedronData } from "./data/33n.js";
import { cubeData } from "./data/43n.js";
import { octahedronData } from "./data/34n.js";
import { dodecahedronData } from "./data/53n.js";
import { icosahedronData } from "./data/35n.js";
import { hexagonData } from "./data/63n.js";
import { triangleData } from "./data/36n.js";
import { squareData } from "./data/44n.js";
import { testData } from "./data/test-data.js";

const n = 7;

main();

window.onload = function () {
    document.getElementById("tetrahedronButton").addEventListener("click", function () {
        addDataToView(tetrahedronData(n));
    });
    document.getElementById("cubeButton").addEventListener("click", function () {
        addDataToView(cubeData(n));
    });
    document.getElementById("octahedronButton").addEventListener("click", function () {
        addDataToView(octahedronData(n));
    });
    document.getElementById("dodecahedronButton").addEventListener("click", function () {
        addDataToView(dodecahedronData(n));
    });
    document.getElementById("icosahedronButton").addEventListener("click", function () {
        addDataToView(icosahedronData(n));
    });
    document.getElementById("hexagonButton").addEventListener("click", function () {
        addDataToView(hexagonData(n));
    });
    document.getElementById("triangleButton").addEventListener("click", function () {
        addDataToView(triangleData(n));
    });
    document.getElementById("squareButton").addEventListener("click", function () {
        addDataToView(squareData(n));
    });
    document.getElementById("testButton").addEventListener("click", function () {
        addDataToView(testData());
    });
}
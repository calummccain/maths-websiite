import { main } from "./main/main-edge-visible.js";
import { tetrahedronData } from "./data/33n.js";
import { cubeData } from "./data/43n.js";
import { octahedronData } from "./data/34n.js";
import { dodecahedronData } from "./data/53n.js";
import { icosahedronData } from "./data/35n.js";
import { hexagonData } from "./data/63n.js";
import { triangleData } from "./data/36n.js";
import { squareData } from "./data/44n.js";

const n = 3; 

window.onload = function () {
    document.getElementById("tetrahedronButton").addEventListener("click", function () {
        main(tetrahedronData(n));
    });
    document.getElementById("cubeButton").addEventListener("click", function () {
        main(cubeData(n));
    });
    document.getElementById("octahedronButton").addEventListener("click", function () {
        main(octahedronData(n));
    });
    document.getElementById("dodecahedronButton").addEventListener("click", function () {
        main(dodecahedronData(n));
    });
    document.getElementById("icosahedronButton").addEventListener("click", function () {
        main(icosahedronData(n));
    });
    document.getElementById("hexagonButton").addEventListener("click", function () {
        main(hexagonData(n));
    });
    document.getElementById("triangleButton").addEventListener("click", function () {
        main(triangleData(n));
    });
    document.getElementById("squareButton").addEventListener("click", function () {
        main(squareData(n));
    });
}
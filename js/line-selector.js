import { main } from "./main/main-edge-visible.js";
import { tetrahedronData } from "./data/33n.js";
import { cubeData } from "./data/43n.js";
import { octahedronData } from "./data/34n.js";
import { dodecahedronData } from "./data/53n.js";
import { icosahedronData } from "./data/35n.js";
import { hexagonData } from "./data/63n.js";
import { triangleData } from "./data/36n.js";
import { squareData } from "./data/44n.js";

// window.onload = function () {
//     var tetrahedronButton = document.getElementsByClassName("tetrahedronButton");
//     tetrahedronButton.setAttribute("onclick", function () {
//         main(tetrahedronData(7));
//         console.log("hi");
//     })
// }
window.onload = function () {
    document.getElementById("tetrahedronButton").addEventListener("click", function () {
        main(tetrahedronData(7));
    });
    document.getElementById("cubeButton").addEventListener("click", function () {
        main(cubeData(7));
    });
    document.getElementById("octahedronButton").addEventListener("click", function () {
        main(octahedronData(7));
    });
    document.getElementById("dodecahedronButton").addEventListener("click", function () {
        main(dodecahedronData(7));
    });
    document.getElementById("icosahedronButton").addEventListener("click", function () {
        main(icosahedronData(7));
    });
    document.getElementById("hexagonButton").addEventListener("click", function () {
        main(hexagonData(7));
    });
    document.getElementById("triangleButton").addEventListener("click", function () {
        main(triangleData(7));
    });
    document.getElementById("squareButton").addEventListener("click", function () {
        main(squareData(7));
    });
}



// main(tetrahedronData(7));
// console.log("hi");
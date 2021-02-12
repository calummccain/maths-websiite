import { main, addDataToView, addSpheres, removeSpheres } from "./main/main-edge-visible.js";
import { tetrahedronData } from "./data/33n.js";
import { cubeData } from "./data/43n.js";
import { octahedronData } from "./data/34n.js";
import { dodecahedronData } from "./data/53n.js";
import { icosahedronData } from "./data/35n.js";
import { hexagonData } from "./data/63n.js";
import { triangleData } from "./data/36n.js";
import { squareData } from "./data/44n.js";
import { testData } from "./data/test-data.js";

var n = 6;
var geom;
var spheres = false;

main();

window.onload = function () {
    document.getElementById("tetrahedronButton").addEventListener("click", function () {
        geom = tetrahedronData;
        geometryDraw(geom, n);
    });
    document.getElementById("cubeButton").addEventListener("click", function () {
        geom = cubeData;
        geometryDraw(geom, n);
    });
    document.getElementById("octahedronButton").addEventListener("click", function () {
        geom = octahedronData;
        geometryDraw(geom, n);
    });
    document.getElementById("dodecahedronButton").addEventListener("click", function () {
        geom = dodecahedronData;
        geometryDraw(geom, n);
    });
    document.getElementById("icosahedronButton").addEventListener("click", function () {
        geom = icosahedronData;
        geometryDraw(geom, n);
    });
    document.getElementById("hexagonButton").addEventListener("click", function () {
        geom = hexagonData;
        geometryDraw(geom, n);
    });
    document.getElementById("triangleButton").addEventListener("click", function () {
        geom = triangleData;
        geometryDraw(geom, n);
    });
    document.getElementById("squareButton").addEventListener("click", function () {
        geom = squareData;
        geometryDraw(geom, n);
    });
    document.getElementById("testButton").addEventListener("click", function () {
        geom = (n) => testData(4, n, 5);
        geometryDraw(geom, n);
    });
    document.getElementById("three").addEventListener("click", function () {
        n = 3;
        geometryDraw(geom, n);
    });
    document.getElementById("four").addEventListener("click", function () {
        n = 4;
        geometryDraw(geom, n);
    });
    document.getElementById("five").addEventListener("click", function () {
        n = 5;
        geometryDraw(geom, n);
    });
    document.getElementById("six").addEventListener("click", function () {
        n = 6;
        geometryDraw(geom, n);
    });
    document.getElementById("seven").addEventListener("click", function () {
        n = 7;
        geometryDraw(geom, n);
    });
    document.getElementById("spheres").addEventListener("click", function () {
        spheres = true;
        addSpheres();
    });
    document.getElementById("nospheres").addEventListener("click", function () {
        spheres = false;
        removeSpheres();
    });

}


function geometryDraw(geom, n) {

    addDataToView(geom(n));

    if (spheres) {
        
        addSpheres();

    } else {

        removeSpheres();

    }

}

import { main, addDataToView, addSpheres, removeSpheres } from "./main/main-edge-visible.js";
import { tetrahedronData } from "./data/33n.js";
import { cubeData } from "./data/43n.js";
import { octahedronData } from "./data/34n.js";
import { dodecahedronData } from "./data/53n.js";
import { icosahedronData } from "./data/35n.js";
import { hexagonData } from "./data/63n.js";
import { triangleData } from "./data/36n.js";
import { squareData } from "./data/44n.js";
import { pqrData } from "./data/pqr.js";

var p = 6;
var q = 6;
var r = 6;
var geom;
var spheres = false;
var invisible = false;

main();

window.onload = function () {
    document.getElementById("tetrahedronButton").addEventListener("click", function () {
        geom = tetrahedronData;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("cubeButton").addEventListener("click", function () {
        geom = cubeData;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("octahedronButton").addEventListener("click", function () {
        geom = octahedronData;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("dodecahedronButton").addEventListener("click", function () {
        geom = dodecahedronData;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("icosahedronButton").addEventListener("click", function () {
        geom = icosahedronData;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("hexagonButton").addEventListener("click", function () {
        geom = hexagonData;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("triangleButton").addEventListener("click", function () {
        geom = triangleData;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("squareButton").addEventListener("click", function () {
        geom = squareData;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("testButton").addEventListener("click", function () {
        geom = (r) => pqrData(p, q, r);
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("spheres").addEventListener("click", function () {
        spheres = true;
        addSpheres();
    });
    document.getElementById("nospheres").addEventListener("click", function () {
        spheres = false;
        removeSpheres();
    });
    document.getElementById("invisibleLines").addEventListener("click", function () {
        invisible = true;
        geometryDraw(geom, r, invisible);
    });
    document.getElementById("visibleLines").addEventListener("click", function () {
        invisible = false;
        geometryDraw(geom, r, invisible);
    });

}


function geometryDraw(geom, r, lineMode) {

    addDataToView(geom(r), lineMode);

    if (spheres) {

        addSpheres();

    } else {

        removeSpheres();

    }

}

var slider = document.getElementById("myRange3");
slider.oninput = function () {
    r = this.value / 2;
    geometryDraw(geom, r, invisible);
}

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
var thetax = 0;
var thetay = 0;
var thetaz = 0;
var geom;
var spheres = false;
var invisible = false;
var intersection = true;

main();

window.onload = function () {
    document.getElementById("tetrahedronButton").addEventListener("click", function () {
        geom = (p, q, r) => tetrahedronData(r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("cubeButton").addEventListener("click", function () {
        geom = (p, q, r) => cubeData(r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("octahedronButton").addEventListener("click", function () {
        geom = (p, q, r) => octahedronData(r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("dodecahedronButton").addEventListener("click", function () {
        geom = (p, q, r) => dodecahedronData(r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("icosahedronButton").addEventListener("click", function () {
        geom = (p, q, r) => icosahedronData(r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("hexagonButton").addEventListener("click", function () {
        geom = (p, q, r) => hexagonData(r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("triangleButton").addEventListener("click", function () {
        geom = (p, q, r) => triangleData(r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("squareButton").addEventListener("click", function () {
        geom = (p, q, r) => squareData(r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("pqrButton").addEventListener("click", function () {
        geom = (p, q, r) => pqrData(Math.floor(p), Math.floor(q), r);
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
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
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("visibleLines").addEventListener("click", function () {
        invisible = false;
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("intersection").addEventListener("click", function () {
        intersection = true;
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });
    document.getElementById("nointersection").addEventListener("click", function () {
        intersection = false;
        geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
    });


}


function geometryDraw(geom, p, q, r, lineMode, thetax, thetay, thetaz, intersection) {

    addDataToView(geom(p, q, r), lineMode, thetax, thetay, thetaz, intersection);

    if (spheres) {

        addSpheres();

    } else {

        removeSpheres();

    }

}

var slider = document.getElementById("myRangep");
slider.oninput = function () {
    p = this.value / 2;
    geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
}

var slider = document.getElementById("myRangeq");
slider.oninput = function () {
    q = this.value / 2;
    geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
}

var slider = document.getElementById("myRanger");
slider.oninput = function () {
    r = this.value / 2;
    geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
}

var slider = document.getElementById("myRangex");
slider.oninput = function () {
    thetax = Math.PI * this.value / 50;
    geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
}

var slider = document.getElementById("myRangey");
slider.oninput = function () {
    thetay = Math.PI * this.value / 50;
    geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
}

var slider = document.getElementById("myRangez");
slider.oninput = function () {
    thetaz = Math.PI * this.value / 50;
    geometryDraw(geom, p, q, r, invisible, thetax, thetay, thetaz, intersection);
}

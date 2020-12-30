import * as MAIN from "./main-utilities.js";
import * as THREE from "../three.module.js";
import { OrbitControls } from "../orbit-controls.js";
import * as CONSTANTS from "./main-constants.js";

function main(name, geometry) {

    var view = document.getElementById("view");

    var WIDTH = view.clientWidth;
    var HEIGHT = view.clientHeight;
    var rect = view.getBoundingClientRect();

    // setup scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xDDDDDD);

    // group of meshes
    var meshes = new THREE.Group();
    var ghosts = new THREE.Group();

    // add camera and light to scene
    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);
    camera.position.set(3, 0, 0);
    camera.updateProjectionMatrix();
    camera.add(new THREE.HemisphereLight(0xaaaaaa, 0x555555));

    scene.add(camera);
    scene.add(new THREE.HemisphereLight(0xcccccc, 0x222222));

    // add the main polyhedron to the scene
    MAIN.addCellToGroup({
        geometryFunction: geometry,
        group: meshes,
        metric: CONSTANTS.metric[name],
        refinement: CONSTANTS.individualDefinition,
        order: CONSTANTS.order[name],
        colour: CONSTANTS.colour[name],
        numberOfFaces: CONSTANTS.numberOfFaces[name],
        name: name,
        faceMode: true,
        transform: "",
        compact: CONSTANTS.compact[name]
    });

    // setup the renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    var intersectionObjectName, intersectionObject, clickObjectParams;

    // add controls to the camera
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enabled = true;
    controls.minZoom = 1;
    controls.maxZoom = 5;
    controls.update();


    // add a raycaster to the scene for object selection
    var raycaster = new THREE.Raycaster(), mouseVector = new THREE.Vector2();

    // add the meshes to the scene
    scene.add(meshes);
    scene.add(ghosts);

    // add some event listeners
    window.addEventListener("click", onMouseClick, false);
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("touchend", touchEnd, false);

    // add the renderer to the 'view' div
    view.appendChild(renderer.domElement);

    render();

    // click Object is the object clicked by the user
    var clickObject = "";

    function render() {

        requestAnimationFrame(render);

        renderer.render(scene, camera);

    }

    function onMouseClick(event) {

        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(meshes.children);
        if (intersects.length != 0) {
            var obj = intersects[0].object;
            document.getElementById("content1").innerHTML = obj.cellName + obj.faceName + CONSTANTS.specialLetter[name];
            var colour = new THREE.Color(
                Math.min(Math.max(obj.material.color.r + (2 * Math.random() - 1) / 10, 0), 1),
                Math.min(Math.max(obj.material.color.g + (2 * Math.random() - 1) / 10, 0), 1),
                Math.min(Math.max(obj.material.color.b + (2 * Math.random() - 1) / 10, 0), 1)
            );
            document.getElementById("content2").innerHTML = colour.r;
            MAIN.addCellToGroup({
                geometryFunction: geometry,
                group: meshes,
                metric: CONSTANTS.metric[name],
                refinement: CONSTANTS.individualDefinition,
                order: CONSTANTS.order[name],
                colour: "#" + colour.getHexString(),
                numberOfFaces: CONSTANTS.numberOfFaces[name],
                name: name,
                faceMode: true,
                transform: obj.cellName + obj.faceName + CONSTANTS.specialLetter[name],
                compact: CONSTANTS.compact[name]
            });
        } else {
            clickObject = null;
            document.getElementById("content1").innerHTML = "empty space";
            document.getElementById("content2").innerHTML = "";
        }

    }

    function touchEnd(event) {

        var rect = view.getBoundingClientRect();

        e.preventDefault();

        var touches = e.changedTouches;

        mouseVector.x = ((touches[0].clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((touches[0].clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(meshes.children);
        if (intersects.length != 0) {
            var obj = intersects[0].object;
            document.getElementById("content1").innerHTML = obj.cellName + obj.faceName + CONSTANTS.specialLetter[name];
            var colour = new THREE.Color(
                Math.min(Math.max(obj.material.color.r + (2 * Math.random() - 1) / 10, 0), 1),
                Math.min(Math.max(obj.material.color.g + (2 * Math.random() - 1) / 10, 0), 1),
                Math.min(Math.max(obj.material.color.b + (2 * Math.random() - 1) / 10, 0), 1)
            );
            document.getElementById("content2").innerHTML = colour.r;
            MAIN.addCellToGroup({
                geometryFunction: geometry,
                group: meshes,
                metric: CONSTANTS.metric[name],
                refinement: CONSTANTS.individualDefinition,
                order: CONSTANTS.order[name],
                colour: "#" + colour.getHexString(),
                numberOfFaces: CONSTANTS.numberOfFaces[name],
                name: name,
                faceMode: true,
                transform: obj.cellName + obj.faceName + CONSTANTS.specialLetter[name],
                compact: CONSTANTS.compact[name]
            });
        } else {
            clickObject = null;
            document.getElementById("content1").innerHTML = "empty space";
            document.getElementById("content2").innerHTML = "";
        }

    }

    function onWindowResize(event) {

        WIDTH = view.clientWidth;
        HEIGHT = view.clientHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();

    }

    function onMouseMove(event) {

        event.preventDefault();

        mouseVector.x = ((event.clientX - rect.left) / WIDTH) * 2 - 1;
        mouseVector.y = - ((event.clientY - rect.top) / HEIGHT) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(meshes.children);

        if (intersects.length > 0) {
            var selectedObject = intersects[0].object;
            if (intersectionObject != selectedObject) {
                ghosts.children = [];
                intersectionObject = selectedObject;
                meshes.children.forEach(mesh => {
                    if (mesh === intersectionObject) {
                        document.getElementById("content2").innerHTML = mesh.cellName;
                        var colour = new THREE.Color(
                            selectedObject.material.color.r,
                            selectedObject.material.color.g,
                            selectedObject.material.color.b
                        );
                        mesh.material.emissive.setRGB(colour.r, colour.g, colour.b);
                        MAIN.addCellToGroup({
                            geometryFunction: geometry,
                            group: ghosts,
                            metric: CONSTANTS.metric[name],
                            refinement: CONSTANTS.individualDefinition,
                            order: CONSTANTS.order[name],
                            colour: "#" + colour.getHexString(),
                            numberOfFaces: CONSTANTS.numberOfFaces[name],
                            name: name,
                            faceMode: true,
                            transform: selectedObject.cellName + selectedObject.faceName + CONSTANTS.specialLetter[name],
                            opacity: 0.5,
                            compact: CONSTANTS.compact[name]
                        });
                    } else {
                        mesh.material.emissive.setRGB(0, 0, 0);
                    }
                });
            }
        } else {
            meshes.children.forEach(mesh => { mesh.material.emissive.setRGB(0, 0, 0); });
            intersectionObjectName = null;
            ghosts.children = [];
        }
    }

}

export { main };
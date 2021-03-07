import * as THREE from "../three.module.js";

window.onload = main;

function main() {

    const canvas = document.getElementById("c");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devivePixelRatio);
    const visuals = document.querySelectorAll(".visual");
    var scenes = [];
    var t = 0;

    // Loop over the visuals
    for (var n = 0; n < visuals.length; n++) {

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xFF0000);

        const geometry = new THREE.DodecahedronGeometry(5, 1);
        const material = new THREE.MeshPhongMaterial({ color: "blue", flatShading: true })
        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        scene.userData.visual = visuals[n];

        const camera = new THREE.PerspectiveCamera(70, visuals[n].clientWidth / visuals[n].clientHeight, 0.1, 10);
        camera.position.set(0, 0, 3);
        camera.lookAt(0, 0, 0);
        scene.userData.camera = camera;

        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(0, 2, 0);
        scene.add(light);

        scenes.push(scene);

    }

    function updateSize() {

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (canvas.width !== width || canvas.height != height) {

            renderer.setSize(width, height, false);

        }

    }

    function animate() {

        render();
        requestAnimationFrame(animate);

    }

    function render() {

        updateSize();

        renderer.setClearColor(0xffffff);
        renderer.setScissorTest(false);
        renderer.clear();

        renderer.setClearColor(0x000000);
        renderer.setScissorTest(true);

        scenes.forEach((scene) => {

            const rect = scene.userData.visual.getBoundingClientRect();
            scene.children[0].rotation.y += t * 0.1;

            // check if it's offscreen. If so skip it

            if (rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
                rect.right < 0 || rect.left > renderer.domElement.clientWidth) {

                return; // it's off screen

            }

            // set the viewport

            const width = rect.right - rect.left;
            const height = rect.bottom - rect.top;
            const left = rect.left;
            const bottom = renderer.domElement.clientHeight - rect.bottom;

            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);

            renderer.render(scene, scene.userData.camera);

        });

        t++;

    }

    animate();

}

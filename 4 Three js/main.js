import * as THREE from "https://unpkg.com/three/build/three.module.js";

document.forms[0].addEventListener('change', (e) => {
    cube.material.color.set(e.target.value);
    triangle.material.color.set(e.target.value);
})
document.forms[1].addEventListener('change', (e) => {
    if (e.target.id === "1") {
        if (light.intensity) {
            light.intensity = 0;
        } else {
            light.intensity = 1;
        }
    } else if (e.target.id === "2") {
        if (spotLight.intensity) {
            spotLight.intensity = 0;
        } else {
            spotLight.intensity = 1;
        }
    } else {
        if (spotLight1.intensity) {
            spotLight1.intensity = 0;
        } else {
            spotLight1.intensity = 1;
        }
    }
})



let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let scene = new THREE.Scene();
scene.background = new THREE.Color('white')


let camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
const light = new THREE.PointLight( "#fff", 2, 100);
light.position.set(0, 10, -10);
light.castShadow = true;
scene.add( light );

const spotLight = new THREE.SpotLight("#fff");
spotLight.position.set(0, 10, 0);
spotLight.castShadow = true;
spotLight.intensity = 1;
scene.add(spotLight)


const spotLight1 = new THREE.SpotLight("#fff");
spotLight1.position.set(-10, 10, 10);
spotLight1.castShadow = true;
spotLight1.intensity = 0.5;
scene.add(spotLight1)


let cameraTarget = new THREE.Vector3(0, 0, 0);
camera.position.z = -15;
camera.position.x = 20;
camera.position.y = 10;

camera.lookAt(cameraTarget);


const geometry = new THREE.PlaneGeometry(10,10);
const material = new THREE.MeshPhongMaterial({color:'grey', side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material)
plane.position.x = 0
plane.position.y = 5
plane.position.z = 5
plane.receiveShadow = true;
let vertices = [
    0, 0, 0,
    10, 0, 0,
    10, 0, 10,
    0, 0, 10
];
let indices = [
    2, 1, 0,
    0, 3, 2
];
let geometry1 = new THREE.BufferGeometry();
geometry1.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices), 3)
);
geometry1.setIndex(indices);
geometry1.computeVertexNormals();
let material1 = new THREE.MeshPhongMaterial({color: 'grey'});
let plane1 = new THREE.Mesh(geometry1, material1);
plane1.position.set(-5, 0, -5);
plane1.shadowMapEnabled = true;
plane1.receiveShadow = true;
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshPhongMaterial({color: "blue"});
const cube = new THREE.Mesh(geometry2, material2);
cube.position.y = 0.5
cube.position.x = -1
cube.castShadow = true;
cube.receiveShadow = true;

let vertices1 = [
    0, 0, 0,
    2, 0, 0,
    1, 0, 2,
    1, 2, 1
];
let indices1 = [
    2, 1, 0,
    3, 2, 1,
    0, 3, 2,
    1, 0, 3,

];
let geometry3 = new THREE.BufferGeometry();
geometry3.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices1), 3)
);
geometry3.setIndex(indices1);
geometry3.computeVertexNormals();
let material3 = new THREE.MeshPhongMaterial({ color: "blue", side: THREE.DoubleSide });
let triangle = new THREE.Mesh(geometry3, new THREE.MeshPhongMaterial({ color: "blue", side: THREE.DoubleSide }));
triangle.position.set(0, 0, 0);
triangle.castShadow = true;
triangle.receiveShadow = true;
scene.add(cube);
scene.add(camera);
scene.add(plane);
scene.add(plane1);
scene.add(triangle);

const clock = new THREE.Clock();

function funcRend() {
    requestAnimationFrame(funcRend);

    // const elapsedTime = clock.getElapsedTime()
    // camera.position.x = Math.cos(elapsedTime * 0) * 10;
    // camera.position.z = Math.sin(elapsedTime * 0) * 30;
    camera.lookAt(cameraTarget);
    renderer.render(scene, camera);
}

funcRend();
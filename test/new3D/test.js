import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm//loaders/GLTFLoader.js';


const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const loader = new GLTFLoader();
var scale = 1.5;

// Background color - initially set to black
const params = {
    color: '#000000'
};


var root;
var path = '3D Files/White_small_sofa.glb';


loader.load(path, function(glb){
    root = glb.scene;
    root.scale.set(scale, scale, scale);
    scene.add(root);
})


// Adding light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);


// Setting sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Adding the camera 
// (Width camera sees in degress, aspect ratio - entire widow, min distance to see an object, max distance to seen an object)
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0, 0.5, 2);
scene.add(camera)


// Set background color
scene.background = new THREE.Color(params.color);


// Defining and setting the renderer
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
renderer.render(scene, camera);


// Rotating 3D model in mouse move
var mx = 0;
var my = 0;

const saveMouse = async(event) => {
    let mxTemp = event.clientX;
    var myTemp = event.clientY;
    var el = document.elementFromPoint(mxTemp, myTemp);
    
    if(el == canvas){
        mx = mxTemp;
        my = myTemp;
    }
}
document.onmousemove = saveMouse;


// Changing background color
var backColor = document.getElementById("backcolor");

const changeColor = async(event) => {
    params.color = backColor.value;
    scene.background = new THREE.Color(params.color);
}

backColor.onchange = changeColor;


// Zoom-out 3D Model
var zoomOut = document.getElementById("zoom-out");

const zoomOutObj = async(event) => {
    scale -= 0.1;
    root.scale.set(scale, scale, scale);
}

zoomOut.onclick = zoomOutObj;


// Zoom-In 3D Model
var zoomIn = document.getElementById("zoom-in");

const zoomInObj = async(event) => {
    scale += 0.1;
    root.scale.set(scale, scale, scale);
}

zoomIn.onclick = zoomInObj;


// Set material color 1
var mat1 = document.getElementById("mat1");

const mat1Obj = async(event) => {
    path = '3D Files/White_small_sofa.glb';
    loader.load(path, function(glb){
        scene.remove(root); // removes current object

        // adds new object
        root = glb.scene;
        root.scale.set(scale, scale, scale);
        scene.add(root);
    })
}

mat1.onclick = mat1Obj;


// Set material color 2
var mat2 = document.getElementById("mat2");

const mat2Obj = async(event) => {
    path = '3D Files/Grey_small_sofa.glb';
    loader.load(path, function(glb){
        scene.remove(root); // removes current object

        // adds new object
        root = glb.scene;
        root.scale.set(scale, scale, scale);
        scene.add(root);
    })
}

mat2.onclick = mat2Obj;


// Define and run animate function
const animate = async() => {
    requestAnimationFrame(animate);

    // rotating the 3d object
    root.rotation.y = mx/125; 
    root.rotation.x = my/100;

    renderer.render(scene, camera);
}

animate();





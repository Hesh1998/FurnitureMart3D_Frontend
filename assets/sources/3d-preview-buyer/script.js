import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm//loaders/GLTFLoader.js';


const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const loader = new GLTFLoader();
var scale = 2.2;

// Background color - initially set to black
const params = {
    color: '#000000'
};


// id and productid of seller
var sellerId = localStorage.getItem("sellerId");
var productId = localStorage.getItem("productId");


// Getting available material colors and setting colour buttons
let response1 = await fetch(`http://localhost:8080/findUserProducts/${sellerId}`);
let items = await response1.json();
var clr1 = "";
var clr2 = "";
var clr3 = "";

for (let i = 0; i < items.length; i++) {
    if(items[i].itemId == productId){
        clr1 = items[i].clr1;
        clr2 = items[i].clr2;
        clr3 = items[i].clr3;

        break;
    }
}

var colourButtons = document.getElementById("colour-buttons");
var colourButtonsInnerHTML = "";

colourButtonsInnerHTML += `<button type="button" id="mat1" class="btn btn-primary" style="width: 20px; height: 25px; background-color: ${clr1}; border-width: 2px; border-color: black;"></button>`;

if(clr2 != ""){
    colourButtonsInnerHTML += `<button type="button" id="mat2" class="btn btn-primary" style="width: 20px; height: 25px; background-color: ${clr2}; border-width: 2px; border-color: black; margin-left: 10px"></button>`;
}

if(clr3 != ""){
    colourButtonsInnerHTML += `<button type="button" id="mat3" class="btn btn-primary" style="width: 20px; height: 25px; background-color: ${clr3}; border-width: 2px; border-color: black; margin-left: 10px"></button>`;
}

colourButtons.innerHTML = colourButtonsInnerHTML;


// Setting path for available 3D models
let response3 = await fetch(`http://localhost:8080/getUser3DModels/${sellerId}`);
let items3 = await response3.json();

var m3d1 = "";
var m3d2 = "";
var m3d3 = "";

for (let i = 0; i < items3.length; i++) {
    if(items3[i].productId == productId && items3[i].clrId == 1){
        m3d1 = items3[i].model3d;
    }

    if(items3[i].productId == productId && items3[i].clrId == 2){
        m3d2 = items3[i].model3d;
    }

    if(items3[i].productId == productId && items3[i].clrId == 3){
        m3d3 = items3[i].model3d;
    }
}

var path1 = m3d1;
var path2 = m3d2;
var path3 = m3d3;


// Loading the source  3D file
var root;
loader.load(path1, function(glb){
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
// (Width camera sees in degress, Aspect ratio - entire widow, Min distance to see an object, Max distance to seen an object)
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
camera.position.set(0, 0.05, 2);
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


// Rotating 3D model with pressed mouse move
var mx = 0;
var my = 0;

// Do this when the mouse is down, on mouse move
const saveMouse = async(event) => {
    let mxTemp = event.clientX;
    var myTemp = event.clientY;
    var el = document.elementFromPoint(mxTemp, myTemp);
    
    // Only rotate the modal when the mouse moves within the canvas
    if(el == canvas){
        mx = mxTemp;
        my = myTemp;
    }
}

// Do nothing when the mouse is up, on mouse move
const saveMouse2 = async(event) => {
    
}

document.onmousedown = function(event) {
    document.onmousemove = saveMouse;
}

document.onmouseup = function(event) {
    document.onmousemove = saveMouse2;
}


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
    loader.load(path1, function(glb){
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
    loader.load(path2, function(glb){
        scene.remove(root); // removes current object

        // adds new object
        root = glb.scene;
        root.scale.set(scale, scale, scale);
        scene.add(root);
    })
}

if(clr2 != ""){
    mat2.onclick = mat2Obj;
}


// Set material color 3
var mat3 = document.getElementById("mat3");

const mat3Obj = async(event) => {
    loader.load(path3, function(glb){
        scene.remove(root); // removes current object

        // adds new object
        root = glb.scene;
        root.scale.set(scale, scale, scale);
        scene.add(root);
    })
}

if(clr3 != ""){
    mat3.onclick = mat3Obj;
}


// Define and run animate function
const animate = async() => {
    requestAnimationFrame(animate);

    // rotating the 3d object
    root.rotation.y = mx/125; 
    root.rotation.x = my/100;

    renderer.render(scene, camera);
}

animate();





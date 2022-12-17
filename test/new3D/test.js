import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm//loaders/GLTFLoader.js';


const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const loader = new GLTFLoader();

const set3DModel = async() => {
    document.body.style.background = "white";
    var root;

    
    loader.load('uploads_files_3902233_sofa(1).glb', function(glb){
        root = glb.scene;
        root.scale.set(1.5, 1.5, 1.5);
        scene.add(root);
    },function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    })
    
    // Adding light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    scene.add(light);
    

    // Setting sizes
    const sizes = {
        width: window.innerWidth/1.3,
        height: window.innerHeight
    }
    
    
    // Adding the camera 
    // (Width camera sees in degress, aspect ratio - entire widow, min distance to see an object, max distance to seen an object)
    const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100);
    camera.position.set(0, 0.5, 2);
    scene.add(camera)
    

    // Defining and setting the renderer
    const renderer = new THREE.WebGL1Renderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.gammaOutput = true;
    renderer.render(scene, camera);
    

    // Setting mouse coordinates to rotate the 3D object with the mouse move
    var mx = 0;
    var my = 0;

    function saveMouse(event){
        let mxTemp = event.clientX;
        var myTemp = event.clientY;
        var el = document.elementFromPoint(mxTemp, myTemp);
        
        if(el == canvas){
            mx = mxTemp;
            my = myTemp;
        }
    }
    document.onmousemove = saveMouse;


    // Define and run animate function
    const animate = async() => {
        requestAnimationFrame(animate);

        // rotating the 3d object
        root.rotation.y = mx/125; 
        root.rotation.x = my/100;

        renderer.render(scene, camera);
    }
    
    animate();
}

set3DModel();
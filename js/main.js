import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { Car } from "./car.js";
import { Person } from "./person.js";
//import { Stadium } from "./stadium.js";
import { Seats } from "./seats.js";
import { Lightpole } from "./lightpole.js";
//import { Track } from "./track.js";
import { Ground } from "./ground.js";
import { StartLine } from './startLine.js';

import {FlyControls} from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/FlyControls.js"
const scene = new THREE.Scene();
buildScene();


// Lights
const ambienLight = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambienLight);

const directLight = new THREE.DirectionalLight(0xffffff,0.7);
directLight.position.set(50,300,0);
directLight.target.position.set(0,0,0);
scene.add(directLight);
scene.add(directLight.target);

//const helper = new THREE.DirectionalLightHelper(directLight);
//scene.add(helper);

// Camera
const aspectRatio = window.innerWidth/window.innerHeight;
const camera = new THREE.PerspectiveCamera(45,aspectRatio,0.10,1000);

/*
const cameraWidth = 150;
const cameraHeigh = cameraWidth/aspectRatio;

const camera = new THREE.OrthographicCamera(cameraWidth/-2,cameraWidth/2,cameraHeight/2,cameraHeight/-2,0,1000)
*/

const distCenter = 100;
camera.position.set(0,5,0);
//camera.lookAt(0,0,0);



// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("skyblue");//("#2a2a35");s
var controls = new FlyControls(camera )
controls.autoForward = false;
controls.dragToLook = true;

function animate() {

	requestAnimationFrame( animate );
    

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update(1);

	renderer.render( scene, camera );

}
animate()
THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {

    // console.log( item, loaded, total ); // debug

    if ( loaded === total ) renderer.render(scene,camera);;

};
//renderer.render(scene,camera);

document.body.appendChild(renderer.domElement);


function keyController(){
    const step = 3;
    const rotSpeed = 0.5;
    let angle = 0;
    document.onkeydown = function(event){
        console.log("PRESSED");
        var key = event.key;
        switch (key){
            case "w":
            case "W":
                camera.position.z -= step;
                break;
            case "a":
            case "A":
                camera.position.x -= step;
                break;
            case "s":
            case "S":
                camera.position.z += step;
                break;
            case "d":
            case "D":
                camera.position.x += step;
                break;
            case " ":
                camera.position.y += step;
                break;
            case " ":
                camera.position.y += step;
                break;
            case "o":
            case "O":
                angle+=1;
                camera.position.x = scene.position.x + distCenter * Math.cos( rotSpeed * angle );         
                camera.position.z = scene.position.z + distCenter * Math.sin( rotSpeed * angle );
                camera.lookAt(scene.position);
                break;
            case "p":
            case "P":
                angle-=1;
                camera.position.x = scene.position.x + distCenter * Math.cos( rotSpeed * angle );         
                camera.position.z = scene.position.z + distCenter * Math.sin( rotSpeed * angle );
                camera.lookAt(scene.position);
                break;
            default:
                if (event.shiftKey){
                    camera.position.y -= step;
                    break;
                }
        }
    }
}


function buildScene(){

    const lightsPos = [
        new THREE.Vector3(30,0,30),
        new THREE.Vector3(40,0,40),
        new THREE.Vector3(20,0,20),
        new THREE.Vector3(80,0,80),
    ];

    const car = Car(33);
    scene.add(car);

    const person = Person();
    //person.rotation.y = Math.PI/4;
    //scene.add(person);

    const lightpole = Lightpole();
    scene.add(lightpole);
    
    setArtificialLights(lightsPos);

    

    //const track = Track();
    //track.position.z=80;
    //track.position.y=-1.5;
    //track.position.x = 20;
    //scene.add(track);

    const ground = Ground(455,450,10);
    ground.position.y=0;
    scene.add(ground);

    const startLine = StartLine();
    startLine.position.set(20,0,75);
    scene.add(startLine);

    const seatPosY = 1;
    const seats1 = Seats(130,10,35);
    seats1.position.x=-70;
    seats1.position.y=seatPosY;
    seats1.position.z=85;
    seats1.rotation.y=Math.PI;
    scene.add(seats1);

    const seats2 = Seats(130,10,35);
    seats2.position.x=70;
    seats2.position.y=seatPosY;
    seats2.position.z=85;
    seats2.rotation.y=Math.PI;
    scene.add(seats2);

    const seats3 = Seats(60,10,35);
    seats3.position.x=120;
    seats3.position.y=seatPosY;
    seats3.position.z=10;
    seats3.rotation.y=-Math.PI/3.99;
    scene.add(seats3);

    const seats4 = Seats(130,10,35);
    seats4.position.x=-70;
    seats4.position.y=seatPosY;
    seats4.position.z=-125;
    scene.add(seats4);

    const seats5 = Seats(130,10,35);
    seats5.position.x=-150;
    seats5.position.y=seatPosY;
    seats5.position.z=-15;
    seats5.rotation.y=Math.PI/2;
    scene.add(seats5);
    
}

function setArtificialLights(lightsPos){
    /*for (let i=0; i<lightsPos.length; i++){
        let lightpole = Lightpole();
        lightpole.position.set(lightsPos[i].x,lightsPos[i].y,lightsPos[i].z);
        lightpole.lookAt(0,0,0);
        scene.add(lightpole);
    }*/
}

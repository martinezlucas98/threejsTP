import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { Car } from "./car.js";
import { Person } from "./person.js";
//import { Stadium } from "./stadium.js";
import { Seats, SeatsVIP } from "./seats.js";
import { Lightpole } from "./lightpole.js";
//import { Track } from "./track.js";
import { Ground } from "./ground.js";
import { StartLine } from './startLine.js';
import { Fence } from './fence.js';
import { TrackBorderCurve, TrackBorder, TrackBorderBezier } from './trackBorder.js';
import { Helicopter } from './helicopter.js';

import {OrbitControls} from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls.js"
import MoveControls from './MoveControls.js';

let cameraMode = 1; // 0 fixed rotation on "center", 1 free mode

const scene = new THREE.Scene();
buildScene();
const helicopter = Helicopter();
helicopter.position.set(17,25,-40);
scene.add(helicopter);


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

const cameraInitialPos = new THREE.Vector3(120,100,80);
const cameraLookAt = new THREE.Vector3(-15,5,0);
camera.position.set(cameraInitialPos.x,cameraInitialPos.y,cameraInitialPos.z);
camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
let cameraRotAngleXZ = Math.atan(camera.position.z/camera.position.x);
let cameraRotAngleYZ = 0;
let distCenter = Math.sqrt((cameraInitialPos.x+cameraLookAt.x)**2 + (cameraInitialPos.y-cameraLookAt.y)**2 + (cameraInitialPos.z-cameraLookAt.z)**2);


// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("skyblue");//("#2a2a35");
//controls.autoForward = false;
//controls.dragToLook = true;

var controls = new MoveControls(camera);
//controls.dragToLook = true;

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update(1);

	renderer.render( scene, camera );

    // last children is the tail propellet (spanish: helice)
    helicopter.children[helicopter.children.length - 1].rotation.y -= 0.07;

    // second to last children is the main propellet (spanish: helice)
    helicopter.children[helicopter.children.length - 2].rotation.y -= 0.07;

    keyController();

}
animate();
THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {

    // console.log( item, loaded, total ); // debug

    if ( loaded === total ) renderer.render(scene,camera);;

};
//renderer.render(scene,camera);

document.body.appendChild(renderer.domElement);


function keyController(){
    const rotSpeed = 0.5;
    let hemisphere = 1;
    if(cameraMode){distCenter=Math.sqrt((camera.position.x+cameraLookAt.x)**2 + (camera.position.y-cameraLookAt.y)**2 + (camera.position.z-cameraLookAt.z)**2);}
    document.onkeydown = function(event){
        var key = event.code;
        switch (key){
            case "ArrowLeft":
                controls.enabled = false;
                //if (cameraMode){
                    cameraMode = 0;
                    //camera.position.set(cameraInitialPos.x,cameraInitialPos.y,cameraInitialPos.z);
                //}

                cameraRotAngleXZ+=0.1;
                camera.position.x = cameraLookAt.x + distCenter * Math.cos( rotSpeed * cameraRotAngleXZ );         
                camera.position.z = cameraLookAt.z + distCenter * Math.sin( rotSpeed * cameraRotAngleXZ );
                camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                break;
            case "ArrowRight":
                controls.enabled = false;
                //if (cameraMode){
                    cameraMode = 0;
                    //camera.position.set(cameraInitialPos.x,cameraInitialPos.y,cameraInitialPos.z);
                //}
                
                cameraRotAngleXZ-=0.1;
                camera.position.x = cameraLookAt.x + distCenter * Math.cos( rotSpeed * cameraRotAngleXZ );         
                camera.position.z = cameraLookAt.z + distCenter * Math.sin( rotSpeed * cameraRotAngleXZ );
                camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                break;
            case "ArrowUp":
                controls.enabled = false;
                //if (cameraMode){
                    cameraMode = 0;
                    //camera.position.set(cameraInitialPos.x,cameraInitialPos.y,cameraInitialPos.z);
                //}

                cameraRotAngleYZ+=0.1;
                if (rotSpeed*cameraRotAngleYZ>=2*Math.PI){
                    cameraRotAngleYZ=0;
                }
                console.log(cameraRotAngleYZ);
                camera.position.y = cameraLookAt.y + distCenter * Math.cos( rotSpeed * cameraRotAngleYZ );    
                camera.position.z = cameraLookAt.z + distCenter * Math.sin( rotSpeed * cameraRotAngleYZ );
                //camera.translateY(newPosY-camera.position.y);
                //camera.rotation.x+=0.1;
                camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                /*if (hemisphere==1 && rotSpeed*cameraRotAngleYZ>0 && rotSpeed*cameraRotAngleYZ<Math.PI){
                    hemisphere = -1;
                    camera.rotation.z=Math.PI;
                }else {
                    if (hemisphere==-1){hemisphere = 1;}
                }*/
                
                break;
            case "ArrowDown":
                controls.enabled = false;
                //if (cameraMode){
                    cameraMode = 0;
                    //camera.position.set(cameraInitialPos.x,cameraInitialPos.y,cameraInitialPos.z);
                //}

                cameraRotAngleYZ-=0.1;
                camera.position.y = cameraLookAt.y + distCenter * Math.cos( rotSpeed * cameraRotAngleYZ );         
                camera.position.z = cameraLookAt.z + distCenter * Math.sin( rotSpeed * cameraRotAngleYZ );
                camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                break;
            case "KeyW":
            case "KeyA":
            case "KeyS":
            case "KeyD":
            case "KeyR":
            case "keyF":
                controls.enabled = true;
                cameraMode = 1;
                break;
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

    const carsY = 1;
    const carsDist = 8;
    for (let i=0; i<6; i++){
        const car1 = Car();
        car1.position.set(11-i*carsDist,carsY,72);
        scene.add(car1);
        const car2 = Car();
        car2.position.set(13-i*carsDist,carsY,75);
        scene.add(car2);
        const car3 = Car();
        car3.position.set(15-i*carsDist,carsY,78);
        scene.add(car3);
    }
    


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
    seats1.position.set(-70,seatPosY,85);
    seats1.rotation.y=Math.PI;
    scene.add(seats1);

    const seats2 = Seats(130,10,35);
    seats2.position.set(70,seatPosY,85);
    seats2.rotation.y=Math.PI;
    scene.add(seats2);

    const seats3 = Seats(60,10,35);
    seats3.position.set(120,seatPosY,10);
    seats3.rotation.y=-Math.PI/3.99;
    scene.add(seats3);

    const seats4 = Seats(130,10,35);
    seats4.position.set(-70,seatPosY,-125);
    scene.add(seats4);

    const seats5 = Seats(130,10,35);
    seats5.position.set(-150,seatPosY,-15);
    seats5.rotation.y=Math.PI/2;
    scene.add(seats5);


    const seatsVIP = SeatsVIP(10,3);
    seatsVIP.position.set(17,0,-40);
    scene.add(seatsVIP);



    const fence1 = Fence(300,5);
    fence1.position.set(0,0.5,84.5);
    scene.add(fence1);

    const fence2 = Fence(150,5);
    fence2.position.set(-70,0.5,-124.5);
    scene.add(fence2);

    const lightpoleY = 3;
    const lightpolePositionsRotations = [
        [new THREE.Vector3(-100,lightpoleY,60), new THREE.Vector3(0,0,0)],
        [new THREE.Vector3(-50,lightpoleY,60), new THREE.Vector3(0,0,0)],
        [new THREE.Vector3(50,lightpoleY,60), new THREE.Vector3(0,0,0)],
        [new THREE.Vector3(100,lightpoleY,60), new THREE.Vector3(0,0,0)],
        [new THREE.Vector3(0,lightpoleY,60), new THREE.Vector3(0,0,0)],
        [new THREE.Vector3(0,lightpoleY,-96), new THREE.Vector3(0,Math.PI,0)],
        [new THREE.Vector3(-50,lightpoleY,-96), new THREE.Vector3(0,Math.PI,0)],
        [new THREE.Vector3(-100,lightpoleY,-96), new THREE.Vector3(0,Math.PI,0)],
        [new THREE.Vector3(-125,lightpoleY,-60), new THREE.Vector3(0,-Math.PI/2,0)],
        [new THREE.Vector3(-125,lightpoleY,-10), new THREE.Vector3(0,-Math.PI/2,0)],
        [new THREE.Vector3(-125,lightpoleY,40), new THREE.Vector3(0,-Math.PI/2,0)]
    ];

    setLightpoles(lightpolePositionsRotations);
    
    //setArtificialLights(lightsPos);

    const tbY = 0.52;
    const curveThickness = 15;

    let moveto = [0,0];
    let quadratic1 = [40/2,30,40.3,0];
    let quadratic2 = [quadratic1[0],quadratic1[1]-curveThickness,moveto[0],moveto[1]];
    const trackBorderCurve1 = TrackBorderCurve(moveto,quadratic1,quadratic2);
    trackBorderCurve1.position.set(-0.3,tbY,-55);
    trackBorderCurve1.rotation.z=Math.PI/3;
    scene.add(trackBorderCurve1);

    moveto = [0,-2.5];
    quadratic1 = [50/2.6,50,50.5,0];
    quadratic2 = [quadratic1[0],quadratic1[1]-curveThickness,moveto[0],moveto[1]];
    const trackBorderCurve2 = TrackBorderCurve(moveto,quadratic1,quadratic2);
    trackBorderCurve2.position.set(-12.7,tbY,-51);
    trackBorderCurve2.rotation.z=Math.PI/3.3;
    scene.add(trackBorderCurve2);

    moveto = [0,-8.1];
    quadratic1 = [-45/2,-30,-45.3,-1.45];
    quadratic2 = [quadratic1[0],quadratic1[1]-curveThickness,moveto[0],moveto[1]];
    const trackBorderCurve3 = TrackBorderCurve(moveto,quadratic1,quadratic2);
    trackBorderCurve3.position.set(-7,tbY,-70);
    trackBorderCurve3.rotation.z=Math.PI/3;
    scene.add(trackBorderCurve3);

    const tbWidth = 1;
    const trackBorder1 = TrackBorder(tbWidth,180);
    trackBorder1.position.set(-90,tbY,68.9);
    scene.add(trackBorder1);

    const trackBorder2 = TrackBorder(tbWidth,180);
    trackBorder2.position.set(-90,tbY,80.1);
    scene.add(trackBorder2);

    const trackBorder3 = TrackBorder(tbWidth,70);
    trackBorder3.position.set(84.71,tbY,-6);
    trackBorder3.rotation.z=Math.PI/4;
    scene.add(trackBorder3);

    const trackBorder4 = TrackBorder(tbWidth,100);
    trackBorder4.position.set(-145.1,tbY,-60);
    trackBorder4.rotation.z=Math.PI/2;
    scene.add(trackBorder4);
    
}

function setLightpoles(posRotArray){
    for (let i=0; i<posRotArray.length; i++){
        const pos = posRotArray[i][0];
        const rot = posRotArray[i][1];
        const lightpole = Lightpole();
        lightpole.position.set(pos.x,pos.y,pos.z);
        lightpole.rotation.set(rot.x,rot.y,rot.z);
        scene.add(lightpole);
    }
}

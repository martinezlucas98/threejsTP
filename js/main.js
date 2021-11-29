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
import { PitsStop } from './pitsStop.js';

import {OrbitControls} from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls.js";
import MoveControls from './MoveControls.js';


let cameraMode = 1; // 0 fixed rotation on "center", 1 free mode
let variantSpeed = 1;

const scene = new THREE.Scene();

// Camera
const aspectRatio = window.innerWidth/window.innerHeight;
const camera = new THREE.PerspectiveCamera(45,aspectRatio,0.10,1000);

/*
const cameraWidth = 150;
const cameraHeigh = cameraWidth/aspectRatio;

const camera = new THREE.OrthographicCamera(cameraWidth/-2,cameraWidth/2,cameraHeight/2,cameraHeight/-2,0,1000)
*/

const cameraInitialPos = new THREE.Vector3(120,100,80);
const cameraLookAt = new THREE.Vector3(-15,0,0);
camera.position.set(cameraInitialPos.x,cameraInitialPos.y,cameraInitialPos.z);
camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
let cameraRotAngleXZ = Math.atan(camera.position.z/camera.position.x);
let cameraRotAngleYZ = 0;
let distCenter;
let rotYPointA = new THREE.Vector3(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
let rotYPointB = new THREE.Vector3(cameraLookAt.x+10,cameraLookAt.y,cameraLookAt.z);
updateRotYaxis();


//AUDIO
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const crowdSound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '../sounds/crowd_stadium.wav', function( buffer ) {
    crowdSound.setBuffer( buffer );
    crowdSound.setLoop( true );
    crowdSound.setVolume( 0.1 );
    crowdSound.play();
});



// create the PositionalAudio object (passing in the listener)
const engineSound = new THREE.PositionalAudio( listener );

// load a sound and set it as the PositionalAudio object's buffer
const audioLoader2 = new THREE.AudioLoader();
audioLoader2.load( '../sounds/car_engine.mp3', function( buffer ) {
	engineSound.setBuffer( buffer );
	engineSound.setRefDistance( 20 );
    engineSound.setRolloffFactor(2);
    engineSound.setVolume(5);
    engineSound.setLoop( true );
    engineSound.play();
});


// create an object for the sound to play from

const engineAudioMesh = new THREE.Object3D();
scene.add( engineAudioMesh );

// finally add the sound to the mesh
engineAudioMesh.add( engineSound );


buildScene();

const helicopter = Helicopter();
helicopter.position.set(17,25,-40);
scene.add(helicopter);

// create the PositionalAudio object (passing in the listener)
const helicopterSound = new THREE.PositionalAudio( listener );

// load a sound and set it as the PositionalAudio object's buffer
const audioLoader3 = new THREE.AudioLoader();
audioLoader3.load( '../sounds/helicopter_propeller.mp3', function( buffer ) {
	helicopterSound.setBuffer( buffer );
	helicopterSound.setRefDistance( 10 );
    //helicopterSound.setRolloffFactor(1);
    helicopterSound.setVolume(2 );
    helicopterSound.setLoop( true );
	helicopterSound.play();
});

// create an object for the sound to play from

const helicopterAuxMesh = new THREE.Object3D();
scene.add( helicopterAuxMesh );
helicopterAuxMesh.position.set(helicopter.position.x,helicopter.position.y,helicopter.position.z);

// finally add the sound to the mesh
helicopterAuxMesh.add( helicopterSound );


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


// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("skyblue");//("#2a2a35");
//controls.autoForward = false;
//controls.dragToLook = true;

var controls = new MoveControls(camera);
//controls.limitMovement = true;
/*controls.limits = {
    maxX: 200,
    minX: -200,
    maxY: 400,
    minY: 1,
    maxZ: 200,
    minZ: -200
};*/
//controls.dragToLook = true;
const geometryC = new THREE.SphereGeometry( 1, 32, 16 );

const sphereLookAt = new THREE.Mesh( geometryC, new THREE.MeshBasicMaterial( {color: 0xff0000} ) );
sphereLookAt.position.set(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
scene.add(sphereLookAt);

const sphereA = new THREE.Mesh( geometryC, new THREE.MeshBasicMaterial( {color: 0x00ff00} ) );
sphereA.position.set(rotYPointA.x,rotYPointA.y,rotYPointA.z);
scene.add(sphereA);

const sphereB = new THREE.Mesh( geometryC, new THREE.MeshBasicMaterial( {color: 0x0000ff} ) );
sphereB.position.set(rotYPointB.x,rotYPointB.y,rotYPointB.z);
scene.add(sphereB);


const sphereC = new THREE.Mesh( geometryC, new THREE.MeshBasicMaterial( {color: 0xffffff} ) );
sphereC.position.set(0,0,0);
scene.add(sphereC);

function animate() {
    updateRotYaxis
    //sphereA.position.set(rotYPointA.x,rotYPointA.y,rotYPointA.z);
    sphereB.position.set(rotYPointB.x,rotYPointB.y,rotYPointB.z);

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
    const rotSpeed = 0.5*0.1;
    if(cameraMode==1){
        //cameraRotAngleXZ = Math.atan(camera.position.z/camera.position.x);
        //cameraRotAngleYZ = Math.atan(camera.position.y/camera.position.z);
        distCenter = Math.sqrt((camera.position.x-cameraLookAt.x)**2 + (camera.position.z-cameraLookAt.z)**2);

        if (camera.position.x >= cameraLookAt.x && camera.position.z > cameraLookAt.z){
            // First Quadrant
            cameraRotAngleXZ = Math.atan((camera.position.z-cameraLookAt.z)/(camera.position.x-cameraLookAt.x));
            document.title = "1er Cuadrante";
            console.log("ATAN: ",cameraRotAngleXZ);

        } else if (camera.position.x <= cameraLookAt.x && camera.position.z > cameraLookAt.z){
            // Second Quadrant
            cameraRotAngleXZ = -Math.atan((camera.position.x-cameraLookAt.x)/(camera.position.z-cameraLookAt.z))+Math.PI/2;
            document.title = "2do Cuadrante";
            console.log("ATAN: ",cameraRotAngleXZ);

        } else if (camera.position.x < cameraLookAt.x && camera.position.z <= cameraLookAt.z){
            // Third Quadrant
            cameraRotAngleXZ = -(Math.atan((camera.position.x-cameraLookAt.x)/(camera.position.z-cameraLookAt.z))+Math.PI/2);
            document.title = "3er Cuadrante";
            console.log("ATAN: ",cameraRotAngleXZ);

        } else if (camera.position.x > cameraLookAt.x && camera.position.z <= cameraLookAt.z){
            // Fourth Quadrant
            cameraRotAngleXZ = Math.atan((camera.position.z-cameraLookAt.z)/(camera.position.x-cameraLookAt.x));
            document.title = "4to Cuadrante";
            console.log("ATAN: ",cameraRotAngleXZ);

        }/* else if (camera.position.x == 0 && camera.position.z > 0){ // AXIS
            cameraRotAngleXZ = Math.PI/2;
        } else if (camera.position.x == 0 && camera.position.z < 0){
            cameraRotAngleXZ = -Math.PI/2;
        } else if (camera.position.x > 0 && camera.position.z == 0){
            cameraRotAngleXZ = 0;
        } else if (camera.position.x < 0 && camera.position.z == 0){
            cameraRotAngleXZ = Math.PI;
        } else {
            // Backup plan
            cameraRotAngleXZ = Math.atan((camera.position.z-cameraLookAt.z)/(camera.position.x-cameraLookAt.x));
        }*/
    }
    
    document.onkeydown = function(event){
        var key = event.code;
        switch (key){
            case "ArrowLeft":
                if (cameraMode==1){
                    controls.enabled = false;
                    cameraMode = 0;
                    //camera.position.set(cameraInitialPos.x,cameraInitialPos.y,cameraInitialPos.z);
                    //cameraRotAngleXZ = Math.asin((camera.position.z-cameraLookAt.z)/distCenter);//camera.position.x-cameraLookAt.x
                    console.log("MATH FUNCTION:: ",cameraRotAngleXZ);
                }
                
                cameraRotAngleXZ+=rotSpeed;
                camera.position.x = cameraLookAt.x + distCenter * Math.cos( cameraRotAngleXZ );         
                camera.position.z = cameraLookAt.z + distCenter * Math.sin( cameraRotAngleXZ );
                camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                console.log(cameraRotAngleXZ);

                updateRotYaxis();
                break;
            case "ArrowRight":
                if (cameraMode==1){
                    controls.enabled = false;
                    cameraMode = 0;
                }

                cameraRotAngleXZ-=rotSpeed;
                camera.position.x = cameraLookAt.x + distCenter * Math.cos( cameraRotAngleXZ );         
                camera.position.z = cameraLookAt.z + distCenter * Math.sin( cameraRotAngleXZ );
                camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);

                updateRotYaxis();

                break;
            case "ArrowUp":
                document.title = ""+camera.position.x+" // "+camera.position.z;
                if(camera.position.y<distCenter){
                    if (cameraMode == 1){
                        controls.enabled = false;
                        cameraMode = 0;
                        updateRotYaxis();
                        camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                    }
                    
                    cameraRotAngleYZ+=rotSpeed/variantSpeed;
                    variantSpeed+=5;

                    //camera.position.x-=rotYPointA.x;
                    //camera.position.y-=rotYPointA.y;
                    //camera.position.z-=rotYPointA.z;

                    //camera.rotateOnWorldAxis(getAxis(rotYPointA,rotYPointB),cameraRotAngleYZ);

                    //camera.position.x+=rotYPointA.x;
                    //camera.position.y+=rotYPointA.y;
                    //camera.position.z+=rotYPointA.z;
                
                    
                    camera.rotateAroundWorldAxis(cameraLookAt, getAxis(rotYPointA,rotYPointB),cameraRotAngleYZ);
                }

                break;
            case "ArrowDown":
                document.title = ""+camera.position.y;
                if (cameraMode == 1){
                    controls.enabled = false;
                    cameraMode = 0;
                    updateRotYaxis();
                    camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                }
                if(camera.position.y>1.9){
                    cameraRotAngleYZ-=rotSpeed/variantSpeed;
                    variantSpeed+=5;

                    //camera.position.x-=rotYPointA.x;
                    //camera.position.y-=rotYPointA.y;
                    //camera.position.z-=rotYPointA.z;

                    //camera.rotateOnWorldAxis(getAxis(rotYPointA,rotYPointB),cameraRotAngleYZ);

                    //camera.position.x+=rotYPointA.x;
                    //camera.position.y+=rotYPointA.y;
                    //camera.position.z+=rotYPointA.z;
                    
                    camera.rotateAroundWorldAxis(cameraLookAt, getAxis(rotYPointB,rotYPointA),cameraRotAngleYZ);
                }

                break;
            /*case "ArrowUp":
                if (cameraRotAngleYZ>=2*Math.PI){
                    cameraRotAngleYZ = 0;
                }
                document.title = ""+cameraRotAngleYZ;
                controls.enabled = false;
                cameraMode = 0;
                cameraRotAngleYZ+=rotSpeed;
                //if (cameraRotAngleYZ>=0){
                    //cameraRotAngleYZ=0;
               // }
                
                newPosY = camera.worldToLocal(cameraLookAt.y + distCenter * Math.cos( cameraRotAngleYZ ));    
                newPosZ = camera.worldToLocal(cameraLookAt.z + distCenter * Math.sin( cameraRotAngleYZ ));
                currentPosY = camera.worldToLocal(camera.position.y);
                currentPosZ= camera.worldToLocal(camera.position.z);
                console.log(newPosY);
                console.log(newPosZ);
                console.log(currentPosY);
                console.log(currentPosZ);
                if (camera.position.x>0 && camera.position.z>0){
                    // First Quadrant
                    camera.translateY(newPosY-currentPosY);
                    camera.translateZ(currentPosZ-newPosZ);
                } else if (camera.position.x<0 && camera.position.z>0){
                    // Second Quadrant
                    camera.translateY(currentPosY-newPosY);
                    camera.translateZ(currentPosZ-newPosZ);
                } else if (camera.position.x<0 && camera.position.z<0){
                    // Third Quadrant
                    camera.translateY(currentPosY-newPosY);
                    camera.translateZ(newPosZ-currentPosZ);
                } else if (camera.position.x>0 && camera.position.z<0){
                    // Fourth Quadrant
                    camera.translateY(newPosY-currentPosY);
                    camera.translateZ(newPosZ-currentPosZ);
                }
                
                if (cameraRotAngleYZ>0 && cameraRotAngleYZ<Math.PI/2){
                    //camera.up.set(0,-1,0);
                }else{
                    //camera.up.set(0,1,0);
                }
                camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                break;
            case "ArrowDown":
                controls.enabled = false;
                cameraMode = 0;
                cameraRotAngleYZ-=rotSpeed;
                //if (cameraRotAngleYZ<=-Math.PI/2){
                   // cameraRotAngleYZ=-Math.PI/2;
                //}
                
                camera.position.y = cameraLookAt.y + distCenter * Math.cos( cameraRotAngleYZ );    
                camera.position.z = cameraLookAt.z + distCenter * Math.sin( cameraRotAngleYZ );
                //camera.translateY(newPosY-camera.position.y);
                //camera.translateZ(newPosZ-camera.position.z);
                //camera.lookAt(cameraLookAt.x,cameraLookAt.y,cameraLookAt.z);
                break;*/
            case "KeyW":
            case "KeyA":
            case "KeyS":
            case "KeyD":
            case "KeyR":
            case "keyF":
                if (cameraMode==0){
                    controls.enabled = true;
                    controls.lookAt(cameraLookAt);
                    cameraMode = 1;
                }
                break;
            case "KeyP":
                if(crowdSound.isPlaying){
                    crowdSound.pause();
                    engineSound.pause();
                    helicopterSound.pause();
                }else{
                    crowdSound.play();
                    engineSound.play();
                    helicopterSound.play();
                }
                //console.log("Angle: "+cameraRotAngleXZ + " // Position (X,Y,Z): "+camera.position.x+" , "+camera.position.x+" , "+camera.position.z+" // DistCenter: "+distCenter);
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
    const carRows = 6;
    for (let i=0; i<carRows; i++){
        const car1 = Car();
        car1.position.set(11-i*carsDist,carsY,72);
        scene.add(car1);
        const car2 = Car();
        car2.position.set(13-i*carsDist,carsY,75);
        scene.add(car2);
        const car3 = Car();
        car3.position.set(15-i*carsDist,carsY,78);
        scene.add(car3);

        // set position for obj with car engine audio
        if (i==carRows/2){
            engineAudioMesh.position.set(13-i*carsDist,carsY,75);
        }
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


    const pits = PitsStop(120);
    pits.position.set(-134.95,2.9,-20)
    pits.rotation.y=Math.PI/2;
    scene.add(pits);

    
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

function getAxis(p,q) {
    return (new THREE.Vector3(p.x-q.x, p.y-q.y, p.z-q.z).normalize());
}

function updateRotYaxis(){
    rotYPointB.x = rotYPointA.x + 10*Math.cos(-(Math.PI/2 - cameraRotAngleXZ));
    rotYPointB.z = rotYPointA.z + 10*Math.sin(-(Math.PI/2 - cameraRotAngleXZ));
}

THREE.Object3D.prototype.rotateAroundWorldAxis = function() {

    var q1 = new THREE.Quaternion();
    return function ( point, axis, angle ) {

        q1.setFromAxisAngle( axis, angle );

        this.quaternion.multiplyQuaternions( q1, this.quaternion );

        this.position.sub( point );
        this.position.applyQuaternion( q1 );
        this.position.add( point );

        return this;
    }

}();
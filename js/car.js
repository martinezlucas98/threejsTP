import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { pickRandom, hollowCilinder, prismTrapezie, randomInt } from "./utils.js"

const vehicleColors = ["#a52523","#bdb638","#78b14b","#283747","#8E44AD","#F97919"];

export function Car(){
    const num = randomInt(10,99);

    const chasisLen = 3;
    const chasisHeight = 0.75;
    const chasisDepth = 1.5;


    const car = new THREE.Group();

    const carColor = pickRandom(vehicleColors);

    const backWheel1 = wheel();
    backWheel1.position.y = 0.001;
    backWheel1.position.x = -0.9;
    backWheel1.position.z = chasisDepth/2 - 0.08;
    backWheel1.rotation.x = Math.PI/2;
    car.add(backWheel1);

    const backWheel2 = wheel();
    backWheel2.position.y = 0.001;
    backWheel2.position.x = -0.9;
    backWheel2.position.z = -(chasisDepth/2 - 0.08);
    backWheel2.rotation.x = -Math.PI/2;
    car.add(backWheel2);

    const frontWheel1 = wheel();
    frontWheel1.position.y = 0.001;
    frontWheel1.position.x = 0.9;
    frontWheel1.position.z = chasisDepth/2 - 0.08;
    frontWheel1.rotation.x = Math.PI/2;
    car.add(frontWheel1);

    const frontWheel2 = wheel();
    frontWheel2.position.y = 0.001;
    frontWheel2.position.x = 0.9;
    frontWheel2.position.z = -(chasisDepth/2 - 0.08);
    frontWheel2.rotation.x = -Math.PI/2;
    car.add(frontWheel2);


    const mainChasis = new THREE.Mesh(
        new THREE.BoxBufferGeometry(chasisLen,chasisHeight,chasisDepth),
        new THREE.MeshLambertMaterial({color: carColor})
    );
    mainChasis.position.y=0.35;
    car.add(mainChasis);

    const carbonFiberTexture = new THREE.TextureLoader().load("../textures/carbon_fiber.jpg");
    const wing = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.3,0.06,1.25*chasisDepth),
        new THREE.MeshLambertMaterial({map: carbonFiberTexture})
    );
    wing.position.y=0.95;
    wing.position.x=-(chasisLen/2 -0.03);
    car.add(wing);

    const wingSupport = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.15,0.4,0.2),
        new THREE.MeshLambertMaterial({map: carbonFiberTexture})
    );
    wingSupport.position.y=chasisHeight;
    wingSupport.position.x=-(chasisLen/2 - 0.1);
    car.add(wingSupport);


    const number = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.3, 0.3, 0.01, 32 ),
        [new THREE.MeshLambertMaterial({map:getNumberTexture(num,carColor)}),new THREE.MeshLambertMaterial({map:getNumberTexture(num,carColor)}),new THREE.MeshLambertMaterial({map:getNumberTexture(num,carColor)})]
    );
    number.position.y=mainChasis.position.y;
    number.position.z=chasisDepth/2;
    number.rotation.x = Math.PI/2;
    number.rotation.y = Math.PI/2;
    car.add(number)

    const number2 = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.3, 0.3, 0.005, 32 ),
        [new THREE.MeshLambertMaterial({map:getNumberTexture(num,carColor)}),new THREE.MeshLambertMaterial({map:getNumberTexture(num,carColor)}),new THREE.MeshLambertMaterial({map:getNumberTexture(num,carColor)})]
    );
    number2.position.y=mainChasis.position.y;
    number2.position.z=-chasisDepth/2;
    number2.rotation.x = Math.PI/2;
    number2.rotation.y = -Math.PI/2;
    car.add(number2)

    const cabin = new THREE.Mesh(
        prismTrapezie([-0.825,0,0],[1,0,0],[-0.4125,0.4,0],[0.4125,0.4,0], 1.2),
        new THREE.MeshLambertMaterial({color: 0x282828})
    );
    cabin.position.x = -0.3;
    cabin.position.y = chasisHeight-0.01;
    cabin.position.z = 1.2/2;
    car.add(cabin);
    
    const nose = new THREE.Mesh(
        prismTrapezie([0,0,0],[0.4,0,0],[0,0.75,0],[0.4,0.35,0], chasisDepth),
        new THREE.MeshLambertMaterial({color: carColor})
    );
    nose.position.x = chasisDepth;
    nose.position.y = -0.0245;
    nose.position.z = chasisDepth/2;
    car.add(nose);

    const exhaust1 = new THREE.Mesh(
        hollowCilinder(0.07,0.05,0.13),
        new THREE.MeshPhongMaterial({color: 0x333333})
    );
    exhaust1.position.x = -chasisLen/2;
    exhaust1.position.y = 0.1;
    exhaust1.rotation.y = -Math.PI/2;
    exhaust1.position.z = -chasisDepth/2 + 0.1
    car.add(exhaust1);

    const exhaust2 = new THREE.Mesh(
        hollowCilinder(0.07,0.05,0.13),
        new THREE.MeshPhongMaterial({color: 0x333333})
    );
    exhaust2.position.x = exhaust1.position.x;
    exhaust2.position.y = exhaust1.position.y;
    exhaust2.rotation.y = exhaust1.rotation.y;
    exhaust2.position.z = exhaust1.position.z + 0.12;
    car.add(exhaust2);

    return car;
}

function getNumberTexture(number,carColor){
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(16, 16, 16, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = "#333333";
    context.font = "20px Arial";
    context.fillText(number,6,24);

    return new THREE.CanvasTexture(canvas);

}


export function wheel(){
    const wheelTexture = new THREE.TextureLoader().load("../textures/wheel.png");
    const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.35, 0.35, 0.3, 32 ),
        [new THREE.MeshToonMaterial({color: "rgb(18,18,18)"}),new THREE.MeshPhongMaterial({map:wheelTexture}),new THREE.MeshToonMaterial({color: "rgb(18,18,18)"})]
    );
    return wheel;

}

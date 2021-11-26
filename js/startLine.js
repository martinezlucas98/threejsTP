import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';

const poleColor = 0x4f555f;
export function StartLine(){
    const startObj = new THREE.Group();

    const pillar1 = pillar();
    pillar1.position.set(0,3.5,6);
    startObj.add(pillar1);

    const pillar2 = pillar();
    pillar2.position.set(0,3.5,-6);
    startObj.add(pillar2);

    const top = topBanner();
    top.position.set(0,6.1,0)
    startObj.add(top);

    const trafficLights1 = trafficLights();
    trafficLights1.position.set(0,4.5,-0.8);
    startObj.add(trafficLights1);

    const trafficLights2 = trafficLights();
    trafficLights2.position.set(0,4.5,0);
    startObj.add(trafficLights2);

    const trafficLights3 = trafficLights();
    trafficLights3.position.set(0,4.5,0.8);
    startObj.add(trafficLights3);

    const pole = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.05, 0.05, 12.5, 32 ),
        new THREE.MeshPhongMaterial({color: poleColor})
    );
    pole.position.y = 5;
    pole.rotation.x = Math.PI/2;
    //pole.rotation.z = Math.PI/2;
    startObj.add(pole);

    const sLine = line();
    sLine.position.set(0,0.02,0,);
    startObj.add(sLine);

    return startObj;
}

function pillar(){
    const texture = new THREE.TextureLoader().load("../textures/banner01.jpg");
    const mesh = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2,7,2),
        new THREE.MeshLambertMaterial({map: texture})
    );
    return mesh;
}

function topBanner(){
    const texture = new THREE.TextureLoader().load("../textures/banner02.jpg");
    const mesh = new THREE.Mesh(
        //new THREE.PlaneGeometry(12.5,1.5),
        //new THREE.MeshLambertMaterial({map: texture, side:THREE.DoubleSide})
        new THREE.BoxBufferGeometry(12.5,1.8,0.01),
        new THREE.MeshLambertMaterial({map: texture})
    );
    mesh.rotation.y=Math.PI/2;
    return mesh;
}

function trafficLights(){
    const tl = new THREE.Group();
    const box = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.3,0.8,0.3),
        new THREE.MeshLambertMaterial({color: 0x333333})
    );
    tl.add(box);

    const red = new THREE.Mesh(
        new THREE.CircleGeometry(0.1,32),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    );
    red.position.set(0,-0.25,0.16);
    tl.add(red);

    const yellow = new THREE.Mesh(
        new THREE.CircleGeometry(0.1,32),
        new THREE.MeshBasicMaterial({color: 0xffff00})
    );
    yellow.position.set(0,0,0.16);
    tl.add(yellow);

    const green = new THREE.Mesh(
        new THREE.CircleGeometry(0.1,32),
        new THREE.MeshBasicMaterial({color: 0x00ff00})
    );
    green.position.set(0,0.25,0.16);
    tl.add(green);

    tl.rotation.y=-Math.PI/2;

    return tl;

}

function line(){
    const texture = new THREE.TextureLoader().load("../textures/start_line.png");
    const mesh = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12.5,1,2),
        new THREE.MeshLambertMaterial({map: texture})
    );
    mesh.rotation.y=Math.PI/2;
    return mesh;
}
import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { prismTrapezie, ramp } from './utils.js';

export function Helicopter(){
    const mainColor = "#F97919";

    const heli = new THREE.Group();

    const cabin1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3,0.5,1.5),
        new THREE.MeshPhongMaterial({color: mainColor})
    );
    heli.add(cabin1);

    const cabin2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.5,1,1.5),
        new THREE.MeshPhongMaterial({color: mainColor})
    );
    cabin2.position.set(0.75,0.5,0);
    heli.add(cabin2);

    const tail = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.5, 0.25/2, 4, 4 ),
        new THREE.MeshPhongMaterial({color: mainColor})
    );
    tail.rotation.set(Math.PI/4,0,Math.PI/2);
    tail.position.set(3,0.5,0);
    heli.add(tail);

    const tailHeli1 = new THREE.Mesh(
        prismTrapezie([0,0,0],[0.5,0,0],[0.55,1.2,0],[0.9,1.2,0],0.025),
        new THREE.MeshPhongMaterial({color: mainColor})
    );
    tailHeli1.position.set(4.4,0.6,0);
    heli.add(tailHeli1);

    const tailHeli2 = new THREE.Mesh(
        prismTrapezie([0,0,0],[0.5,0,0],[0.55,-0.8,0],[0.9,-0.8,0],0.025),
        new THREE.MeshPhongMaterial({color: mainColor})
    );
    tailHeli2.position.set(4.25,0.6,0);
    heli.add(tailHeli2);

    const window = new THREE.Mesh(
        ramp(1.5,0.75,1.5),
        new THREE.MeshPhongMaterial({color: 0x000000})
    );
    window.position.set(-1.5,0.25,-0.75);
    heli.add(window);

    const leg1 = leg();
    leg1.position.set(0.5,-0.4,0.7);
    heli.add(leg1);

    const leg2 = leg();
    leg2.position.set(0.5,-0.4,-0.7);
    heli.add(leg2);

    const heliceMesh = helice()
    heliceMesh.position.set(0.5,1.3,0);
    heli.add(heliceMesh);

    const heliceTailMesh = heliceTail()
    heliceTailMesh.rotation.x=Math.PI/2;
    heliceTailMesh.position.set(5,1.4,0.05);
    heli.add(heliceTailMesh);

    return heli;
}

function leg(){
    const legGroup = new THREE.Group();

    const vertical1 = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.025, 0.025, 0.7, 32 ),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    vertical1.position.x = -0.25;
    legGroup.add(vertical1);

    const vertical2 = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.025, 0.025, 0.7, 32 ),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    vertical2.position.x = 0.25;
    legGroup.add(vertical2);

    const horizontal = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.035, 0.035, 2.5, 32 ),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    horizontal.position.set(-0.2,-0.35,0)
    horizontal.rotation.x = Math.PI/2;
    horizontal.rotation.z = Math.PI/2;
    legGroup.add(horizontal);

    return legGroup;
}

function helice(){
    const heliceGroup = new THREE.Group();

    const vertical = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.08, 0.08, 0.5, 32 ),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    heliceGroup.add(vertical);

    const planeHelice1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(7,0.01,0.3),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    planeHelice1.rotation.y=-Math.PI/4;
    planeHelice1.position.set(0,0.2,0);
    heliceGroup.add(planeHelice1);

    const planeHelice2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(7,0.01,0.3),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    planeHelice2.rotation.y=Math.PI/4;
    planeHelice2.position.set(0,0.17,0);
    heliceGroup.add(planeHelice2);

    return heliceGroup;
}

function heliceTail(){
    const heliceGroup = new THREE.Group();

    const vertical = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.04, 0.04, 0.25, 32 ),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    heliceGroup.add(vertical);

    const planeHelice1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1,0.01,0.1),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    planeHelice1.rotation.y=-Math.PI/4;
    planeHelice1.position.set(0,0.1,0);
    heliceGroup.add(planeHelice1);

    return heliceGroup;
}
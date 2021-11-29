import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { wheel } from './car.js';
import { Person } from './person.js';

export function PitsStop(length){
    const pits = new THREE.Group();

    const st = street(length);
    st.position.y=-2.5;
    pits.add(st);

    for (let i=0;i<(length-50);i+=10) {
        const building = pitsBuilding();
        building.position.set(-length/2 + i + 30,0,27);
        pits.add(building);
    }
    

    return pits;
}

function street(length){
    var extrudeSettings = {
        depth : 1,
        steps : 1,
        curveSegments: 32,
        bevelEnabled: true
    };
    const w = 10;
    const d = 20;

    const shape = new THREE.Shape(); // trackBorder

    shape.moveTo(-length/2,0);
    shape.lineTo(-length/2 + 1.5*w, d);

    shape.lineTo(-length/2 + 1.5*w, d+10);
    shape.lineTo(length/2 - 1.5*w, d+10);

    shape.lineTo(length/2 - 1.5*w, d);
    shape.lineTo(length/2, 0);
    shape.lineTo(length/2 - w, 0);
    shape.lineTo(length/2 - 1.85*w, w);
    shape.lineTo(-length/2 + 1.85*w, w);
    shape.lineTo(-length/2 + w, 0);
    shape.lineTo(-length/2,0);

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

   
    const material = new THREE.MeshStandardMaterial( { color: 0x272727 } );
    const mesh = new THREE.Mesh( geometry, material ) ;

    mesh.rotation.x = Math.PI/2;

    return mesh;
}

function pitsBuilding(){
    const building = new THREE.Group();

    const mainBuilding = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5,3,3),
        [
            new THREE.MeshLambertMaterial({color: "rgb(140, 129, 100)"}),
            new THREE.MeshLambertMaterial({color: "rgb(140, 129, 100)"}),
            new THREE.MeshLambertMaterial({color: "rgb(161, 74, 34)"}),
            new THREE.MeshLambertMaterial({color: "rgb(140, 129, 100)"}),
            new THREE.MeshLambertMaterial({color: "rgb(140, 129, 100)"}),
            new THREE.MeshLambertMaterial({color: "rgb(140, 129, 100)"}),
        ]
    );
    mainBuilding.position.y=-3/2;
    building.add(mainBuilding);

    const roof = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5,0.03,2),
        new THREE.MeshLambertMaterial({color: "rgb(161, 74, 34)"}),
    );
    roof.position.set(0,1.5-0.03/2 - 1.5,-2.5);
    building.add(roof);

    const pillar1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.2,3,0.2),
        new THREE.MeshLambertMaterial({color: 0x999999})
    );
    pillar1.position.set(-2.5+2*0.2,-3/2-0.01,-3.5+0.2);
    building.add(pillar1);

    const pillar2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.2,3,0.2),
        new THREE.MeshLambertMaterial({color: 0x999999})
    );
    pillar2.position.set(+2.5-2*0.2,-3/2-0.01,-3.5+0.2);
    building.add(pillar2);

    const doorTexture = new THREE.TextureLoader().load("../textures/sliding_door.jpg");
    const door = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.5,2,0.05),
        new THREE.MeshLambertMaterial({map: doorTexture})
    );
    door.position.set(0,-1.5/2 -1,-1.5-0.01/2);
    building.add(door);

    const light = fluoLight();
    light.position.set(0,-0.5,-1.503);
    building.add(light);

    const wheel1 = wheel();
    wheel1.position.set(-3,-2.2,-1);
    building.add(wheel1);

    const wheel2 = wheel();
    wheel2.position.set(-3,-2.2+0.3,-0.9);
    building.add(wheel2);

    const wheel3 = wheel();
    wheel3.position.set(-3,-2.2+0.6,-1);
    building.add(wheel3);

    const wheel4 = wheel();
    wheel4.position.set(-2.8,-2,0);
    wheel4.rotation.z=Math.PI/3;
    building.add(wheel4);

    const person1 = Person();
    person1.position.set(-2.5,-1.5,-2);
    building.add(person1);

    return building;
}

function fluoLight(){
    const group = new THREE.Group();
    const bulb = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.5,0.07,0.05),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    );
    group.add(bulb);

    const side1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.07,0.07,0.07),
        new THREE.MeshLambertMaterial({color: 0x111111})
    );
    side1.position.x=-1.5/2-0.07/2;
    group.add(side1);

    const side2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.07,0.07,0.07),
        new THREE.MeshLambertMaterial({color: 0x111111})
    );
    side2.position.x=1.5/2+0.07/2;
    group.add(side2);

    const light = new THREE.SpotLight(0xffffff,1);
    light.position.set(0,0,-1.6);
    const targetObj = new THREE.Object3D();
    targetObj.position.set(0,0,0);
    light.target = targetObj;
    light.angle = Math.PI;
    light.distance = 5;
    light.decay=1;

    group.add(light.target);
    group.add(light);

    return group;
}
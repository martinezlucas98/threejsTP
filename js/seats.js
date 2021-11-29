import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { Person } from "./person.js";
import { hollowCilinder } from './utils.js';

export function Seats(len,seatRows,populationPercentage=100){
    const seats = new THREE.Group();

    const seatSize = 1;
    const seatHeight = 1;

    for (let i = 0; i<seatRows; i++){
        let seat = new THREE.Mesh(
            new THREE.BoxBufferGeometry(len,seatHeight*(i+1),seatSize),
            new THREE.MeshLambertMaterial({color: 0x7e7f75})
        );
        seat.position.y = i*0.5;
        seat.position.z = -i;
        seats.add(seat);
    }

    const roofTexture = new THREE.TextureLoader().load("../textures/roof_texture.jpg");
    roofTexture.wrapS = THREE.RepeatWrapping;
    roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.repeat.set(len/15,0);
    const roof = new THREE.Mesh(
        new THREE.BoxBufferGeometry(len,seatRows*seatSize,0.03),
        [new THREE.MeshPhongMaterial( {color: 0xf0f0f0} ), new THREE.MeshPhongMaterial( {color: 0xf0f0f0} ), new THREE.MeshPhongMaterial( {color: 0xf0f0f0} ),
         new THREE.MeshPhongMaterial( {color: 0xf0f0f0} ), new THREE.MeshPhongMaterial( {map: roofTexture} ), new THREE.MeshPhongMaterial( {map: roofTexture} )
         ]
    );
    roof.rotation.x=-Math.PI*2/3;
    roof.position.z = -seatRows*seatSize/2;
    roof.position.y= seatHeight*seatRows+2*seatHeight;
    seats.add(roof);

    const people = populate(seatRows,len,populationPercentage);
    seats.position.y=10;
    seats.add(people);
    

    return seats;
}

export function SeatsVIP(radius,floors){
    if (floors<1){floors=1;}
    const building = new THREE.Group();
    const material = new THREE.MeshLambertMaterial( {color: 0x7e7f75} );
    const glassMaterial = new THREE.MeshPhongMaterial( {color: 0xd8e4e0} );
    glassMaterial.transparent = true;
    glassMaterial.opacity = 0.6;

    const baseTexture = new THREE.TextureLoader().load("../textures/rolex_pirelli.png");
    baseTexture.wrapS = THREE.RepeatWrapping;
    baseTexture.wrapT = THREE.RepeatWrapping;
    baseTexture.repeat.set(5,1);
    const base = new THREE.Mesh( 
        new THREE.CylinderGeometry( radius, radius, 4, 32 ), 
        new THREE.MeshPhongMaterial( {map: baseTexture} )
    );
    base.position.y=2;
    building.add(base)
    
    let currentHeight = 4;
    for (let i=0; i<floors; i++){
        const floor = new THREE.Mesh( 
            new THREE.CylinderGeometry( radius, radius, 0.5, 32 ),//hollowCilinder(radius,radius,0.5), 
            material
        );
        floor.position.y=0.25+currentHeight;
        currentHeight+=4.5;
        building.add(floor);
    }

    const glass = new THREE.Mesh(
        hollowCilinder(radius-0.5,radius-0.5,currentHeight), 
        glassMaterial
    );
    glass.rotation.x=Math.PI/2;
    glass.position.y=currentHeight;
    //currentHeight+=3;
    building.add(glass);

    const roof = new THREE.Mesh( 
        new THREE.CylinderGeometry( radius, radius, 1, 32 ), 
        material
    );
    roof.position.y=0.5+currentHeight;
    currentHeight+=1;
    building.add(roof)
    
    const heliTexture = new THREE.TextureLoader().load("../textures/heliport.png");
    heliTexture.wrapS = THREE.RepeatWrapping;
    heliTexture.wrapT = THREE.RepeatWrapping;
    heliTexture.repeat.set(1,1);
    const heliport = new THREE.Mesh( 
        new THREE.CylinderGeometry( radius/2, radius/2, 0.2, 32 ), 
        new THREE.MeshLambertMaterial( {map: heliTexture} )
    );
    heliport.position.y=0.1+currentHeight;
    heliport.rotation.y=-Math.PI/1.2;
    building.add(heliport)
    
    const elevator = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2,currentHeight+2,2.5),
        material
    );
    elevator.position.set(radius/2 + 3,currentHeight/2 +1.5,-5);
    elevator.rotation.y=-Math.PI/1.2;
    building.add(elevator);

    let elevatorFloorHeight = 4;
    const doorTexture = new THREE.TextureLoader().load("../textures/elevator_door.png");
    for (let i=0; i<floors; i++){
        const door = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1.5,2,0.05),
            new THREE.MeshPhongMaterial({map: doorTexture})
        );
        door.position.set(radius - 2.9,0.5+elevatorFloorHeight+1,-4.5);
        door.rotation.y=Math.PI/2-Math.PI/1.2;
        elevatorFloorHeight+=4.5;
        building.add(door);
    }
    const door = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.5,2,0.05),
        new THREE.MeshPhongMaterial({map: doorTexture})
    );
    door.position.set(radius - 2.9,1+elevatorFloorHeight+1,-4.5);
    door.rotation.y=Math.PI/2-Math.PI/1.2;
    elevatorFloorHeight+=4.5;
    building.add(door);

    const entry = new THREE.Mesh(
        new THREE.BoxBufferGeometry(7,3,2.5),
        [material,new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("../textures/entry_door.jpg")}),material,material,material,material]
    );
    entry.position.set(radius/2 + 3,2,-5);
    entry.rotation.y=-Math.PI/1.2;
    building.add(entry);

    const people = populateVIP(radius-1.5,100,floors);
    people.position.set(0,5.5,0);
    building.add(people);
    
    return building;
}

function populate(seatRows,len,populationPercentage){
    const people = new THREE.Group();

    for (let j =1; j<len-1; j++){
        for (let i = 0; i<seatRows-1; i++){
            let prob = Math.floor(Math.random()*100);
            if (prob<=populationPercentage){
                let person = Person();
                person.position.set(j-len/2,i+1.3,-i);
                people.add(person);
            }
        }
    }

    return people;
}

function populateVIP(radius,populationPercentage,floors){
    const num_segments = 32;
    const people = new THREE.Group();
    for (let j = 0; j<floors; j++){
        for (let i = 0; i < num_segments; i++)   {
            let theta = Math.PI/8 + 1.3*Math.PI*i / num_segments;//get the current angle 
            let x = radius * Math.cos(theta);//calculate the x component 
            let z = radius * Math.sin(theta);//calculate the y component 
            let prob = Math.floor(Math.random()*100);
            if (prob<=populationPercentage){
                let person = Person();
                person.position.set(x,4.5*j,z);
                people.add(person);
            }
        }
    }
    return people;
}
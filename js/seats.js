import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { Person } from "./person.js";

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

function populate(seatRows,len,populationPercentage){
    const people = new THREE.Group();

    for (let j =1; j<len-1; j++){
        for (let i = 0; i<seatRows-1; i++){
            let prob = Math.floor(Math.random()*100);
            if (prob<=populationPercentage){
                let person = Person();
                person.position.y = i+1.3;
                person.position.z = -i;
                person.position.x = j-len/2;
                people.add(person);
            }
        }
    }

    return people;
}
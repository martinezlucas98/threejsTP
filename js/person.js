import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { pickRandom } from "./utils.js";

const shirtColors = ["#a52523","#bdb638","#78b14b","#283747","#8E44AD","#F97919"];
const skinColors = ["#8d5524","#e0ac69","#ffdbac"]

export function Person(){
    const person = new THREE.Group();

    const shirtColor = pickRandom(shirtColors);
    const skinColor = pickRandom(skinColors);

    const head = new THREE.Mesh( 
        new THREE.SphereGeometry( 0.15, 16, 16),
        new THREE.MeshStandardMaterial( { color: skinColor } )
    );
    person.add(head);

    const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3,0.1,0.7,3),//bodyGeometry(),
        new THREE.MeshStandardMaterial( { color: shirtColor } )
    );
    body.position.y=-0.5
    //body.rotation.x = Math.PI;
    person.add(body);
    
    person.position.y = 0.28;

    return person;
}

function bodyGeometry(){
    const points = [];
    for ( let i = 0; i < 14; i ++ ) {
        points.push( new THREE.Vector2( (Math.sin( i * 0.14 ) * 5 + 5)/50, ( i - 5 ) * 2 /50) );
    }
    const geometry = new THREE.LatheGeometry( points,4 );
    return geometry;
}
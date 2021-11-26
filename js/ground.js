import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
import { Track, TrackFuncional } from "./track.js";

export function GroundOld(x,z){
    const ground = new THREE.Group();

    // Grass
    const grassTexture = new THREE.TextureLoader().load("../textures/grass08.png");
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(100,100);
    const grass = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x,5,z),
        new THREE.MeshLambertMaterial({map: grassTexture})//({color: 0x409b06})
    );
    ground.add(grass);
    grass.position.y=-0.7;

    return ground;
}

export function GroundFuncional(x,z){
    const ground = new THREE.Group();

    // Grass
    const grassTexture = new THREE.TextureLoader().load("../textures/grass08.png");
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(100,100);
    const grass = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x,5,z),
        new THREE.MeshLambertMaterial({map: grassTexture})//({color: 0x409b06})
    );
    ground.add(grass);
    grass.position.y=-0.7;

    return ground;
}

export function Ground(x,z){
    var extrudeSettings = {
        depth : 1,
        steps : 1,
        curveSegments: 32,
        bevelEnabled: false
    };

    const ground = new THREE.Group();

    // Grass
    const grassTexture = new THREE.TextureLoader().load("../textures/grass08.png");
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(100,100);

    const blockShape = new THREE.Shape();
    blockShape.moveTo(-x/2,-z/2);
    blockShape.lineTo(x/2,-z/2);
    blockShape.lineTo(x/2,z/2);
    blockShape.lineTo(-x/2,z/2);
    blockShape.lineTo(-x/2,-z/2);


    const track = Track();
    blockShape.holes.push(track)


    const grass = new THREE.Mesh(
        new THREE.ExtrudeGeometry(blockShape, extrudeSettings),
        new THREE.MeshStandardMaterial({color: 0x526f24})//({map: grassTexture})//({color: 0x62842b})
    );

    grass.position.y=-0.5;

    grass.rotation.x = -Math.PI/2;
    ground.add(grass);

    /*const asphalt = new THREE.Mesh( 
        new THREE.PlaneGeometry( x, z),
        new THREE.MeshStandardMaterial( {color: 0x000000, side: THREE.DoubleSide} ) 
     );
    asphalt.rotation.x = -Math.PI/2;*/

    const asphalt = TrackFuncional();
    asphalt.position.set(20,-0.5,80);

    ground.add( asphalt );

    return ground;
}
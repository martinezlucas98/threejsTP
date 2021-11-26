import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';

export function Fence(length, height){
    const fence = new THREE.Group();

    for (let i=0; i<height+0.2; i+=0.2){
        let cable = cableLine(length);
        cable.position.y = i;
        cable.rotation.z = Math.PI/2;
        fence.add(cable);
    }

    for (let i=0; i<length; i+=0.2){
        let cable = cableLine(height);
        cable.position.x = -length/2+i;
        cable.position.y = height/2;
        fence.add(cable);
    }

    return fence
}

function cableLine(length){
    const cable = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.003, 0.003, length, 8 ),
        new THREE.MeshPhongMaterial({color: 0x4f555f})
    );
    
    
    return cable;
}


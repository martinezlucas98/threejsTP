import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';

export function pickRandom(array){
    return array[Math.floor(Math.random()*array.length)];
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function hollowCilinder(r1,r2,ext){ // radius
    var extrudeSettings = {
        depth : ext,
        steps : 1,
        bevelEnabled: false,
        curveSegments: 32
    };
    
    var arcShape = new THREE.Shape();
    arcShape.absarc(0, 0, r1, 0, Math.PI * 2, 0, false);
    
    var holePath = new THREE.Path();
    holePath.absarc(0, 0, r2, 0, Math.PI * 2, true);
    arcShape.holes.push(holePath);
    
    var geometry = new THREE.ExtrudeGeometry(arcShape, extrudeSettings);
    return geometry;
}

export function ellipseRing(rx1,ry1,rx2,ry2,ext){
    var extrudeSettings = {
        depth : ext,
        steps : 1,
        bevelEnabled: false,
        curveSegments: 32
    };

    var arcShape = new THREE.Shape();
    //arcShape.absarc(0, 0, r1, 0, Math.PI * 2, 0, false);

    //var path = new THREE.Shape();
    arcShape.absellipse(0,0,rx1,ry1,0, Math.PI*2, false,0);
    //var arcShape = new THREE.ShapeBufferGeometry( path );

    var holePath = new THREE.Path();
    holePath.absellipse(0,0,rx2,ry2,0, Math.PI*2, true,0);
    arcShape.holes.push(holePath);
    
    var geometry = new THREE.ExtrudeGeometry(arcShape, extrudeSettings);
    return geometry;
}

export function prismTrapezie(v1,v2,v3,v4,depth){// v1 and v2: lower left and right, v3 and v4: upper left and right
    const v1Back = [v1[0],v1[1],v1[2]-depth];
    const v2Back = [v2[0],v2[1],v2[2]-depth];
    const v3Back = [v3[0],v3[1],v3[2]-depth];
    const v4Back = [v4[0],v4[1],v4[2]-depth];

    const vertices = [
        { pos: v1, norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: v2, norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: v3, norm: [ 0,  0,  1], uv: [0, 1], },
        
        { pos: v3, norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: v2, norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: v4, norm: [ 0,  0,  1], uv: [1, 1], },
        // right
        { pos: v2, norm: [ 1,  0,  0], uv: [0, 0], },
        { pos: v2Back, norm: [ 1,  0,  0], uv: [1, 0], },
        { pos: v4, norm: [ 1,  0,  0], uv: [0, 1], },
        
        { pos: v4, norm: [ 1,  0,  0], uv: [0, 1], },
        { pos: v2Back, norm: [ 1,  0,  0], uv: [1, 0], },
        { pos: v4Back, norm: [ 1,  0,  0], uv: [1, 1], },
        // back
        { pos: v2Back, norm: [ 0,  0, -1], uv: [0, 0], },
        { pos: v1Back, norm: [ 0,  0, -1], uv: [1, 0], },
        { pos: v4Back, norm: [ 0,  0, -1], uv: [0, 1], },
        
        { pos: v4Back, norm: [ 0,  0, -1], uv: [0, 1], },
        { pos: v1Back, norm: [ 0,  0, -1], uv: [1, 0], },
        { pos: v3Back, norm: [ 0,  0, -1], uv: [1, 1], },
        // left
        { pos: v1Back, norm: [-1,  0,  0], uv: [0, 0], },
        { pos: v1, norm: [-1,  0,  0], uv: [1, 0], },
        { pos: v3Back, norm: [-1,  0,  0], uv: [0, 1], },
        
        { pos: v3Back, norm: [-1,  0,  0], uv: [0, 1], },
        { pos: v1, norm: [-1,  0,  0], uv: [1, 0], },
        { pos: v3, norm: [-1,  0,  0], uv: [1, 1], },
        // top
        { pos: v4Back, norm: [ 0,  1,  0], uv: [0, 0], },
        { pos: v3Back, norm: [ 0,  1,  0], uv: [1, 0], },
        { pos: v4, norm: [ 0,  1,  0], uv: [0, 1], },
        
        { pos: v4, norm: [ 0,  1,  0], uv: [0, 1], },
        { pos: v3Back, norm: [ 0,  1,  0], uv: [1, 0], },
        { pos: v3, norm: [ 0,  1,  0], uv: [1, 1], },
        // bottom
        { pos: v2, norm: [ 0, -1,  0], uv: [0, 0], },
        { pos: v1, norm: [ 0, -1,  0], uv: [1, 0], },
        { pos: v2Back, norm: [ 0, -1,  0], uv: [0, 1], },
        
        { pos: v2Back, norm: [ 0, -1,  0], uv: [0, 1], },
        { pos: v1, norm: [ 0, -1,  0], uv: [1, 0], },
        { pos: v1Back, norm: [ 0, -1,  0], uv: [1, 1], },
    ];

    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
        uvs.push(...vertex.uv);
    }

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents)
    );
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents)
    );
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents)
    );

    return geometry;


}


export function ramp(w,h,d){
    const shape = new THREE.Shape();

    shape.moveTo(0,0);
    shape.lineTo(w,0);
    shape.lineTo(w,h);
    shape.lineTo(0,0);

    const extrudeSettings = {
        depth : d,
        steps : 1,
        bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    return geometry;
}
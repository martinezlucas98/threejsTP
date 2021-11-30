import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';

export function TrackBorderCurve(moveto,quadratic1,quadratic2,trackWidth){
    var extrudeSettings = {
        depth : 1,
        steps : 1,
        curveSegments: 32,
        bevelEnabled: true
    };

    const tb = new THREE.Shape(); // trackBorder

    tb.moveTo(moveto[0],moveto[1]+1);
    tb.quadraticCurveTo(quadratic1[0],quadratic1[1],quadratic1[2],quadratic1[3]);
    tb.lineTo(quadratic1[2],quadratic1[3]-1);
    tb.quadraticCurveTo(quadratic2[0],quadratic2[1],quadratic2[2],quadratic2[3]);

    var geometry = new THREE.ExtrudeGeometry(tb, extrudeSettings);

    const texture = new THREE.TextureLoader().load("../textures/red_white_stripes.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1/3,1/3);
    const material = new THREE.MeshStandardMaterial( { map: texture } );
    const mesh = new THREE.Mesh( geometry, material ) ;

    mesh.rotation.x = Math.PI/2;

    return mesh;
}

export function TrackBorder(width,height){
    var extrudeSettings = {
        depth : 1,
        steps : 1,
        curveSegments: 32,
        bevelEnabled: true
    };

    const tb = new THREE.Shape(); // trackBorder

    tb.moveTo(0,0);
    tb.lineTo(0,width);
    tb.lineTo(height,width);
    tb.lineTo(height,0);
    tb.lineTo(0,0);

    var geometry = new THREE.ExtrudeGeometry(tb, extrudeSettings);

    const texture = new THREE.TextureLoader().load("../textures/red_white_stripes.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1/3,1/3);
    const material = new THREE.MeshStandardMaterial( { map: texture } );
    const mesh = new THREE.Mesh( geometry, material ) ;

    mesh.rotation.x = Math.PI/2;

    return mesh;
}

export function TrackBorderBezier(moveto,bezier1,bezier2){
    var extrudeSettings = {
        depth : 1,
        steps : 1,
        curveSegments: 32,
        bevelEnabled: true
    };

    const tb = new THREE.Shape(); // trackBorder

    tb.moveTo(moveto[0],moveto[1]);
    tb.bezierCurveTo(bezier1[0],bezier1[1],bezier1[2],bezier1[3],bezier1[4],bezier1[5]);
    tb.bezierCurveTo(bezier2[0],bezier2[1],bezier2[2],bezier2[3],bezier2[4],bezier2[5]);

    var geometry = new THREE.ExtrudeGeometry(tb, extrudeSettings);

    const texture = new THREE.TextureLoader().load("../textures/red_white_stripes.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1/3,1/3);
    const material = new THREE.MeshStandardMaterial( { map: texture } );
    const mesh = new THREE.Mesh( geometry, material ) ;

    mesh.rotation.x = Math.PI/2;

    return mesh;
}
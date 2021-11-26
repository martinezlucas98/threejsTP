import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
export function TrackOld(){
    const tcolor = 0x000000;
    const roadWidth = 8;
    const roadDepth = 0.01;

    const track = new THREE.Group();

    const straight1 = new THREE.Mesh(
        new THREE.PlaneGeometry(200,roadWidth),
        new THREE.MeshBasicMaterial( {color: tcolor, side: THREE.DoubleSide} )
    );
    track.add(straight1);

    const curve1 = new THREE.Mesh(
        new THREE.RingGeometry( 10, 10+roadWidth, 32,1,0,-Math.PI/1.5 ),
        new THREE.MeshBasicMaterial( { color: tcolor, side: THREE.DoubleSide } )
    );
    curve1.position.x=100;
    curve1.position.y=2*roadWidth-2;
    curve1.rotation.z=Math.PI/6;
    track.add(curve1);

    const straight2 = new THREE.Mesh(
        new THREE.PlaneGeometry(50,roadWidth),
        new THREE.MeshBasicMaterial( {color: tcolor, side: THREE.DoubleSide} )
    );
    straight2.position.x=100;
    straight2.position.y=42;
    straight2.rotation.z = -Math.PI/3;
    track.add(straight2);

    const curve2 = new THREE.Mesh(
        new THREE.RingGeometry( 10, 10+roadWidth, 32,1,0,Math.PI/2 ),
        new THREE.MeshBasicMaterial( { color: tcolor, side: THREE.DoubleSide } )
    );
    curve2.position.x=75.8;
    curve2.position.y=56;
    curve2.rotation.z=Math.PI/6;
    track.add(curve2);

    const straight3 = new THREE.Mesh(
        new THREE.PlaneGeometry(50,roadWidth),
        new THREE.MeshBasicMaterial( {color: tcolor, side: THREE.DoubleSide} )
    );
    straight3.position.x=48;
    straight3.position.y=56;
    straight3.rotation.z = Math.PI/6;
    track.add(straight3);

    const curve3 = new THREE.Mesh(
        new THREE.RingGeometry( 10, 10+roadWidth, 32,1,0,Math.PI/1.1 ),
        new THREE.MeshBasicMaterial( { color: tcolor, side: THREE.DoubleSide } )
    );
    curve3.position.x=23;
    curve3.position.y=57.5;
    curve3.rotation.z=Math.PI/1.2;
    track.add(curve3);

    const straight4 = new THREE.Mesh(
        new THREE.PlaneGeometry(30,roadWidth),
        new THREE.MeshBasicMaterial( {color: tcolor, side: THREE.DoubleSide} )
    );
    straight4.position.x=17.5;
    straight4.position.y=76;
    straight4.rotation.z = Math.PI/3;
    track.add(straight4);

    const curve4 = new THREE.Mesh(
        new THREE.RingGeometry( 10, 10+roadWidth, 32,1,0,Math.PI/1.5 ),
        new THREE.MeshBasicMaterial( { color: tcolor, side: THREE.DoubleSide } )
    );
    curve4.position.x=11;
    curve4.position.y=93;
    curve4.rotation.z=-Math.PI/6;
    track.add(curve4);

    const straight5 = new THREE.Mesh(
        new THREE.PlaneGeometry(112,roadWidth),
        new THREE.MeshBasicMaterial( {color: tcolor, side: THREE.DoubleSide} )
    );
    straight5.position.x=-45;
    straight5.position.y=106.9;
    track.add(straight5);

    const curve5 = new THREE.Mesh(
        new THREE.RingGeometry( 10, 10+roadWidth, 32,1,0,-Math.PI/2 ),
        new THREE.MeshBasicMaterial( { color: tcolor, side: THREE.DoubleSide } )
    );
    curve5.position.x=-100;
    curve5.position.y=93;
    curve5.rotation.z=Math.PI;
    track.add(curve5);

    const straight6 = new THREE.Mesh(
        new THREE.PlaneGeometry(85,roadWidth),
        new THREE.MeshBasicMaterial( {color: tcolor, side: THREE.DoubleSide} )
    );
    straight6.position.x=-114;
    straight6.position.y=53;
    straight6.rotation.z = Math.PI/2
    track.add(straight6);

    const curve6 = new THREE.Mesh(
        new THREE.RingGeometry( 10, 10+roadWidth, 32,1,0,-Math.PI/2 ),
        new THREE.MeshBasicMaterial( { color: tcolor, side: THREE.DoubleSide } )
    );
    curve6.position.x=-100;
    curve6.position.y=14;
    curve6.rotation.z=-Math.PI/2;
    track.add(curve6);


    track.rotation.x=-Math.PI/2;


    return track;
}

// Actual track mesh
export function TrackFuncional(){
    var extrudeSettings = {
        depth : 1,
        steps : 1,
        curveSegments: 32,
        bevelEnabled: false
    };

    const tcolor = 0x000000;
    const roadWidth = 10;

    const track = new THREE.Group();

    const ts = new THREE.Shape(); // trackShape

    ts.moveTo(0,0);
    ts.lineTo(100,0);

    ts.bezierCurveTo(150,0,130,35,125,40);
    //ts.quadraticCurveTo(145,5,125,35);

    ts.lineTo(70,95);

    //ts.bezierCurveTo(35,115,35,100,10,105);
    ts.quadraticCurveTo(63,102,50,100);

    ts.bezierCurveTo(-127,85,85,200,-50,200);

    ts.lineTo(-150,200);

    //ts.bezierCurveTo(-166,205,-182,188,-165,174);
    ts.quadraticCurveTo(-167,198,-165,174);

    ts.lineTo(-165,18);

    //ts.bezierCurveTo(-71,5,-60,-5,-0,0);
    ts.quadraticCurveTo(-165,0,-150,0);

    ts.lineTo(-0,0);

    ts.holes.push(trackHole(roadWidth));

    //const geometry = new THREE.ShapeGeometry( ts );
    var geometry = new THREE.ExtrudeGeometry(ts, extrudeSettings);

    const material = new THREE.MeshStandardMaterial( { color: 0x272727 } );
    const mesh = new THREE.Mesh( geometry, material ) ;

    track.add(mesh);

    track.rotation.x=-Math.PI/2;

    return track;
}

function trackHole(roadWidth){
    /*var extrudeSettings = {
        depth : 1,
        steps : 1,
        curveSegments: 32,
        bevelEnabled: false
    };*/

    //const tcolor = 0xffffff;
    //const roadWidth = 10;

    //const track = new THREE.Group();

    const ts = new THREE.Path(); // trackShape

    ts.moveTo(0,0+roadWidth);
    ts.lineTo(100,0+roadWidth);

    var auxX = roadWidth*Math.sin(0.85);
    var auxY = roadWidth*Math.cos(0.85);
    ts.bezierCurveTo(150-roadWidth,0+roadWidth,130-1.3*auxX,35-0.9*auxY,125-auxX,40-auxY);
    //ts.quadraticCurveTo(145,5,125,35);
 
    ts.lineTo(70-auxX,95-auxY);

    //ts.bezierCurveTo(35,115,35,100,10,105);
    ts.quadraticCurveTo(63-roadWidth/1.5,102-1.1*roadWidth,50,100-roadWidth);

    ts.bezierCurveTo(-127-1.5*roadWidth,85-roadWidth,85-2.3*roadWidth,200-roadWidth,-50,200-roadWidth);

    ts.lineTo(-150,200-roadWidth);

    //ts.bezierCurveTo(-166,205,-182,188,-165,174);
    ts.quadraticCurveTo(-167+roadWidth,198-roadWidth,-165+roadWidth,174);

    ts.lineTo(-165+roadWidth,18);

    //ts.bezierCurveTo(-71,5,-60,-5,-0,0);
    ts.quadraticCurveTo(-165+roadWidth,0+roadWidth,-150+roadWidth,0+roadWidth);

    ts.lineTo(-0,0+roadWidth);

    //const geometry = new THREE.ShapeGeometry( ts );
    //var geometry = new THREE.ExtrudeGeometry(ts, extrudeSettings);

    //const material = new THREE.MeshBasicMaterial( { color: tcolor } );
    //const mesh = new THREE.Mesh( geometry, material ) ;

    //track.add(mesh);

    //track.rotation.x=-Math.PI/2;

    return ts;
}

// Path to make hole on ground/grass
export function Track(){
    const posX = 20;
    const posZ = -80;
    const roadWidth = 10;

    const ts = new THREE.Path(); // trackShape

    // OUTER
    ts.moveTo(0+posX,0+posZ);
    ts.lineTo(100+posX,0+posZ);
    ts.bezierCurveTo(150+posX,0+posZ,130+posX,35+posZ,125+posX,40+posZ);
    ts.lineTo(70+posX,95+posZ);
    ts.quadraticCurveTo(63+posX,102+posZ,50+posX,100+posZ);
    ts.bezierCurveTo(-127+posX,85+posZ,85+posX,200+posZ,-50+posX,200+posZ);
    ts.lineTo(-150+posX,200+posZ);
    ts.quadraticCurveTo(-167+posX,198+posZ,-165+posX,174+posZ);
    ts.lineTo(-165+posX,18+posZ);
    ts.quadraticCurveTo(-165+posX,0+posZ,-150+posX,0+posZ);
    ts.lineTo(-0.01+posX,0+posZ);

    // INNER
    ts.lineTo(-0.01+posX,0+roadWidth+posZ);
    ts.lineTo(-150+roadWidth+posX,0+roadWidth+posZ);
    ts.quadraticCurveTo(-165+roadWidth+posX,0+roadWidth+posZ,-165+roadWidth+posX,18+posZ);
    ts.lineTo(-165+roadWidth+posX,174+posZ);
    ts.quadraticCurveTo(-167+roadWidth+posX,198-roadWidth+posZ,-150+posX,200-roadWidth+posZ);
    ts.lineTo(-50+posX,200-roadWidth+posZ);
    ts.bezierCurveTo(85-2.3*roadWidth+posX,200-roadWidth+posZ,-127-1.5*roadWidth+posX,85-roadWidth+posZ,50+posX,100-roadWidth+posZ);
    var auxX = roadWidth*Math.sin(0.85);
    var auxY = roadWidth*Math.cos(0.85);
    ts.quadraticCurveTo(63-roadWidth/1.5+posX,102-1.1*roadWidth+posZ,70-auxX+posX,95-auxY+posZ);
    ts.lineTo(125-auxX+posX,40-auxY+posZ);
    ts.bezierCurveTo(130-1.3*auxX+posX,35-0.9*auxY+posZ,150-roadWidth+posX,0+roadWidth+posZ,100+posX,0+roadWidth+posZ);
    ts.lineTo(0+posX,0+roadWidth+posZ);
    ts.lineTo(0+posX,0+posZ);


    return ts;
}
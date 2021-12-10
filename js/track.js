import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';

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
import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';
const lampColor = 0x4f555f;

export function LightpoleOld(){
    const lightpole = new THREE.Group();

    const mainPol = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.05, 0.05, 5, 32 ),
        new THREE.MeshToonMaterial({color: lampColor})
    );
    lightpole.position.y=2.5;
    lightpole.add(mainPol);

    const supportPole = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.05, 0.05, 2, 32 ),
        new THREE.MeshToonMaterial({color: lampColor})
    );
    supportPole.position.y = 2.3;
    supportPole.rotation.x = Math.PI/2;
    supportPole.rotation.z = Math.PI/2;
    lightpole.add(supportPole);

    const lantern1 = lantern(0.3,0.4,0.1);
    lantern1.position.y=supportPole.position.y;
    lantern1.position.x = -1;
    lantern1.rotation.x=Math.PI/8;
    lightpole.add(lantern1);

    const lantern2 = lantern(0.3,0.4,0.1);
    lantern2.position.y=supportPole.position.y;
    lantern2.position.x = -0.35;
    lantern2.rotation.x=lantern1.rotation.x
    lightpole.add(lantern2);

    const lantern3 = lantern(0.3,0.4,0.1);
    lantern3.position.y=supportPole.position.y;
    lantern3.position.x = 0.35;
    lantern3.rotation.x=lantern1.rotation.x
    lightpole.add(lantern3);

    const lantern4 = lantern(0.3,0.4,0.1);
    lantern4.position.y=supportPole.position.y;
    lantern4.position.x = 1;
    lantern4.rotation.x=lantern1.rotation.x
    lightpole.add(lantern4);
    

    return lightpole;
}

export function Lightpole(){
    const lightpole = new THREE.Group();

    const mainPol = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.05, 0.05, 6.2, 32 ),
        new THREE.MeshPhongMaterial({color: lampColor})
    );
    lightpole.position.y=3.1;
    lightpole.add(mainPol);

    const supportPole = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.05, 0.05, 2, 32 ),
        new THREE.MeshPhongMaterial({color: lampColor})
    );
    supportPole.position.y = 2.3;
    supportPole.rotation.x = Math.PI/2;
    supportPole.rotation.z = Math.PI/2;
    lightpole.add(supportPole);

    const supportPole2 = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.05, 0.05, 2, 32 ),
        new THREE.MeshPhongMaterial({color: lampColor})
    );
    supportPole2.position.y = 3;
    supportPole2.rotation.x = Math.PI/2;
    supportPole2.rotation.z = Math.PI/2;
    lightpole.add(supportPole2);


    // LANTERNS
    const lanternW=0.3;
    const lanternH=0.4;
    const lanternD=0.1;
    const lantern1 = lantern(lanternW,lanternH,lanternD);
    lantern1.position.y=supportPole.position.y;
    lantern1.position.x = -1;
    lantern1.rotation.x=Math.PI/8;
    lightpole.add(lantern1);
    lightpole.add(light(lantern1.position));

    const lantern2 = lantern(lanternW,lanternH,lanternD);
    lantern2.position.y=supportPole.position.y;
    lantern2.position.x = -0.35;
    lantern2.rotation.x=lantern1.rotation.x
    lightpole.add(lantern2);
    lightpole.add(light(lantern2.position));

    const lantern3 = lantern(lanternW,lanternH,lanternD);
    lantern3.position.y=supportPole.position.y;
    lantern3.position.x = 0.35;
    lantern3.rotation.x=lantern1.rotation.x
    lightpole.add(lantern3);
    lightpole.add(light(lantern3.position));

    const lantern4 = lantern(lanternW,lanternH,lanternD);
    lantern4.position.y=supportPole.position.y;
    lantern4.position.x = 1;
    lantern4.rotation.x=lantern1.rotation.x
    lightpole.add(lantern4);
    lightpole.add(light(lantern4.position));


    const lantern5 = lantern(lanternW,lanternH,lanternD);
    lantern5.position.y=supportPole2.position.y;
    lantern5.position.x = -1;
    lantern5.rotation.x=Math.PI/8;
    lightpole.add(lantern5);
    lightpole.add(light(lantern5.position));

    const lantern6 = lantern(lanternW,lanternH,lanternD);
    lantern6.position.y=supportPole2.position.y;
    lantern6.position.x = -0.35;
    lantern6.rotation.x=lantern1.rotation.x
    lightpole.add(lantern6);
    lightpole.add(light(lantern6.position));

    const lantern7 = lantern(lanternW,lanternH,lanternD);
    lantern7.position.y=supportPole2.position.y;
    lantern7.position.x = 0.35;
    lantern7.rotation.x=lantern1.rotation.x
    lightpole.add(lantern7);
    lightpole.add(light(lantern7.position));

    const lantern8 = lantern(lanternW,lanternH,lanternD);
    lantern8.position.y=supportPole2.position.y;
    lantern8.position.x = 1;
    lantern8.rotation.x=lantern1.rotation.x
    lightpole.add(lantern8);
    lightpole.add(light(lantern8.position));
    

    return lightpole;
}

function lantern(w,h,d){
    const lant = new THREE.Group();

    const lightCase = new THREE.Mesh(
        new THREE.BoxBufferGeometry(w,h,d),
        new THREE.MeshPhongMaterial({color: lampColor})
    );
    lant.add(lightCase);

    const lightbulb = new THREE.Mesh(
        new THREE.BoxBufferGeometry(w-w/8,(2/3)*h,0.01),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    );

    const posY = (1/3)*h/2 - w/16 ;
    const posZ = d/2+0.001;

    lightbulb.position.y = posY;
    lightbulb.position.z = posZ;
    lant.add(lightbulb);

    //const light = new THREE.PointLight(0xffffff,0.7,20);
    //light.position.set(0,posY,2*posZ);
    //lant.add(light);

    return lant;
}

function light(pos){
    const l = new THREE.Group();
    const light = new THREE.SpotLight(0xffffff,0.3);
    light.position.set(pos.x,pos.y,pos.z);
    const targetObj = new THREE.Object3D();
    targetObj.position.set(pos.x,1,4);//applyQuaternion(new THREE.Quaternion(new THREE.Vector3(0,0,4),0));
    light.target = targetObj;
    //light.angle = Math.PI/6;
    light.distance = 100;

    l.add(light.target);
    l.add(light);
    
    //const helper = new THREE.SpotLightHelper(light);
    //helper.update();
    //l.add(helper);
    //helper.update();

    //const lightShine = new THREE.PointLight(0xffffff,2,0.5);
    //lightShine.position.set(pos.x,pos.y,pos.z+0.1);
    //const helper2 = new THREE.PointLightHelper(lightShine);
    //l.add(lightShine);
    //l.add(helper2);


    return l;
}
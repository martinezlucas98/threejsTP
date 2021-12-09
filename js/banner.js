import * as THREE from 'https://cdn.skypack.dev/three@0.134.0';

const bannerImgs = ["../textures/banners01.jpeg","../textures/banners02.jpg","../textures/banners03.jpg"];
export function Banner(imgId=0){
    const texture = new THREE.TextureLoader().load(bannerImgs[imgId]);

    const banner = new THREE.Group();

    const img = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5,1.5,0.02),
        [new THREE.MeshLambertMaterial({color: 0xecf0f1}),
        new THREE.MeshLambertMaterial({color: 0xecf0f1}),
        new THREE.MeshLambertMaterial({color: 0xecf0f1}),
        new THREE.MeshLambertMaterial({color: 0xecf0f1}),
        new THREE.MeshLambertMaterial({map: texture}),
        new THREE.MeshLambertMaterial({color: 0xecf0f1})]
    );
    img.rotation.x=-0.4;
    banner.add(img);

    const pol1 = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.02, 0.02, 1, 32 ),
        new THREE.MeshPhongMaterial({color: "rgb(192,192,192)"})
    );
    pol1.position.set(-2.4,0,-0.222);
    banner.add(pol1);

    const pol2 = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.02, 0.02, 1, 32 ),
        new THREE.MeshPhongMaterial({color: "rgb(192,192,192)"})
    );
    pol2.position.set(2.4,0,-0.222);
    banner.add(pol2);


    return banner;
}
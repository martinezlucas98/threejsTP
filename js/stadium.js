import { ellipseRing } from "./utils.js";

export function Stadium(fieldX,fieldY,seatRows){
    const stadium = new THREE.Group();

    const seatSize = 1;

    for (let i = 0; i<seatRows; i++){
        let smallX = fieldX+(seatSize*i);
        let smallY = fieldY+(seatSize*i);
        let bigX = smallX+seatSize;
        let bigY = smallY+seatSize;

        let seat = new THREE.Mesh(
            ellipseRing(bigX,bigY,smallX,smallY,1),
            new THREE.MeshLambertMaterial({color: 0x333333})
        );
        seat.rotation.x = Math.PI/2;
        seat.position.y = i*0.5;
        stadium.add(seat);

    }


    return stadium;
}
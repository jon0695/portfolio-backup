import {GameObject} from './gameObjects.js';
import {randomCords} from './globals.js';
export class Apple extends GameObject {
    pieceType = 'apple';
    src = './images/svg/apple.svg';

    static returnRandomApple = () => {
        let cords = randomCords();
        console.log("randomApple cords : " + cords.x + "," + cords.y);
        let randomApple = new Apple(cords.x, cords.y);
        return randomApple;
    }
}

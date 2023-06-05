import { Movable } from './gameObjects.js';

export default class Player extends Movable {
    constructor(x, y, z) {//z will be for the div where the controls are supposed to be.
        //console.log("Running 'Player constructor' : "+z);
        super(x, y);

        document.getElementById("right").addEventListener('click', () => this.moveRight(this));
        document.getElementById("left").addEventListener('click', () => this.moveLeft(this));
        document.getElementById("up").addEventListener('click', () => this.moveUp(this));
        document.getElementById("down").addEventListener('click', () => this.moveDown(this));
    }

    pieceType = 'player';
    src = './images/svg/snake-head.svg';
    snakeLength = 1;
    
}
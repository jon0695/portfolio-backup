import { GRID_SIZE, GRID_WIDTH, GRID_HEIGHT } from './globals.js';
import { GameObjectTracker } from './objectTracker.js';
class GameObject {
    id;
    pieceType;
    src;
    x;
    y;
    oldX;
    oldY;
    constructor(x, y) {
        //console.log("Running 'GameObject construtor' : x=" + x + " y=" + y);
        this.id = Math.random() * 3000;
        this.x = x;
        this.y = y;
        this.oldY = y;
        this.oldX = x;
    }
    
}

export class Movable extends GameObject{
    moveRight(player) {
        console.log("Running 'moveRight()' in Movable, with pieceType : " + player.pieceType);

        if(player.x < GRID_WIDTH -1){
            this.saveLastMove(player);
            player.x++;
            GameObjectTracker.movePiece(player);
        } else{
            console.log("Tried to move outside play area.");
        }
    }
    moveLeft(player) {
        console.log("Running 'moveLeft()' in Movable, with pieceType : " + player.pieceType);

        if(player.x > 0){
            this.saveLastMove(player);
            player.x--;
            GameObjectTracker.movePiece(player);
        } else{
            console.log("Tried to move outside play area.");
        }
    }
    moveUp(player) {
        console.log("Running 'moveUp()' in Movable, with pieceType : " + player.pieceType);

        if(player.y < GRID_HEIGHT -1){
            this.saveLastMove(player);
            player.y++;
            GameObjectTracker.movePiece(player);
        } else{
            console.log("Tried to move outside play area.");
        }
    }
    moveDown(player) {
        console.log("Running 'moveDown()' in Movable, with pieceType : " + player.pieceType);

        if(player.y > 0){
            this.saveLastMove(player);
            player.y--;
            GameObjectTracker.movePiece(player);
        } else{
            console.log("Tried to move outside play area.");
        }
    }
    saveLastMove(player){
        player.oldX = player.x;
        player.oldY = player.y;
    }
}

class Apple extends GameObject {
    pieceType = 'apple';
    src = './images/svg/apple.svg';
}

class Placeholder extends GameObject {
    pieceType = 'placeholder';
    src = './images/svg/placeholder.svg';
}

class BlankSpace extends GameObject {
    pieceType = 'blank';
    src = './images/svg/blank.svg';
}

export {
    GameObject,
    Apple,
    Placeholder,
    BlankSpace
}
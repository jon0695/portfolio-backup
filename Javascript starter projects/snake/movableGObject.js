import { GRID_WIDTH, GRID_HEIGHT } from './globals.js';
import { GameObjectTracker } from './objectTracker.js';
import {GameObject} from "./gameObjects.js";

export class Movable extends GameObject {

    move(moveObject, cords) {//Moveable, {x:number, y:number}
        console.log("Running 'move()' in Movable");
        //console.log("Checking cords.x : " + cords.x + ", Against GRID_WIDTH : " + (GRID_WIDTH - 1));
        if (cords.x < (GRID_WIDTH - 1) && cords.x >= 0) {
            if (cords.y < (GRID_HEIGHT - 1) && cords.y >= 0) {
                //console.log("Checking cords.y : " + cords.x + ", Against GRID_HEIGHT : " + (GRID_HEIGHT - 1));
                this.saveLastMove(moveObject);
                moveObject.x = cords.x;
                moveObject.y = cords.y;
                GameObjectTracker.movePiece(moveObject);
            } else {
                console.log("Tried to move vertically outside play area.");
            }
        } else {
            console.log("Tried to move horizontally outside play area.");
        }
    }

    moveRight(player) {
        console.log("Running 'moveRight()' in Movable, with pieceType : " + player.pieceType);
        this.move(
            player,
            {
                x: player.x + 1,
                y: player.y
            }
        );
    }

    moveLeft(player) {
        console.log("Running 'moveLeft()' in Movable, with pieceType : " + player.pieceType);
        this.move(
            player,
            {
                x: player.x - 1,
                y: player.y
            }
        );
    }

    moveUp(player) {
        console.log("Running 'moveUp()' in Movable, with pieceType : " + player.pieceType);
        this.move(
            player,
            {
                x: player.x,
                y: player.y + 1
            }
        );
    }

    moveDown(player) {
        console.log("Running 'moveDown()' in Movable, with pieceType : " + player.pieceType);
        this.move(
            player,
            {
                x: player.x,
                y: player.y - 1
            }
        );
    }

    saveLastMove(player) {
        console.log("Running 'saveLastMove() in Movable");
        player.oldX = player.x;
        player.oldY = player.y;
    }
}
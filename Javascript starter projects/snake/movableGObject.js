import { GRID_WIDTH, GRID_HEIGHT } from './globals.js';
import { GameObjectTracker } from './objectTracker.js';
import {GameObject} from "./gameObjects.js";
import {WallObject} from './wallGObject.js';

export class Movable extends GameObject {

    constructor(x,y){
        super(x,y);
    }

    move(moveObject) {//Moveable, {x:number, y:number}
        //console.log("Running 'move()' in Movable");
        //console.log("Checking cords.x : " + cords.x + ", Against GRID_WIDTH : " + (GRID_WIDTH - 1));
        let cords = this.determineDirection(moveObject);

        if (cords.x < (GRID_WIDTH) && cords.x >= 0) {
            if (cords.y < (GRID_HEIGHT) && cords.y >= 0) {
                //console.log("Checking cords.y : " + cords.x + ", Against GRID_HEIGHT : " + (GRID_HEIGHT - 1));
                this.saveLastMove(moveObject);
                moveObject.x = cords.x;
                moveObject.y = cords.y;
                let overlap = GameObjectTracker.drawPiece(moveObject);
                console.log("Overlap returned " + overlap);
                if(overlap){
                    console.log(moveObject.pieceType+" sees an overlap with " + overlap.pieceType);
                    return moveObject.handleCollision(overlap);
                }
                return true;//used elsewhere to ensure the player actually moved.
            } else {
                console.log("Tried to move vertically outside play area.");
            }
        } else {
            console.log("Tried to move horizontally outside play area.");
        }
        GameObjectTracker.drawPiece(moveObject);
        moveObject.handleCollision(new WallObject());
        return false;
    }

    handleCollision(collided){
        console.log("Calling this means you should have implemented this method in a class that extended it, or it's a thing that should never have collided.");
    }

    determineDirection(player){
        //console.log("Running 'determineDircetion("+ player.pieceType +")' : direction = " + player.direction);
        let newX = player.x;
        let newY = player.y;
        switch(player.direction){
            case "north":
                newY++;
                break;
            case "south":
                newY--;
                break;
            case "east":
                newX++;
                break;
            case "west":
                newX--;
                break;
            default:
                console.log("Ran the default case, that shouldn't have happened");
                break;
        }
        return {x:newX,y:newY};
    }


    saveLastMove(piece) {
        //console.log("Running 'saveLastMove() in Movable");
        piece.oldX = piece.x;
        piece.oldY = piece.y;
    }
}
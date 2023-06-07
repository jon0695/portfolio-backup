import { GRID_WIDTH, GRID_HEIGHT } from './globals.js';
import { GameObjectTracker } from './objectTracker.js';
import {GameObject} from "./gameObjects.js";

export class Movable extends GameObject {

    move(moveObject) {//Moveable, {x:number, y:number}
        //console.log("Running 'move()' in Movable");
        //console.log("Checking cords.x : " + cords.x + ", Against GRID_WIDTH : " + (GRID_WIDTH - 1));
        let cords = this.determineDirection(moveObject);

        if (cords.x < (GRID_WIDTH - 1) && cords.x >= 0) {
            if (cords.y < (GRID_HEIGHT - 1) && cords.y >= 0) {
                //console.log("Checking cords.y : " + cords.x + ", Against GRID_HEIGHT : " + (GRID_HEIGHT - 1));
                this.saveLastMove(moveObject);
                moveObject.x = cords.x;
                moveObject.y = cords.y;
                let overlap = GameObjectTracker.movePiece(moveObject);
                console.log("Overlap returned " + overlap);
                if(overlap){
                    console.log(this.pieceType+" sees an overlap with " + overlap.pieceType);
                }
                return true;
            } else {
                console.log("Tried to move vertically outside play area.");
            }
        } else {
            console.log("Tried to move horizontally outside play area.");
        }
        return false;
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

    // moveRight(player) {
    //     //console.log("Running 'moveRight()' in Movable, with pieceType : " + player.pieceType);
    //     player.direction = 'east';
    // }

    // moveLeft(player) {
    //     //console.log("Running 'moveLeft()' in Movable, with pieceType : " + player.pieceType);
    //     this.move(
    //         player,
    //         {
    //             x: player.x - 1,
    //             y: player.y
    //         }
    //     );
    // }

    // moveUp(player) {
    //     //console.log("Running 'moveUp()' in Movable, with pieceType : " + player.pieceType);
    //     this.move(
    //         player,
    //         {
    //             x: player.x,
    //             y: player.y + 1
    //         }
    //     );
    // }

    // moveDown(player) {
    //     //console.log("Running 'moveDown()' in Movable, with pieceType : " + player.pieceType);
    //     this.move(
    //         player,
    //         {
    //             x: player.x,
    //             y: player.y - 1
    //         }
    //     );
    // } 
    
    //likely dead for good 53-89

    saveLastMove(player) {
        //console.log("Running 'saveLastMove() in Movable");
        player.oldX = player.x;
        player.oldY = player.y;
    }
}
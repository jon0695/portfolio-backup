import { Movable } from './movableGObject.js';
import { BodyObject } from './playerBodyObject.js';
import { TailObject } from './playerTailObject.js';
import { GameObjectTracker } from './objectTracker.js';
import { GRID_WIDTH, GRID_HEIGHT } from './globals.js';

export default class Player extends Movable {
    constructor(x, y, startingLength) {//cords and player's starting length
        //console.log("Running 'Player constructor' : "+z);
        super(x, y);
        this.snakeLength = startingLength;
        this.initSnakeBodyArray();
        document.getElementById("right").addEventListener('click', () => this.moveRight(this));
        document.getElementById("left").addEventListener('click', () => this.moveLeft(this));
        document.getElementById("up").addEventListener('click', () => this.moveUp(this));
        document.getElementById("down").addEventListener('click', () => this.moveDown(this));
    }

    pieceType = 'player';
    src = './images/svg/snake-head.svg';
    snakeLength = 4;//Plus the head
    snakeBody = [];
    moveHistory = [];

    //realized this class needs it's own implementation of this method
    move(player, cords) {//Player, {x:number, y:number}
        console.log("Running 'move()' in Movable");
        //console.log("Checking cords.x : " + cords.x + ", Against GRID_WIDTH : " + (GRID_WIDTH - 1));
        if (cords.x < (GRID_WIDTH) && cords.x >= 0) {
            if (cords.y < (GRID_HEIGHT) && cords.y >= 0) {
                //console.log("Checking cords.y : " + cords.x + ", Against GRID_HEIGHT : " + (GRID_HEIGHT - 1));
                player.saveLastMove(player);
                player.x = cords.x;
                player.y = cords.y;
                GameObjectTracker.movePiece(player);
                player.moveBody(player);
            } else {
                console.log("Tried to move vertically outside play area.");
            }
        } else {
            console.log("Tried to move horizontally outside play area.");
        }
    }

    saveLastMove(player) {
        console.log("Running 'saveLastMove()' in Player");
        player.oldX = player.x;
        player.oldY = player.y;
        player.moveHistory.unshift({ x: player.x, y: player.y });

        if (player.moveHistory.length > player.snakeLength) {
            //console.log("Removing oldest item in 'moveHistory'");
            player.moveHistory.splice(player.moveHistory.length - 1, 1);
        }
        //console.log("Added to moveHistory");
        //player.logMoveHistory(player);
    }

    moveBody(player) {
        console.log("Running 'manageBody()'");
        //player.logSnakeBodyArray(player);
        for (let m = 0; m < player.moveHistory.length; m++) {
            //console.log(player.snakeBody[m].pieceType);

            let segment = player.snakeBody[m];
            //console.log(segment);
            segment.oldX = segment.x;
            segment.oldY = segment.y;

            segment.x = player.moveHistory[m].x;
            segment.y = player.moveHistory[m].y;

            if (segment.onBoard === false) {
                GameObjectTracker.addPieceToBoard(player.snakeBody[m]);
            } else {
                GameObjectTracker.movePiece(segment);
            }
        }

    }

    changeBodyCords(player) {

    }

    logMoveHistory(player) {
        console.log("Running 'logMoveHistory("+player.pieceType+")' in Player");
        let logString = '';
        // console.log(player.moveHistory);
        for (let move of player.moveHistory) {
            logString += ("(" + move.x + "," + move.y + ")");
        }
        console.log(logString);
    }

    initSnakeBodyArray() {
        console.log("Running 'initSnakeBodyArray()'");
        for (let i = 0; i < this.snakeLength - 1; i++) {
            this.snakeBody.push(new BodyObject(this.x, this.y));
        }
        this.snakeBody.push(new TailObject(this.x, this.y));
        this.logSnakeBodyArray(this);
    }

    addToSnakeBodyArray(numberToAdd){
        console.log("Runnig 'addToSnakeBodyArray("+ numberToAdd +")'")
        for(let i = 0; i < numberToAdd;i++){
            this.snakeLength++;
            this.snakeBody.splice(this.snakeBody.length-1,0,
                 new BodyObject(this.x, this.y));
        }
    }

    logSnakeBodyArray(player) {
        let logString = 'Body Segments : ';
        for (let segment of player.snakeBody) {
            logString += ("(" + segment.x + "," + segment.y + ") '" + segment.pieceType + "'");
        }
        console.log(logString);
    }
}
import {PlayerSegment} from './playerSegmentGObject.js';
import {Apple} from './appleGObject.js';
import { BodyObject } from './playerBodyGObject.js';
import { TailObject } from './playerTailGObject.js';
import { GameObjectTracker } from './objectTracker.js';
import { GRID_WIDTH, GRID_HEIGHT } from './globals.js';

export default class PlayerHead extends PlayerSegment {
    constructor(x, y, startingLength) {//cords and player's starting length
        //console.log("Running 'Player constructor' : "+z);
        super(x, y, 0);
        this.snakeLength = startingLength;
        this.initSnakeBodyArray();
        document.getElementById("right").addEventListener('click', () => this.changeDirection("east"));
        document.getElementById("left").addEventListener('click', () => this.changeDirection("west"));
        document.getElementById("up").addEventListener('click', () => this.changeDirection("north"));
        document.getElementById("down").addEventListener('click', () => this.changeDirection("south"));
    }

    pieceType = 'player';
    src = './images/svg/snake-head.svg';
    snakeLength = 4;//Plus the head
    snakeBody = [];
    moveHistory = [];
    
    move(player, cords){
        console.log("Running 'move(" + player.pieceType + ")'")
        let moved = super.move(player,cords); //returns true if player moved
        console.log("moved="+moved);
        if(moved){
            player.moveBody(player);
            return moved;
        }else{
            console.log("The player didn't move, so the game should probably be over.");
            return moved;
        }
    }

    saveLastMove(player) {
        //console.log("Running 'saveLastMove()' in Player");
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
        //console.log("Running 'manageBody()'");
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
                GameObjectTracker.drawPiece(segment);
            }
        }
    }

    handleCollision(collided){
        console.log("Running 'handleCollision(" + collided.pieceType + ")'")
        let moved = true;
        switch(collided.pieceType){
            case "playerBody" || "playerTail":
                console.log("You have eaten your own body, the game is over.");
                moved = false;
                break;
            case "apple":
                console.log("You eat the apple." + collided.id);
                GameObjectTracker.removePieceFromBoard(collided);
                this.addToSnakeBodyArray(1);
                GameObjectTracker.addPieceToBoard(Apple.returnRandomApple());
                break;
            case 'wall':
                console.log("I can see I hit a wall...");
                moved = false;
                break;
            default:
                console.log("You just tripped the default case in handleCollision() inside 'Player'. That shouldn't have happened.");
                break;
        }
        return moved;
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
        for (let i = 0; i < this.snakeLength - 1; i++) { //subtracting 1 to ensure the tail is last in the array, and also the arrays match length.
            this.snakeBody.push(new BodyObject(this.x, this.y, i+1));//Every segment's ID should be extended from the head, Which should always be zero.
            console.log("i="+i+" After assigning 'segmentId'");
        }
        
        this.snakeBody.push(new TailObject(this.x, this.y, this.snakeLength));
        this.logSnakeBodyArray(this);
    }

    reassignSnakeSegmentIds() {
        console.log("Running 'reassignSnakeSegmentIds()'");
        this.snakeBody.unshift(new BodyObject(this.x,this.y,0));
        let newId = 0;
        for (let segment of this.snakeBody) { 
            segment.segmentId = newId;
            newId++;
        }
    }

    addToSnakeBodyArray(numberToAdd){//Need to re-assign every segment's id
        console.log("Running 'addToSnakeBodyArray("+ numberToAdd +")'")
        for(let i = 0; i < numberToAdd;i++){
            this.snakeLength++;
            this.reassignSnakeSegmentIds();
        }
    }

    logSnakeBodyArray(player) {
        let logString = 'Body Segments : ';
        for (let segment of player.snakeBody) {
            logString += ("\n(" + segment.x + "," + segment.y + ") '" + segment.pieceType + '-' + segment.segmentId +"'");
        }
        console.log(logString);
    }
}
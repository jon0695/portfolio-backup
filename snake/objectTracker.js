import { MapLogic } from './mapLogic.js';
import { BlankSpace, GameObject } from './gameObjects.js';

/*
    So the idea is GameObjectTracker will hold the logical objects and the mapLogic class will use them to print the objects to the screen.
    Their positions should be set/edited from here.
*/
export class GameObjectTracker {

    constructor(){
        if(this instanceof GameObjectTracker){
            throw Error("You tried to instance the Static Class 'GameObjectTracker");
        }
    }
    
    static initalizePieces(startingPieces) {//Should be an array of gameObjects
        //console.log("Running 'initalizePieces("+startingPieces+")'");
        for (let piece of startingPieces) {
            this.addPieceToBoard(piece);
        }
    }

    static spawnPoint = [0, 0];
    static gamePieces = [];//shouldn't really be accessed from outside directly.

    static pieceCount = 0;

    static addPieceToBoard(newPiece) {//Should be type 'GameObject'
        //console.log("Running 'addPieceToBoard()'");
        let overlap = this.checkForOverlap(newPiece);
        //console.log(overlap);
        if (!overlap) {
            newPiece.onBoard = true;
            newPiece.id = this.pieceCount;
            this.pieceCount++;
            //console.log("newPiece ID : "+ newPiece.id + "/ pieceCount : " + GameObjectTracker.pieceCount);
            this.gamePieces.push(newPiece);
            MapLogic.changeGridSpace(newPiece);
        } else {
            console.log("Tried to add " + newPiece + " to the Board, But it overlapped with something and couldn't spawn.");
            console.log("It was overlapping with " + overlap.pieceType + " id:"+overlap.id);
        }

    }

    static removePieceFromBoard(index) {//Change to Game Piece
        console.log("Running 'removePieceFromBoard()");
        blank = { x: gamePieces[index].x, y: gamePieces[index].y }; //need the placement of the piece that's being removed.
        MapLogic.changeGridSpace(new BlankSpace(blank.x, blank.y));
        this.gamePieces.splice(index, 1);
    }

    static movePiece(piece){
        //console.log("Running 'movePiece() in objectTracker");
        //console.log(piece);
        //console.log("About to run 'MapLogic' to add a blank space from 'movePiece()'");
        MapLogic.changeGridSpace(new BlankSpace(piece.oldX, piece.oldY));
        //console.log("About to run 'MapLogic' to move a piece from 'movePiece()'");
        MapLogic.changeGridSpace(piece);
        return this.checkForOverlap(piece);
    }

    //Checks the coordinates of the given gameObject against every other existing gameObject in 'gamePieces' array
    static checkForOverlap(piece) {
        //console.log("Running 'checkForOverlap()'");
        //console.log("Checking a : " + piece.pieceType + ", With the id of : " + piece.id);
        let overlapping = false;
        for (let currentPiece of this.gamePieces) {
            if(currentPiece.id === piece.id)continue;
            if (this.checkForColumnOverlap(currentPiece, piece) && this.checkForRowOverlap(currentPiece, piece)) {
                overlapping = currentPiece;
                console.log("The Pieces are on top of each other");
            }
        }
        return overlapping;
    }

    //check the 'x' cord between two gameObjects
    static checkForColumnOverlap(firstPiece, otherPiece) {
        //console.log("Running 'checkForColumnOverlap()'");
        if (firstPiece.x === otherPiece.x) {
            //console.log(firstPiece.pieceType + firstPiece.id + " is in the same column as " + otherPiece.pieceType + otherPiece.id);
            return true;
        }
        return false;
    }

    //check the 'y' cord between two gameObjects
    static checkForRowOverlap(firstPiece, otherPiece) {
        //console.log("Running 'checkForRowOverlap()'");
        if (firstPiece.y === otherPiece.y) {
            //console.log(firstPiece.id + " is on the same line as " + otherPiece.id);
            return true;
        }
        return false;
    }
}
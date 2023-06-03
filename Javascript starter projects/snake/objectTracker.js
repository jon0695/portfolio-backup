import {MapLogic} from './mapLogic.js';

/*
    So the idea is GameObjectTracker will hold the logical objects and the mapLogic class will use them to print the objects to the screen.
    But their positions should be set/edited from here?
*/
export class GameObjectTracker{
    constructor(startingObjects){//Should be an array of gameObjects
        console.log("Running 'GameObjectTracker constructor()");
        this.gamePieces = startingObjects ? startingObjects : [];
        // this.placeAllPiecesOnMap(startingObjects ?? []);
    }

    spawnPoint = [0,0];
    gamePieces = [];//shouldn't really be accessed from outside directly.

    addPieceToBoard(newPiece){//Should be type 'GameObject'
        console.log("Running 'addPieceToBoard()'");
        if(!this.checkForOverlap(newPiece)){
            this.gamePieces.push(newPiece);
            MapLogic.placeOnMap(newPiece);
        }
    }

    //Checks the coordinates of the given gameObject against every other existing gameObject in 'gamePieces' array
    checkForOverlap(piece){
        console.log("Running 'checkForOverlap()'");
        console.log("Checking a : " + piece.pieceType + ", With the id of : " + piece.id);

        let overlapping = false;
        for(let currentPiece of this.gamePieces){
                if(this.checkForColumnOverlap(currentPiece, piece) && this.checkForRowOverlap(currentPiece, piece)){
                    overlapping = true;
                    console.log("The Pieces are on top of each other");
                }
        }
        return overlapping;
    }

    //Right now, I don't see any reason for this to exist...
    checkForEveryOverlap(){
        console.log("Running 'checkForEveryOverlap()'");
        let otherPieces = [...this.gamePieces];
        for(let currentPiece of this.gamePieces){
            otherPieces.splice(0,1);
            for(let otherPiece of otherPieces){
                if(this.checkForColumnOverlap(currentPiece, otherPiece) && this.checkForRowOverlap(currentPiece,otherPiece)){
                    console.log("A Piece is overlapping another");
                }
            }
        }
    }//Right now, I don't see any reason for this to exist...

    //check the 'x' cord between two gameObjects
    checkForColumnOverlap(firstPiece, otherPiece){
        console.log("Running 'checkForColumnOverlap()'");
        if(firstPiece.x === otherPiece.x){
            console.log(firstPiece.id + " is in the same column as " + otherPiece.id);
            return true;
        }
        return false;
    }

    //check the 'y' cord between two gameObjects
    checkForRowOverlap(firstPiece, otherPiece){
        console.log("Running 'checkForRowOverlap()'");
        if(firstPiece.y === otherPiece.y){
            console.log(firstPiece.id + " is on the same line as " + otherPiece.id);
            return true;
        }
        return false;
    }

    // placeAllPiecesOnMap(gameObjects:GameObject[]){
    //     for(let piece of gameObjects){
    //         this.placePieceOnMap(piece);
    //     }
    // }

    // placePieceOnMap(piece:GameObject){
    //     this.gamePieces.push(piece);
    // }

    //I think I'll need methods like this in the future, but not right now. Still keeping them around.
}
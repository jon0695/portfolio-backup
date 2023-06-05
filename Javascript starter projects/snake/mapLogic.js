import { GAME_WINDOW, GAME_WIDTH, GAME_HEIGHT, GRID_SIZE, GRID_WIDTH, GRID_HEIGHT } from './globals.js';
import { BlankSpace, Placeholder } from './gameObjects.js';

let gridSpaces = [];

//TODO- I need a method to change an existing gridSpace to represent an object.
export class MapLogic {

    //Called whenever 'objectTracker.addPieceToBoard()' is called.
    static changeGridSpace(gamePiece) {//Should be a gameObject
        console.log("Running 'changeGridSpace()' with " + gamePiece);
        if (this.checkForValidPlacement(gamePiece)) {
            gridSpaces[gamePiece.x][gamePiece.y] = gamePiece;
            let spaceToChange = document.querySelector(`[data-y-cord="${gamePiece.y}"][data-x-cord="${gamePiece.x}"]`);
            //console.log(spaceToChange);
            spaceToChange.src = gamePiece.src;
        }
    }


    //Should only be called once at when the page loads
    static prepGrid() {
        console.log("Running 'prepGrid()");
        // console.log("GRID_SIZE  is : " + GRID_SIZE);

        // console.log("Resetting 'gridSpaces[]' to blank array for peace of mind.");
        gridSpaces = [];

        let gridRow = [];
        let currentX = 0;
        let currentY = GRID_HEIGHT - 1;//Starts from the top because elements are added from the top left. So with this, (0,0) will be the bottom left.

        //console.log("Running 'prepGrid() forloop");
        for (let i = 0; i < GRID_HEIGHT; i++) {
            gridRow = [];
            for (let m = 0; m < GRID_WIDTH; m++) {
                let newSpace = new BlankSpace();
                newSpace.x = currentX;
                newSpace.y = currentY;
                gridRow.push(newSpace);
                currentX++;
                //console.log("Added item to row : " + i + ", Column : " + m);
            }
            gridSpaces.push(gridRow);
            //console.log("Just added new Row to 'gridSpaces[" + i + "]");
            currentX = 0;
            currentY--;
        }
        MapLogic.renderGrid();
        // console.log("Reached the end of 'prepGrid()'");
    }

    //Used with 'prepGrid()' when the page is loaded
    //Creates new <img>'s with the 'BlankSpace' gameObject. One for every item in 'gridSpaces[]'
    static renderGrid() {
        console.log("Running 'renderGrid()'");
        //console.log(gridSpaces);

        for (let row of gridSpaces) {
            for (let space of row) {
                //console.log(space);
                let pieceHTML = document.createElement('img');
                pieceHTML.src = space.src;
                pieceHTML.style.position = 'relative';
                pieceHTML.dataset.xCord = space.x;
                pieceHTML.dataset.yCord = space.y;
                GAME_WINDOW.appendChild(pieceHTML);
            }
        }
    }
    static checkForValidPlacement(piece) {
        // console.log("Checking " + piece + " for validity");
        //console.log(piece.x+":"+piece.y);
        if (piece.x < 0 || piece.x > GRID_WIDTH) {
            console.log("Check Failed");
            return false;
        }
        if (piece.y < 0 || piece.y > GRID_HEIGHT) {
            console.log("Check Failed");
            return false;
        }
        return true;
    }
}


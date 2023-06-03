//import {Apple,Player,BlankSpaces,Placeholder} from './gameObjects.js';
import * as Pieces from './gameObjects.js';
import {MapLogic} from './mapLogic.js';
import {GameObjectTracker} from './objectTracker.js'

const tracker = new GameObjectTracker(
    [new Pieces.Player(0,0)]
);

class GameLogic {

}

const cycleMappedObjects = () => {
    console.log("Running 'cycleMappedObjects()'");

}

const runGame = () => {
    console.log("Running 'runGame()");
    // console.log("This should print after MapLogic has finished prepGrid()");  //And it does.

}

const setupGame = () => {
    MapLogic.prepGrid();

    console.log("Running 'setupGame()");
    let playButton = document.getElementById('play-button');
    playButton.addEventListener('click', runGame);

    let cycleMappedObjects = document.getElementById('cycle-mapped-objects');
    console.log(tracker.gamePieces[0]);
    const cycleHandler = () => {MapLogic.changeGridSpace(tracker.gamePieces[0])};
    cycleMappedObjects.addEventListener('click', cycleHandler);
}

//testing method
// const prepGrid = () => {
//     console.log("Running 'prepGrid()");

//     let currentX = 0;
//     let currentY = 0;

//     for (let i = 0; i < 400; i++) {
//         console.log("Running 'prepGrid() forloop");
//         let newApple = new Pieces.Placeholder();
//         newApple.x = currentX;
//         newApple.y = currentY;
//         MapLogic.addPieceToBoard(newApple);
//         currentX++;
//         if(currentX)
//     }
// }

setupGame();
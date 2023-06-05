import Player from './playerObject.js';
import {MapLogic} from './mapLogic.js';
import {GameObjectTracker} from './objectTracker.js'

MapLogic.prepGrid();
GameObjectTracker.initalizePieces([
    new Player(0,0,6),
])


const test = () => {
    console.log("Running 'test()' in gameLogic");
    GameObjectTracker.gamePieces[0].addToSnakeBodyArray(1);
}

const runGame = () => {
    console.log("Running 'runGame()' in gameLogic");
}

const setupGame = () => {
    console.log("Running 'setupGame()' in gameLogic");
    let playButton = document.getElementById('play-button');
    playButton.addEventListener('click', runGame);

    let button2 = document.getElementById('button-2');
    //console.log(GameObjectTracker.gamePieces[0]);
    button2.addEventListener('click', test);
}



setupGame();





class GameLogic {

}


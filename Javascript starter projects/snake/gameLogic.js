import PlayerHead from './playerHeadGObject.js';
import { Movable } from './movableGObject.js'
import { Apple } from './appleGObject.js';
import { MapLogic } from './mapLogic.js';
import { GameObjectTracker } from './objectTracker.js';
import { KEYS, GRID_HEIGHT, GRID_WIDTH } from './globals.js';



let running = false;
let moved = false;
let numberOfTicks = 0;
let playerReference;

const resetTicks = () => {
    numberOfTicks = 0;
}

const gameLoop = (speed) => {
    console.log("Running 'gameLoop()'");
    if (running) {
        setTimeout(() => {
            console.log("Running new timeout");
            gameTick();//--can set 'running' to false
            gameLoop(speed)
        }, speed);
    }
}

const gameTick = () => {
    numberOfTicks++;
    console.log(numberOfTicks + " TICK!");
    MapLogic.reDrawGrid();
    // let player = GameObjectTracker.gamePieces[0];
    // player.move(player);
    for (let i = 0; i < GameObjectTracker.gamePieces.length; i++) {
        let piece = GameObjectTracker.gamePieces[i];
        switch (piece.pieceType) {
            case "player":
                moved = piece.move(piece);//--gameLoop() breaker.
                break;
            default:
                GameObjectTracker.drawPiece(piece);
                break;
        }
    }
    if(!moved){
        handleGameOver();
    }
}

const handleGameOver = () => {
    console.log("Running 'handleGameOver()");
    running = false;
    document.body.appendChild(returnGameOverWindow());
}

const returnGameOverWindow = () => {
    let GameOverWindow = document.createElement('div');
    GameOverWindow.style.backgroundColor = 'black';
    GameOverWindow.style.position = 'absolute';
    GameOverWindow.style.alignSelf = "center";

    let GameOverBanner = document.createElement("p");
    GameOverBanner.style.display = 'inline-block';
    GameOverBanner.style.fontSize = 4 + "rem";
    GameOverBanner.style.color = 'red';
    GameOverBanner.textContent = "GAME OVER";

    GameOverWindow.appendChild(GameOverBanner);
    return GameOverWindow;
}

const test = () => {
    console.log("Running 'test()' in gameLogic");
    gameTick();
}

const handleStartGame = () => {
    console.log("Running 'runGame()' in gameLogic");
    if (!running) {
        let speedInput = document.getElementById("speed").value;
        running = true;
        let realSpeed = determineSpeed(speedInput);
        console.log(realSpeed + " : realSpeed");
        gameLoop(realSpeed);
    } else {
        console.log("'running' should be false");
        handleGameOver();
        resetTicks();
    }
}

const determineSpeed = (speedInput) => {
    let determinedSpeed = 0;
    for (let i = 0; i < speedInput; i++) {
        determinedSpeed += 250;//Or 1/4 of a second
    }
    return determinedSpeed;
}

const handleKeyDown = (e) => {
    if (KEYS.includes(e.code)) {
        e.preventDefault();
        console.log("Pushed " + e.code + " key");
        switch (e.code) {
            case 'ArrowRight':
                playerReference.changeDirection('east');
                break;
            case 'ArrowLeft':
                playerReference.changeDirection('west');
                break;
            case 'ArrowUp':
                playerReference.changeDirection('north');
                break;
            case 'ArrowDown':
                playerReference.changeDirection('south');
                break;
        }
    }
}

const handleToggleKeyboard = () => {
    console.log("Running handleToggleKeyboard()");
    let button = document.getElementById('toggle-keyboard');

    if (button.textContent === 'Disabled') {
        console.log("Adding event listener 'handleKeyDown");
        button.textContent = "Enabled";
        document.addEventListener('keydown', handleKeyDown);
    } else {
        console.log("Removing event listener 'handleKeyDown");
        button.textContent = "Disabled";
        document.removeEventListener('keydown', handleKeyDown);
    }
}


const preLaunchSetup = () => {
    MapLogic.prepGrid();

    playerReference = new PlayerHead(0, 0, 2);
    let randomApple = Apple.returnRandomApple();

    GameObjectTracker.initalizePieces([
        playerReference,
        randomApple,
    ])

    console.log("Running 'preLaunchSetup()' in gameLogic");
    let playButton = document.getElementById('play-button');
    playButton.addEventListener('click', handleStartGame);

    let tickButton = document.getElementById('tick-button');
    tickButton.addEventListener('click', test);

    let resetTicksB = document.getElementById('reset-ticks-b');
    resetTicksB.addEventListener('click', resetTicks);

    let toggleKeyboard = document.getElementById('toggle-keyboard');
    toggleKeyboard.addEventListener('click', handleToggleKeyboard);
}
preLaunchSetup();


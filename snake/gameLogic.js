import Player from './playerGObject.js';
import { Apple } from './appleGObject.js';
import { MapLogic } from './mapLogic.js';
import { GameObjectTracker } from './objectTracker.js';
import { KEYS } from './globals.js';

let running = false;
let ticker;
let numberOfTicks = 0;

const resetTicks = () => {
    numberOfTicks = 0;
}

const gameTick = () => {
    numberOfTicks++;
    console.log(numberOfTicks + " TICK!");
    let player = GameObjectTracker.gamePieces[0];
    player.move(player);
}

const test = () => {
    console.log("Running 'test()' in gameLogic");
    gameTick();
}

const handleRunGame = () => {
    console.log("Running 'runGame()' in gameLogic");
    if (!running) {
        let speedInput = document.getElementById("speed").value;
        running = true;
        let realSpeed = determineSpeed(speedInput);
        console.log(realSpeed + " : realSpeed");
        ticker = setInterval(gameTick, realSpeed);
    } else {
        running = false;
        clearInterval(ticker);
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
    GameObjectTracker.initalizePieces([
        new Player(0, 0, 6),
        new Apple(6,6),
    ])
    console.log("Running 'preLaunchSetup()' in gameLogic");
    let playButton = document.getElementById('play-button');
    playButton.addEventListener('click', handleRunGame);

    let tickButton = document.getElementById('tick-button');
    tickButton.addEventListener('click', test);

    let resetTicksB = document.getElementById('reset-ticks-b');
    resetTicksB.addEventListener('click', resetTicks);

    let toggleKeyboard = document.getElementById('toggle-keyboard');
    toggleKeyboard.addEventListener('click', handleToggleKeyboard);
}
preLaunchSetup();


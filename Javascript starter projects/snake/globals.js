// window.addEventListener("resize", changeGameZeroPoint);

export const GAME_HEIGHT = 500;
export const GAME_WIDTH = 500;
export const GAME_WINDOW = document.getElementById('game-window');
export const GRID_WIDTH = GAME_WIDTH/25;
export const GRID_HEIGHT = GAME_HEIGHT/25;
export const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;
export const KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export const randomCords = () => {
    let randomHeight = Math.floor(Math.random() * GRID_HEIGHT);
    let randomWidth = Math.floor(Math.random() * GRID_WIDTH);
    return { x: randomWidth, y: randomHeight };
}
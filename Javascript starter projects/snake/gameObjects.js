
class GameObject {
    id;
    indexId;
    pieceNumber;
    pieceType = 'gameObject';
    src;
    x;
    y;
    oldX;
    oldY;
    onBoard = false;
    direction = 'north';
    constructor(x, y) {
        //console.log("Running 'GameObject construtor' : x=" + x + " y=" + y);
        this.id = Math.random() * 3000;
        this.x = x;
        this.y = y;
        this.oldY = y;
        this.oldX = x;
    }

    changeDirection(newDir){
        console.log("Running 'changeDirection(" + newDir + ")'");
        this.direction = newDir;
    }
}

class Placeholder extends GameObject {
    pieceType = 'placeholder';
    src = './images/svg/placeholder.svg';
}

class BlankSpace extends GameObject {
    pieceType = 'blank';
    src = './images/svg/blank.svg';
}

export {
    GameObject,
    Placeholder,
    BlankSpace
}
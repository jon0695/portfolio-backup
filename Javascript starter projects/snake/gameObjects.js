
class GameObject {
    id;
    pieceType;
    src;
    x;
    y;
    oldX;
    oldY;
    onBoard = false;
    constructor(x, y) {
        //console.log("Running 'GameObject construtor' : x=" + x + " y=" + y);
        this.id = Math.random() * 3000;
        this.x = x;
        this.y = y;
        this.oldY = y;
        this.oldX = x;
    }
}


class Apple extends GameObject {
    pieceType = 'apple';
    src = './images/svg/apple.svg';
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
    Apple,
    Placeholder,
    BlankSpace
}
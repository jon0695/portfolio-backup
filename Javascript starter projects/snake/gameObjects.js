class GameObject {
    constructor(x,y){
        this.id = Math.random() * 3000;
        this.x = x;
        this.y = y;
    }
    id;
    pieceType;
    src;
    x;
    y;
}

class Player extends GameObject{
    pieceType = 'player';
    src = './images/svg/snake-head.svg';
}

class Apple extends GameObject {
    pieceType = 'apple';
    src = './images/svg/apple.svg';
}

class Placeholder extends GameObject{
    pieceType = 'placeholder';
    src = './images/svg/placeholder.svg';
}

class BlankSpace extends GameObject{
    pieceType = 'blank';
    src = './images/svg/blank.svg';
}

export {
    GameObject,
    Player,
    Apple,
    Placeholder,
    BlankSpace
}
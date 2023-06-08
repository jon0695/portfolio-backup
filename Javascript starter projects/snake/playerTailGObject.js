import {PlayerSegment} from './playerSegmentGObject.js';
export class TailObject extends PlayerSegment{
    constructor(x,y,number){
        super(x,y,number);
    }
    pieceType = "playerTail";
    src = './images/svg/snake-tail.svg';
}
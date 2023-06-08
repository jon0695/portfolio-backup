import {PlayerSegment} from './playerSegmentGObject.js';
export class BodyObject extends PlayerSegment{
    constructor(x,y,number){
        super(x,y,number);
    }
    pieceType = "playerBody";
    src = './images/svg/snake-body.svg';
}
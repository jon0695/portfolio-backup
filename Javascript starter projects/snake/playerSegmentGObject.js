import { Movable } from './movableGObject.js';
export class PlayerSegment extends Movable{
    constructor(x,y,segmentId){
        super(x,y)
        this.segmentId = segmentId;
    }
    segmentId;
}
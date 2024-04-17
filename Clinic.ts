import { Inhabitant } from "./interfaces";

export class Clinic {
    private _name: string;
    private _blockNum: number;
    private _staff: number;
    private _queue: Queue;
    [key: string]: any;

    constructor(name: string, blockNum: number, staff: number) {
        this._name = name;
        this._blockNum = blockNum;
        this._staff = staff;
        this._queue = new Queue(20);
    }

    get name() {
        return this._name;
    }

    get blockNum() {
        return this._blockNum;
    }

    get staff() {
        return this._staff;
    }
}

export class Queue {

    private _size: number;
    private _queue: Inhabitant[];

    constructor(size: number) {
        this._size = size;
        this._queue = [];
    }

    enqueue(person: Inhabitant) {
        if (this._queue.length < this._size) {
            this._queue.push(person);
        } else {
            console.log("Queue is full. Please try again later.");
        }
    }

    dequeue(person: Inhabitant) {
        if (this._queue.length > 0) {
            return this._queue.shift();
        } else {
            console.log("Queue is empty.");
            return;
        }
    }

    size(): number {
        return this._queue.length;
    }

    getCurrentWaitTime(clinic: Clinic) {
        const waitTime = 15 * this._queue.length;
        console.log(`${this._queue.length} people in queue means ${waitTime} min.`);
    }

    setQueue(queue: Inhabitant[]) {
        this._queue = queue;
    }
}
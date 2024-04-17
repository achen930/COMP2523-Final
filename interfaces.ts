export interface Inhabitant {
    phn: string;
    fullName: string;
    isVaccinated: boolean;
    age: number;
    [key: string]: any;
}

export interface Household {
    blockNum: number;
    inhabitants: Inhabitant[];
    [key: string]: any;
}

export interface Clinic {
    name: string;
    blockNum: number;
    staff: number;
    queue: Queue;
}

export class Queue {

    private _size: number;

    constructor(size: number) {
        this._size = size;
    }

    enqueue(inhabitant: Inhabitant) {
        
    }

    dequeue(inhabitant: Inhabitant) {

    }

    size() {
        return this._size;
    }

    getCurrentWaitTime() {
        return `${this._size} person in Queue`;
    }
}

export interface City {
    households: Household[];
    clinics: Clinic[];
    [key: string]: any;
}

export interface CityMapData {
    [city: string]: City;
}


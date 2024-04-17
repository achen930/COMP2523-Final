import { Clinic } from "./Clinic";

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

export interface City {
    households: Household[];
    clinics: Clinic[];
    [key: string]: any;
}

export interface CityMapData {
    [city: string]: City;
}


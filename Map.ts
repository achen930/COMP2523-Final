import { readFile } from "fs/promises";
import { EOL } from "os";
import { Inhabitant, Household, Clinic, City, CityMapData, Queue } from "./interfaces";

export class Map {
	private _mapData: CityMapData;
    private _filename: string;

    private constructor(mapData: CityMapData, filename: string) {
        this._mapData = mapData;
        this._filename = filename;
    }
  
    static async read(filename: string) {
        const mapData = await readFile(filename, "utf8");
        const data = JSON.parse(mapData);
        return new Map(data, filename);
    }

    get mapData(): CityMapData {
        return this._mapData;
    }

    get filename(): string {
        return this._filename;
    }

    public async printMap(): Promise<void> {
        const cityMapData = this.mapData;
        const maxLength = Object.values(cityMapData).reduce((max, city) => Math.max(max, city.households.length), 0);
        const map: string[][] = [];
        
            for (let i = 0; i < maxLength; i++) {
                map.push(new Array(3).fill("x"));
            }
        
            for (const cityName in cityMapData) {
                if (cityMapData.hasOwnProperty(cityName)) {
                    const cityData = cityMapData[cityName];
                    const households = cityData.households;
                    const clinics = cityData.clinics;
            
                    households.forEach(household => {
                        const column = cityName.charCodeAt(0) - 66;
                        const row = household.blockNum;
                        map[row][column] = household.inhabitants.some(inhabitant => !inhabitant.isVaccinated) ? 'H' : 'F';
                    });
            
                    clinics.forEach(clinic => {
                        const column = cityName.charCodeAt(0) - 66;
                        const row = clinic.blockNum;
                        map[row][column] = 'C';
                    });
                }
            }
            
            for (const row of map) {
                console.log(row.join(", "));
            }
    }
        

            

    registerForShots(){

        const currentIntake = 20;

        const cityMapData = this.mapData;
        for (const cityName in cityMapData) {
            if (cityMapData.hasOwnProperty(cityName)) {
                const cityData = cityMapData[cityName];
                const households = cityData.households;
                const clinics = cityData.clinics;
        
                households.forEach(household => {
                    household.inhabitants.forEach(inhabitant => {
                        if (inhabitant.isVaccinated === true) {
                            return;
                        }

                        if (inhabitant.age < currentIntake) {
                            return;
                        }

                        clinics.enqueue(inhabitant);
                    })
                });
            }
        }
    }
}
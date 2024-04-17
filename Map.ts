import { readFile } from "fs/promises";
import { Household, Clinic, CityMapData } from "./interfaces";

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
        const cityMapData: CityMapData = this.mapData;
        
        const cities = cityMapData.city;
        let maxTotalLength = 0;
        
        for (const cityName in cities) {

            if (cities.hasOwnProperty(cityName)) {
            let cityData = cities[cityName];

            const households: Household[] = cityData.households;

            let letter = "";
            const letterArray: string[] = [];

            households.forEach(household => {

                let letter = "F";

                const inhabitants = household.inhabitants;
                
                for (const inhabitant of inhabitants) {
                    if (!inhabitant.isVaccinated) {
                        letter = "H";
                        break;
                    }
                }

                letterArray.push(letter);
                
            })
            
            const clinics: Clinic[] = cityData.clinics;
            
            clinics.forEach(clinic => {
                letter = "C";
                letterArray.push(letter);
            })
            
            
            if (letterArray.length > maxTotalLength) {
                maxTotalLength = letterArray.length;
            }
            
            const remainingLength = maxTotalLength - letterArray.length;
            
            if (remainingLength > 0) {
                for (let i = 0; i < remainingLength; i++) {
                    letterArray.push("x");
                }
            }

            const map = letterArray.join();

            console.log(map)

        }

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

                        // clinics.enqueue(inhabitant);
                    })
                });
            }
        }
    }
}
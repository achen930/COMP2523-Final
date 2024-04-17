import { readFile } from "fs/promises";
import { Household, CityMapData } from "./interfaces";
import { Clinic, Queue } from "./Clinic";

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
            console.log(map);
        }
    }
}

    registerForShots() {

        const currentIntake = 20;
        const cityMapData: CityMapData = this.mapData;
        const cities = cityMapData.city;


        for (const cityName in cities) {
            if ((cities.hasOwnProperty(cityName))) {
                let cityData = cities[cityName];
                const households: Household[] = cityData.households;
                const clinics: Clinic[] = cityData.clinics;

                households.forEach(household => {
                    let closestClinicBlock: number = clinics[0].blockNum;
                    let closestClinic: Clinic  = clinics[0];

                    for (const clinic of clinics){
                        const clinicBlockDistance = clinic.blockNum - household.blockNum;
                        if (Math.abs(clinicBlockDistance) < Math.abs(closestClinicBlock)) {
                            closestClinicBlock = clinicBlockDistance;
                            closestClinic = clinic;
                        }
                    }

                    if (!closestClinic.queue) {
                        closestClinic.queue = new Queue(20);
                    }

                    const inhabitants = household.inhabitants;
                    inhabitants.forEach(inhabitant => {
                        if (!inhabitant.isVaccinated && inhabitant.age >= currentIntake) {
                            closestClinic.queue.enqueue(inhabitant);
                            inhabitant.isVaccinated = true;
                        }
                    })
                });
            }
        }
    }
}
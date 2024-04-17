import { IReport } from "./IReport";
import { Map } from "./Map";
import { Clinic } from "./Clinic";


export class SimpleReport implements IReport {

    private _map: Map;

    constructor(map: Map) {
        this._map = map;
    }

    printDetails() {
        const cityMapData = this._map.mapData;
        const cities = cityMapData.city;
        for (const cityName in cities) {
            if (cities.hasOwnProperty(cityName)) {
                let cityData = cities[cityName];
                const clinics: Clinic[] = cityData.clinics;

                clinics.forEach(clinic => {
                    if (clinic.queue) {
                        console.log(`${clinic.name} - ${clinic.queue.size()}`);
                    } else {
                        console.log(`${clinic.name} - 0 in queue.`);
                    }
                });
            }
        }
    }
}

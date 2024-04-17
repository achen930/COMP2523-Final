import { IReport } from "./IReport";


export class SimpleReport implements IReport {
    printDetails() {
        for (const cities in cityData) {
            cities.forEach(city => {
                city.clinics.forEach(clinic => {
                    console.log(clinic.name);
                    console.log(clinic.queue.size);
                })
            })
        }
    }
}
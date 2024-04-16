import { IReport } from "./IReport";

export class ComplexReport implements IReport {

    private _report: IReport;

    constructor(report: IReport) {
        this._report = report;
    }

    printDetails() {
        for (const cityName in cityMapData) {
            cityName.forEach(city => {
                city.clinics.forEach(clinic => {
                    const waitTime = clinic.getCurrentWaitTime()
                    console.log(`Average wait time: ${waitTime}`);
                    console.log(clinic.name);
                    console.log(clinic.queue.size);
                })
            })
        }
    }
}
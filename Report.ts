import { IReport } from "./IReport";

export class ReportMaker {
    private _report: IReport;

    constructor(report: IReport) {
        this._report = report;
    }

    printDetails() {
        this._report.printDetails();
    }

}
import { IReport } from "./IReport";

export class ReportMaker {
    report: IReport;

    printDetails(report: IReport) {
        this.report.printDetails();
    }
}
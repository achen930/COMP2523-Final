import { IReport } from "./IReport";

export class ReportMaker {
    report: IReport;

    printDetails() {
        this.report.printDetails();
    }

}
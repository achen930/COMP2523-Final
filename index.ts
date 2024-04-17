import { Map } from "./Map";
import { ReportMaker } from "./Report";
import { SimpleReport } from "./SimpleReport";
import { ComplexReport } from "./ComplexReport";

async function main() {
    const map = await Map.read("data.json");
    map.printMap();
    console.log("---End of Map---");
    map.registerForShots();
    const simpleReport = new SimpleReport(map);
    const report = new ReportMaker(simpleReport);
    report.printDetails();
    console.log("---End of Report---");
    const complexReport = new ComplexReport(map);
    const report2 = new ReportMaker(complexReport);
    report2.printDetails();
    console.log("---End of Report---");
  }
  
  main();
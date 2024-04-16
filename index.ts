import { Map } from "./Map";
import { ReportMaker } from "./Report";

async function main() {
    const map = await Map.read("data.json");
    map.printMap();
    console.log("---End of Map---")
    map.registerForShots();
    const report = new ReportMaker(new ComplexReport(map));
    report.printDetails();
    console.log("---End of Report---")
    map.printMap();
    console.log("---End of Map---")
  }
  
  main();
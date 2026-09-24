import { runChecks } from "./evalset";

const report = runChecks();
const failed = report.filter((row) => !row.passed);
for (const row of report) {
  console.log(`${row.passed ? "PASS" : "FAIL"}  ${row.question}  -> ${row.refused ? "refused" : row.cited}`);
}
if (failed.length) {
  console.error(`${failed.length} failed`);
  process.exit(1);
}
console.log(`${report.length} passed`);

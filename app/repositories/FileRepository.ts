import csv from "csvtojson";
import path from "path";
import xlsx from "xlsx";

// https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
const dataDir = path.join(process.cwd(), "data");
const yearHandsPath = path.join(dataDir, "Poker - Year Hands.xlsx");

export async function GetYearHandsDataAsync() {
  const path = await EnsureFilePath(yearHandsPath);
  const csvData = await GetCsvFromXlsx(path);
  const json = await csv().fromString(csvData);
  return json;
}

async function GetCsvFromXlsx(path) {
  const xslxPattern = /.+\.(xlsx)$/;
  if (!path.match(xslxPattern)) {
    throw new Error(`path does not match ${path}`);
  }

  const workBook = xlsx.readFile(path);
  const output = xlsx.write(workBook, {
    bookType: "csv",
    WTF: true, // throw on unexpected features,
    type: "string",
  });

  return output;
}

async function EnsureFilePath(path) {
  const fs = await import("fs-extra");
  if (!(await fs.pathExists(path))) {
    throw new Error(`Could not find file ${path}`);
  }
  return path;
}

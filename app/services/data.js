const csv = require("csvtojson");
const path = require("path");
const fs = require("fs-extra");
const xlsx = require("xlsx");

// https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
const dataDir = path.join(process.cwd(), "data");
const yearFiguresPath = path.join(dataDir, "Poker - Year Figures.xlsx");
const yearHandsPath = path.join(dataDir, "Poker - Year Hands.xlsx");
const monthlyPositionsPath = path.join(
  dataDir,
  "Poker - Monthly Positions.xlsx"
);

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
  if (!(await fs.pathExists(path))) {
    throw new Error(`Could not find file ${path}`);
  }
  return path;
}

async function GetMonthlyPositionsDataAsync() {
  const fullPath = await EnsureFilePath(monthlyPositionsPath);
  const csvData = await GetCsvFromXlsx(fullPath);
  const json = await csv().fromString(csvData);
  return json;
}

async function GetYearFiguresDataAsync() {
  const fullPath = await EnsureFilePath(yearFiguresPath);
  const csvData = await GetCsvFromXlsx(fullPath);
  const json = await csv().fromString(csvData);
  return json;
}

async function GetYearHandsDataAsync() {
  const path = await EnsureFilePath(yearHandsPath);
  const csvData = await GetCsvFromXlsx(path);
  const json = await csv().fromString(csvData);
  return json;
}

module.exports = {
  GetMonthlyPositionsDataAsync,
  GetYearFiguresDataAsync,
  GetYearHandsDataAsync,
};

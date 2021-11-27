const csv = require('csvtojson');
const path = require("path")

// https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
const dataDir = path.join(process.cwd(), 'data')
const yearDataPath = path.join(dataDir, "Poker - Year Figures.csv");
const yearHandsPath = path.join(dataDir, "Poker - Year Hands.csv")
const monthlyPositionsPath = path.join(dataDir, "Poker - Monthly Positions.csv");

async function GetMonthlyPositionsDataAsync() {
  const json = await csv().fromFile(monthlyPositionsPath);
  return json;
}

async function GetYearDataAsync() {
  const json = await csv().fromFile(yearDataPath);
  return json
}

async function GetYearHandsDataAsync() {
  const json = await csv().fromFile(yearHandsPath)
}

module.exports = { GetMonthlyPositionsDataAsync, GetYearDataAsync, GetYearHandsDataAsync }
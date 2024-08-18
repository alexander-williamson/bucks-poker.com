import csv from "csvtojson";
import fs from "fs-extra";
import path from "path";
import xlsx from "xlsx";
import joi from "joi";
import { Year } from "../models/Year";
import { Month } from "../models/Month";

export async function GetMonthlyPositionsDataAsync(): Promise<Month[]> {
  const fullPath = await EnsureFilePath(monthlyPositionsPath);
  const csvData = await GetCsvFromXlsx(fullPath);
  const json = await csv().fromString(csvData);
  const { value, error } = joi
    .array<Month[]>()
    .items(
      joi
        .object<Month>({
          Year: joi.string().optional(),
          Person: joi.string().optional(),
        })
        .unknown()
        .optional()
    )
    .optional()
    .validate(json);
  if (error) {
    throw error;
  }
  return value;
}

export async function GetYearFiguresDataAsync(): Promise<Year[]> {
  const fullPath = await EnsureFilePath(yearFiguresPath);
  const csvData = await GetCsvFromXlsx(fullPath);
  const json = await csv().fromString(csvData);
  const { value, error } = joi
    .array<Year>()
    .items(
      joi
        .object<Year>({
          Yr: joi.string().required(),
          Person: joi.string().required(),
          SRank: joi.string().required(),
          Points: joi.string().required(),
          Bonus: joi.string().required(),
          PointsBonus: joi.string().required(),
          Chips: joi.string().required(),
          Winnings: joi.string().required(),
          Takehome: joi.string().required(),
          PersStatus: joi.string().required(),
          pers_personid: joi.string().required(),
        })
        .unknown()
        .required()
    )
    .required()
    .validate(json);
  return value;
}

export async function GetYearHandsDataAsync() {
  const path = await EnsureFilePath(yearHandsPath);
  const csvData = await GetCsvFromXlsx(path);
  const json = await csv().fromString(csvData);
  return json;
}

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

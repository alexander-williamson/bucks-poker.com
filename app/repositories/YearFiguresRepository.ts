import csv from "csvtojson";
import joi from "joi";

import { Year } from "../models/Year";
import { EnsureFilePath, GetCsvFromXlsx } from "./RepositoryHelpers";

export const FILENAME = "Poker - Year Figures.xlsx";

export async function GetYearFiguresDataAsync(filePath: string): Promise<Year[]> {
  const fullPath = await EnsureFilePath(filePath);
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
          Points: joi.number().empty("").default(0).optional(), // sometimes can be empty (bug)
          Bonus: joi.string().required(),
          PointsBonus: joi.string().required(),
          Chips: joi.string().required(),
          Winnings: joi.string().required(),
          Takehome: joi.string().required(),
          PersStatus: joi.string().required(),
          pers_personid: joi.string().required(),
        })
        .required(),
    )
    .required()
    .validate(json);

  if (error) {
    throw new Error(`GetYearFiguresDataAsync encountered an error ${filePath}): ${error.message}`);
  }

  return value;
}

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
    .array<Year[]>()
    .items(
      joi
        .object<Year>({
          Bonus: joi.number().required(),
          Chips: joi.number().required(),
          pers_personid: joi.string().required(),
          Person: joi.string().required(),
          PersStatus: joi.string().required(),
          Points: joi.number().empty("").default(0).optional(), // sometimes can be empty (bug)
          PointsBonus: joi.number().required(),
          SRank: joi.number().required(),
          Takehome: joi.number().required(),
          Winnings: joi.number().required(),
          Yr: joi.number().required(),
        })
        .required(),
    )
    .required()
    .validate(json);

  if (error) {
    throw new Error(`GetYearFiguresDataAsync encountered an error ${filePath}): ${error.message}`);
  }

  const sorted: Year[] = value.sort((a: Year, b: Year) => a.Yr - b.Yr);

  return value;
}

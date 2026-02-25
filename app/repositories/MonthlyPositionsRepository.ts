import joi from "joi";
import csv from "csvtojson";
import { EnsureFilePath, GetCsvFromXlsx } from "./RepositoryHelpers";

export const FILENAME = "Poker - Monthly Positions.xlsx";

export async function getMonthlyPositions(filePath: string): Promise<PokerMonthlyPosition[]> {
  const fullPath = await EnsureFilePath(filePath);
  const csvData = await GetCsvFromXlsx(fullPath);
  const json = await csv().fromString(csvData);
  const { error, value } = joi
    .array<PokerMonthlyPosition[]>()
    .items(
      joi
        .object({
          Year: joi.number().required(),
          Person: joi.string().required(),
          PersStatus: joi.string().required(),
          pers_personid: joi.number().integer().required(),
          "01": joi.number().integer().optional().empty(""),
          "02": joi.number().integer().optional().empty(""),
          "03": joi.number().integer().optional().empty(""),
          "04": joi.number().integer().optional().empty(""),
          "05": joi.number().integer().optional().empty(""),
          "06": joi.number().integer().optional().empty(""),
          "07": joi.number().integer().optional().empty(""),
          "08": joi.number().integer().optional().empty(""),
          "09": joi.number().integer().optional().empty(""),
          "10": joi.number().integer().optional().empty(""),
          "11": joi.number().integer().optional().empty(""),
          "12": joi.number().integer().optional().empty(""),
          "01CC": joi.number().integer().optional().empty(""),
          "02CC": joi.number().integer().optional().empty(""),
          "03CC": joi.number().integer().optional().empty(""),
          "04CC": joi.number().integer().optional().empty(""),
          "05CC": joi.number().integer().optional().empty(""),
          "06CC": joi.number().integer().optional().empty(""),
          "07CC": joi.number().integer().optional().empty(""),
          "08CC": joi.number().integer().optional().empty(""),
          "09CC": joi.number().integer().optional().empty(""),
          "10CC": joi.number().integer().optional().empty(""),
          "11CC": joi.number().integer().optional().empty(""),
          "12CC": joi.number().integer().optional().empty(""),
          "01PC": joi.number().integer().optional().empty(""),
          "02PC": joi.number().integer().optional().empty(""),
          "03PC": joi.number().integer().optional().empty(""),
          "04PC": joi.number().integer().optional().empty(""),
          "05PC": joi.number().integer().optional().empty(""),
          "06PC": joi.number().integer().optional().empty(""),
          "07PC": joi.number().integer().optional().empty(""),
          "08PC": joi.number().integer().optional().empty(""),
          "09PC": joi.number().integer().optional().empty(""),
          "10PC": joi.number().integer().optional().empty(""),
          "11PC": joi.number().integer().optional().empty(""),
          "12PC": joi.number().integer().optional().empty(""),
        })
        .preferences({ stripUnknown: true })
        .required(),
    )
    .required()
    .validate(json);

  if (error) {
    console.error(json[0]);
    throw error;
  }

  return value;
}

export function GetYears(data: PokerMonthlyPosition[]): number[] {
  return [...new Set(data.map((x) => x.Year))];
}

export type PokerMonthlyPosition = {
  Year: number;
  Person: string;
  PersStatus: string;
  pers_personid: string;
  "01"?: number;
  "02"?: number;
  "03"?: number;
  "04"?: number;
  "05"?: number;
  "06"?: number;
  "07"?: number;
  "08"?: number;
  "09"?: number;
  "10"?: number;
  "11"?: number;
  "12"?: number;
  "01CC"?: number; // chips cumulative (month number)
  "02CC"?: number; // chips cumulative (month number)
  "03CC"?: number; // chips cumulative (month number)
  "04CC"?: number; // chips cumulative (month number)
  "05CC"?: number; // chips cumulative (month number)
  "06CC"?: number; // chips cumulative (month number)
  "07CC"?: number; // chips cumulative (month number)
  "08CC"?: number; // chips cumulative (month number)
  "09CC"?: number; // chips cumulative (month number)
  "10CC"?: number; // chips cumulative (month number)
  "11CC"?: number; // chips cumulative (month number)
  "12CC"?: number; // chips cumulative (month number)
  "01PC"?: number; // points cumulative (month number)
  "02PC"?: number; // points cumulative (month number)
  "03PC"?: number; // points cumulative (month number)
  "04PC"?: number; // points cumulative (month number)
  "05PC"?: number; // points cumulative (month number)
  "06PC"?: number; // points cumulative (month number)
  "07PC"?: number; // points cumulative (month number)
  "08PC"?: number; // points cumulative (month number)
  "09PC"?: number; // points cumulative (month number)
  "10PC"?: number; // points cumulative (month number)
  "11PC"?: number; // points cumulative (month number)
  "12PC"?: number; // points cumulative (month number)
};

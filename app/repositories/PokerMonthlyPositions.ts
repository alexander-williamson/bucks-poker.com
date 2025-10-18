import joi from "joi";
import path from "path";
import csv from "csvtojson";
import { EnsureFilePath, GetCsvFromXlsx } from "./RepositoryHelpers";

export class PokerMonthlyPositionsRepository {
  private monthlyPositionsPath: string;

  constructor(private readonly options: Options) {
    this.monthlyPositionsPath = path.join(options.dir, "Poker - Monthly Positions.xlsx");
  }

  async getData(): Promise<PokerMonthlyPosition[]> {
    const fullPath = await EnsureFilePath(this.monthlyPositionsPath);
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
};

type Options = {
  dir: string;
};

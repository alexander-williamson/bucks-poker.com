import path from "path";
import { getMonthlyPositions, GetYears, FILENAME } from "../../repositories/MonthlyPositionsRepository";

describe("PokerMonthlyPositionsRepository", () => {
  const filePath = path.resolve(`__tests__/data/${FILENAME}`);

  describe("getData", () => {
    it("parses the columns", async () => {
      const result = await getMonthlyPositions(filePath);

      expect(result[0]).toEqual({
        "08": 4,
        "08CC": 0,
        "08PC": 2,
        "09": 4,
        "09CC": 0,
        "09PC": 4,
        "10": 4,
        "10CC": 0,
        "10PC": 5,
        "11": 3,
        "11CC": 0,
        "11PC": 8,
        PersStatus: "Active",
        Person: "Andy",
        Year: 2006,
        pers_personid: 349,
      });
      expect(result[1]).toEqual({
        "08": 4,
        "08CC": 0,
        "08PC": 2,
        "09": 1,
        "09CC": 0,
        "09PC": 9,
        "10": 2,
        "10CC": 0,
        "10PC": 16,
        "11": 2,
        "11CC": 0,
        "11PC": 20,
        PersStatus: "Inactive",
        Person: "Bob",
        Year: 2006,
        pers_personid: 351,
      });
    });
  });

  describe("getYears", () => {
    it("returns the years", async () => {
      const data = await getMonthlyPositions(filePath);
      const result = GetYears(data);

      expect(result).toEqual([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
    });
  });

  describe("FILENAME", () => {
    it("is correct", () => {
      expect(FILENAME).toEqual("Poker - Monthly Positions.xlsx");
    });
  });
});

export {};

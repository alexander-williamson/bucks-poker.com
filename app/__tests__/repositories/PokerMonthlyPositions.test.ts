import path from "path";
import { GetYears, PokerMonthlyPositionsRepository } from "../../repositories/PokerMonthlyPositions";

const dir = path.join(process.cwd(), "app/__tests__/data");

describe("PokerMonthlyPositionsRepository", () => {
  const sut = new PokerMonthlyPositionsRepository({ dir });
  describe("getData", () => {
    it("parses the columns", async () => {
      const result = await sut.getData();

      expect(result[0]).toEqual({
        PersStatus: "Active",
        Person: "Andy",
        Year: 2006,
        pers_personid: 349,
        "08": 4,
        "09": 4,
        "10": 4,
        "11": 3,
      });
      expect(result[1]).toEqual({
        PersStatus: "Inactive",
        Person: "Bob",
        Year: 2006,
        pers_personid: 351,
        "08": 4,
        "09": 1,
        "10": 2,
        "11": 2,
      });
    });
  });

  describe("getYears", () => {
    it("returns the years", async () => {
      const data = await sut.getData();
      const result = GetYears(data);

      expect(result).toEqual([2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
    });
  });
});

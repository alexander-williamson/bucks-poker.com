import path from "path";
import { GetYearFiguresDataAsync, FILENAME } from "../../repositories/YearFiguresRepository";

describe("YearFiguresRepository", () => {
  it("can read and parse a file with no issues", async () => {
    const filePath = path.resolve(`__tests__/data/${FILENAME}`);

    const result = await GetYearFiguresDataAsync(filePath);

    expect(result.length).toEqual(209);
    expect(result[0]).toEqual({
      Bonus: "0",
      Chips: "98150",
      PersStatus: "Inactive",
      Person: "Bob",
      Points: 43,
      PointsBonus: "43",
      SRank: "1",
      Takehome: "0",
      Winnings: "95",
      Yr: "2012",
      pers_personid: "351",
    });
    expect(result[result.length - 1]).toEqual({
      Bonus: "0",
      Chips: "52200",
      PersStatus: "Active",
      Person: "Alex",
      Points: 12,
      PointsBonus: "12",
      SRank: "10",
      Takehome: "-10",
      Winnings: "30",
      Yr: "2025",
      pers_personid: "348",
    });
  });

  it("can read and parse a file with an empty Points value", async () => {
    const filePath = path.resolve("__tests__/data/Poker - Year Figures with blank Points 215.xlsx");

    const result = await GetYearFiguresDataAsync(filePath);

    expect(result.length).toEqual(216);
    expect(result[0]).toEqual({
      Bonus: "0",
      Chips: "98150",
      PersStatus: "Inactive",
      Person: "Bob",
      Points: 43,
      PointsBonus: "43",
      SRank: "1",
      Takehome: "0",
      Winnings: "95",
      Yr: "2012",
      pers_personid: "351",
    });
    expect(result[result.length - 1]).toEqual({
      Bonus: "0",
      Chips: "0",
      PersStatus: "Active",
      Person: "Maisy",
      Points: 0,
      PointsBonus: "0",
      SRank: "7",
      Takehome: "-10",
      Winnings: "0",
      Yr: "2026",
      pers_personid: "360",
    });
  });

  describe("FILENAME", () => {
    it("is correct", () => {
      expect(FILENAME).toEqual("Poker - Year Figures.xlsx");
    });
  });
});

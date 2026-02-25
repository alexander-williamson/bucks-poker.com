import { FILENAME, GetYearFiguresDataAsync } from "../../repositories/YearFiguresRepository";
import { OverallPositionService } from "../../services/OverallPositionService";
import path from "path";

describe("OverallPositionService", () => {
  describe("getData", () => {
    const filePath = path.resolve(`__tests__/data/${FILENAME}`);

    it("returns activePlayers", async () => {
      const yearData = await GetYearFiguresDataAsync(filePath);
      const sut = new OverallPositionService(yearData);

      expect(sut.getData().activePlayers).toEqual([
        { lastYearPlayed: 2025, name: "Andy", totalChips: 2361754, totalPoints: 851, yearsPlayed: 20 },
        { lastYearPlayed: 2025, name: "Prashant", totalChips: 571708, totalPoints: 164, yearsPlayed: 6 },
        { lastYearPlayed: 2025, name: "Maisy", totalChips: 1523857, totalPoints: 465, yearsPlayed: 14 },
        { lastYearPlayed: 2025, name: "Richard", totalChips: 1636022, totalPoints: 635, yearsPlayed: 20 },
        { lastYearPlayed: 2025, name: "Matt", totalChips: 1955153, totalPoints: 733, yearsPlayed: 20 },
        { lastYearPlayed: 2025, name: "Pepe", totalChips: 1240100, totalPoints: 391, yearsPlayed: 13 },
        { lastYearPlayed: 2025, name: "Mark", totalChips: 1628341, totalPoints: 537, yearsPlayed: 16 },
        { lastYearPlayed: 2025, name: "Anthony", totalChips: 1545720, totalPoints: 496, yearsPlayed: 14 },
        { lastYearPlayed: 2025, name: "Jon", totalChips: 1831550, totalPoints: 684, yearsPlayed: 20 },
        { lastYearPlayed: 2025, name: "Alex", totalChips: 1024642, totalPoints: 302, yearsPlayed: 15 },
      ]);
    });

    it("returns otherPlayers", async () => {
      const yearData = await GetYearFiguresDataAsync(filePath);
      const sut = new OverallPositionService(yearData);
      expect(sut.getData().otherPlayers).toEqual([
        { lastYearPlayed: 2016, name: "Bob", totalChips: 327525, totalPoints: 139, yearsPlayed: 9 },
        { lastYearPlayed: 2010, name: "Chris", totalChips: 4450, totalPoints: 3, yearsPlayed: 1 },
        { lastYearPlayed: 2021, name: "Crafty", totalChips: 206853, totalPoints: 56, yearsPlayed: 4 },
        { lastYearPlayed: 2023, name: "Douglas", totalChips: 71400, totalPoints: 24, yearsPlayed: 1 },
        { lastYearPlayed: 2022, name: "Illya", totalChips: 112975, totalPoints: 110, yearsPlayed: 6 },
        { lastYearPlayed: 2012, name: "Jim", totalChips: 40900, totalPoints: 17, yearsPlayed: 3 },
        { lastYearPlayed: 2010, name: "John", totalChips: 63525, totalPoints: 46, yearsPlayed: 3 },
        { lastYearPlayed: 2010, name: "Jonathan", totalChips: 54050, totalPoints: 35, yearsPlayed: 3 },
        { lastYearPlayed: 2018, name: "Keith", totalChips: 786525, totalPoints: 333, yearsPlayed: 12 },
        { lastYearPlayed: 2009, name: "Matthew", totalChips: 5950, totalPoints: 5, yearsPlayed: 1 },
        { lastYearPlayed: 2008, name: "Richard Snr", totalChips: 0, totalPoints: 1, yearsPlayed: 1 },
        { lastYearPlayed: 2012, name: "Stuart", totalChips: 178500, totalPoints: 183, yearsPlayed: 7 },
      ]);
    });

    it("returns otherPlayers", async () => {
      const yearData = await GetYearFiguresDataAsync(filePath);
      const sut = new OverallPositionService(yearData);
      expect(sut.getData().overallRanking).toEqual([
        { lastYearPlayed: 2025, name: "Andy", position: 0, totalChips: 2361754, totalPoints: 851, yearsPlayed: 20 },
        { lastYearPlayed: 2025, name: "Matt", position: 1, totalChips: 1955153, totalPoints: 733, yearsPlayed: 20 },
        { lastYearPlayed: 2025, name: "Jon", position: 2, totalChips: 1831550, totalPoints: 684, yearsPlayed: 20 },
        { lastYearPlayed: 2025, name: "Richard", position: 3, totalChips: 1636022, totalPoints: 635, yearsPlayed: 20 },
        { lastYearPlayed: 2025, name: "Mark", position: 4, totalChips: 1628341, totalPoints: 537, yearsPlayed: 16 },
        { lastYearPlayed: 2025, name: "Anthony", position: 5, totalChips: 1545720, totalPoints: 496, yearsPlayed: 14 },
        { lastYearPlayed: 2025, name: "Maisy", position: 6, totalChips: 1523857, totalPoints: 465, yearsPlayed: 14 },
        { lastYearPlayed: 2025, name: "Pepe", position: 7, totalChips: 1240100, totalPoints: 391, yearsPlayed: 13 },
        { lastYearPlayed: 2018, name: "Keith", position: 8, totalChips: 786525, totalPoints: 333, yearsPlayed: 12 },
        { lastYearPlayed: 2025, name: "Alex", position: 9, totalChips: 1024642, totalPoints: 302, yearsPlayed: 15 },
        { lastYearPlayed: 2012, name: "Stuart", position: 10, totalChips: 178500, totalPoints: 183, yearsPlayed: 7 },
        { lastYearPlayed: 2025, name: "Prashant", position: 11, totalChips: 571708, totalPoints: 164, yearsPlayed: 6 },
        { lastYearPlayed: 2016, name: "Bob", position: 12, totalChips: 327525, totalPoints: 139, yearsPlayed: 9 },
        { lastYearPlayed: 2022, name: "Illya", position: 13, totalChips: 112975, totalPoints: 110, yearsPlayed: 6 },
        { lastYearPlayed: 2021, name: "Crafty", position: 14, totalChips: 206853, totalPoints: 56, yearsPlayed: 4 },
        { lastYearPlayed: 2010, name: "John", position: 15, totalChips: 63525, totalPoints: 46, yearsPlayed: 3 },
        { lastYearPlayed: 2010, name: "Jonathan", position: 16, totalChips: 54050, totalPoints: 35, yearsPlayed: 3 },
        { lastYearPlayed: 2023, name: "Douglas", position: 17, totalChips: 71400, totalPoints: 24, yearsPlayed: 1 },
        { lastYearPlayed: 2012, name: "Jim", position: 18, totalChips: 40900, totalPoints: 17, yearsPlayed: 3 },
        { lastYearPlayed: 2009, name: "Matthew", position: 19, totalChips: 5950, totalPoints: 5, yearsPlayed: 1 },
        { lastYearPlayed: 2010, name: "Chris", position: 20, totalChips: 4450, totalPoints: 3, yearsPlayed: 1 },
        { lastYearPlayed: 2008, name: "Richard Snr", position: 21, totalChips: 0, totalPoints: 1, yearsPlayed: 1 },
      ]);
    });
  });
});

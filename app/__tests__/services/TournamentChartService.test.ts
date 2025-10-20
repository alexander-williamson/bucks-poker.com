import { PokerMonthlyPosition } from "../../repositories/MonthlyPositionsRepository";
import { TournamentChartService } from "../../services/TournamentChartService";
import monthlyPositionsRaw from "../data/ExampleMonthlyPositions.json";

const monthlyPositions = monthlyPositionsRaw as unknown as PokerMonthlyPosition[];

describe("TournamentChartService", () => {
  let sut: TournamentChartService;
  beforeEach(() => {
    sut = new TournamentChartService();
  });
  it("returns data for the correct month", () => {
    const results = sut.GetChartData(monthlyPositions, 2025);

    expect(results.data[0]).toEqual({});
  });
});

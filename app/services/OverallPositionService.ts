import { Year } from "../models/Year";

export class OverallPositionService {
  constructor(private readonly yearData: Year[]) {}

  public getData(): GetDataResult {
    const allNames = [...new Set(this.yearData.map((x) => x.Person))].sort();
    const latestYear = Math.max(...this.yearData.map((x) => x.Yr));

    const activePlayers = this.yearData
      .filter((x) => x.Yr === latestYear)
      .map((x) => x.Person)
      .map((name) => ({
        name,
        lastYearPlayed: this.getLastYear(name),
        totalChips: this.getTotalChips(name),
        totalPoints: this.getTotalPoints(name),
        yearsPlayed: this.getTotalYearsPlayed(name),
      }));

    const otherPlayers = allNames
      .filter((name) => activePlayers.map((x) => x.name).indexOf(name) < 0)
      .map((name) => ({
        name,
        lastYearPlayed: this.getLastYear(name),
        totalChips: this.getTotalChips(name),
        totalPoints: this.getTotalPoints(name),
        yearsPlayed: this.getTotalYearsPlayed(name),
      }));

    const overallRanking = allNames
      .map((name) => ({
        name,
        lastYearPlayed: this.getLastYear(name),
        totalChips: this.getTotalChips(name),
        totalPoints: this.getTotalPoints(name),
        yearsPlayed: this.getTotalYearsPlayed(name),
      }))
      .map((x, _, arr) => ({
        ...x,
        position: OverallPositionService.rank(arr, x.name),
      }))
      .sort((a, b) => a.position - b.position)
      .map((data) => ({ ...data }));

    return { activePlayers, otherPlayers, overallRanking };
  }

  private getTotalYearsPlayed(playerName: string): number {
    const yearResults = this.yearData.filter((x) => x.Person === playerName);
    return yearResults.length;
  }

  private static rank(dataSet: any[], name: string, scoreFunc = (x: { totalPoints: any }): number => x.totalPoints) {
    const result = dataSet
      .map((x) => {
        const totalPoints = x.totalPoints ?? 0;
        // if (!x.totalPoints) {
        //   throw new Error("x.totalPoints not provided");
        // }
        return {
          name: x.name,
          score: scoreFunc({ totalPoints }),
        };
      })
      .sort((a, b) => a.score - b.score)
      .reverse();

    return result.map((x) => x.name).indexOf(name);
  }

  private getLastYear(playerName: string): number {
    return Math.max(...this.yearData.filter((item) => item.Person === playerName).map((item) => item.Yr));
  }

  private getTotalChips(playerName: string): number {
    const chipTotalsEachYear = this.yearData.filter((x) => x.Person === playerName).map((x) => x.Chips);
    return chipTotalsEachYear.reduce((a, b) => a + b, 0);
  }

  private getTotalPoints(playerName: string): number {
    const pointsTotalEachYear = this.yearData.filter((item) => item.Person === playerName).map((x) => x.Points);
    const result = pointsTotalEachYear.reduce((a, b) => a + b, 0);
    return result;
  }
}

export type GetDataResult = {
  activePlayers: ActivePlayer[];
  otherPlayers: OtherPlayer[];
  overallRanking: OverallRanking[];
};

export type ActivePlayer = {
  name: string;
  lastYearPlayed: number;
  totalChips: number;
  totalPoints: number;
  yearsPlayed: number;
};

type OtherPlayer = {
  name: string;
  lastYearPlayed: number;
  totalChips: number;
  totalPoints: number;
  yearsPlayed: number;
};

type OverallRanking = {
  position: number;
  name: string;
  lastYearPlayed: number;
  totalChips: number;
  totalPoints: number;
  yearsPlayed: number;
};

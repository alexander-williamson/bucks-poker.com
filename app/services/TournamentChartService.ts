import { PokerMonthlyPosition } from "../repositories/MonthlyPositionsRepository";
import { MonthNames } from "./DateHelpers";
import { padStringWith } from "./StringHelpers";

export class TournamentChartService {
  months = [...Array(12)].map((_, i) => ({
    id: parseInt(i as unknown as any),
    name: MonthNames[i],
  }));

  public GetChartData(monthlyPositions: PokerMonthlyPosition[], year: number): ChartData {
    const monthRows = monthlyPositions.filter((x) => x.Year === year);
    const names = monthRows.map((row) => row.Person);
    const data = names
      .filter((_, i) => _ === _)
      .map((name) => {
        const row = monthRows.find((x) => x.Person === name);
        const data = this.months.map((month) => {
          const allPositionsForThisMonth = monthRows
            .map((monthRow) => ({
              name: monthRow.Person,
              chipsCumulative: TournamentChartService.parseOrNull(monthRow[`${padStringWith(month.id + 1, 2)}CC`]),
              pointsCumulative: TournamentChartService.parseOrNull(monthRow[`${padStringWith(month.id + 1, 2)}PC`]),
            }))
            .filter((x) => x.chipsCumulative > 0 || x.pointsCumulative > 0)
            .sort((a, b) => (a.chipsCumulative > b.chipsCumulative ? -1 : 1))
            .sort((a, b) => (a.pointsCumulative > b.pointsCumulative ? -1 : 1));

          const position = allPositionsForThisMonth.indexOf(allPositionsForThisMonth.find((x) => x.name === name));

          const result = {
            id: month.id,
            name: month.name,
            chips: TournamentChartService.parseOrNull(row[`${padStringWith(month.id + 1, 2)}P`]),
            chipsCumulative: TournamentChartService.parseOrNull(row[`${padStringWith(month.id + 1, 2)}CC`]),
            points: TournamentChartService.parseOrNull(row[`${padStringWith(month.id + 1, 2)}P`]),
            pointsCumulative: TournamentChartService.parseOrNull(row[`${padStringWith(month.id + 1, 2)}PC`]),
            monthPositions: allPositionsForThisMonth,
            position: position > -1 ? position + 1 : null,
          };

          console.debug({ result });

          return result;
        });

        return {
          name,
          data,
        };
      });

    return { data };
  }

  static parseOrNull(original: any): number | null {
    return original === "" ? null : parseInt(original);
  }
}

export type ChartData = {
  data: {
    name: string;
    data: {
      id: number;
      name: string;
      chips: number;
      chipsCumulative: number;
      points: number;
      pointsCumulative: number;
      monthPositions: {
        name: string;
        chipsCumulative: number;
        pointsCumulative: number;
      }[];
      position: number;
    }[];
  }[];
};

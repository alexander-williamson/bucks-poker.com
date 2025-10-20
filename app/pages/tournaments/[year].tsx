import "chart.js/auto";
import moment from "moment";
import Head from "next/head";
import path from "path";
import { ReactElement, useState } from "react";
import { Chart } from "react-chartjs-2";
import { Badge } from "../../components/Badges";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";
import TournamentResultsTable from "../../components/TournamentResultsTable";
import { Year as YearModel } from "../../models/Year";
import { GetYearFiguresDataAsync } from "../../repositories/FileRepository";
import { GetYears, PokerMonthlyPositionsRepository } from "../../repositories/PokerMonthlyPositions";
import { GetColourForName } from "../../services/ColourHelpers";
import { MonthNames } from "../../services/DateHelpers";

const monthlyPositionsRepository = new PokerMonthlyPositionsRepository({
  dir: path.join(process.cwd(), "data"),
});

const getTableData = async (year: number): Promise<YearModel[]> => {
  const yearData = await GetYearFiguresDataAsync();
  const data = yearData
    .filter((x) => `${x.Yr}` === `${year}`)
    .sort((a, b) => {
      if (parseInt(a.SRank) < parseInt(b.SRank)) {
        return -1;
      }
      if (parseInt(a.SRank) > parseInt(b.SRank)) {
        return 1;
      }
      return 0;
    });
  return data;
};

async function getMonthsForYear(year: number): Promise<number[]> {
  const monthlyPositions = await monthlyPositionsRepository.getData();
  const monthlyPositionsFilteredByYear = monthlyPositions.filter((x) => x.Year === year); // monthly positions for this year
  const firstPerson = monthlyPositionsFilteredByYear[0]; // work with the first person
  const monthKeys: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const matchingKeys = Object.keys(firstPerson).filter((key) => monthKeys.find((mk) => mk === key)); // get the keys we care about
  return matchingKeys.map((key) => parseInt(key));
}

const getEarliestDate = async (year: number) => {
  const monthsForYear = await getMonthsForYear(year);
  const lowestMonthNumber = monthsForYear[0];
  const month = lowestMonthNumber - 1;
  const date = new Date(Date.UTC(year, month, 1));
  return date.toISOString().substr(0, 10);
};

const getLatestDate = async (year: number) => {
  const monthsForYear = await getMonthsForYear(year);
  const highestNumber = monthsForYear.reverse()[0];
  return new Date(Date.UTC(year, highestNumber - 1, 1)).toISOString().substring(0, 10);
};

const pad = (n: string | number, width: number, z?: string): string => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const months = [...Array(12)].map((_, i) => ({
  id: parseInt(i as unknown as any),
  name: MonthNames[i],
}));

function parseOrNull(original: any): number | null {
  return original === "" ? null : parseInt(original);
}

type ChartData = {
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

async function getChartData(year: number): Promise<ChartData> {
  const rows = await monthlyPositionsRepository.getData();
  const monthRows = rows.filter((x) => x.Year === year);
  const names = monthRows.map((row) => row.Person);
  const data = names
    .filter((_, i) => _ === _)
    .map((name) => {
      const row = monthRows.find((x) => x.Person === name);
      const data = months.map((month) => {
        const allPositionsForThisMonth = monthRows
          .map((x) => ({
            name: x.Person,
            chipsCumulative: parseOrNull(x[`${pad(month.id + 1, 2)}CC`]),
            pointsCumulative: parseOrNull(x[`${pad(month.id + 1, 2)}PC`]),
          }))
          .filter((x) => x.chipsCumulative > 0 || x.pointsCumulative > 0)
          .sort((a, b) => (a.chipsCumulative > b.chipsCumulative ? -1 : 1))
          .sort((a, b) => (a.pointsCumulative > b.pointsCumulative ? -1 : 1));

        const position = allPositionsForThisMonth.indexOf(allPositionsForThisMonth.find((x) => x.name === name));

        const result = {
          id: month.id,
          name: month.name,
          chips: parseOrNull(row[`${pad(month.id + 1, 2)}P`]),
          chipsCumulative: parseOrNull(row[`${pad(month.id + 1, 2)}CC`]),
          points: parseOrNull(row[`${pad(month.id + 1, 2)}P`]),
          pointsCumulative: parseOrNull(row[`${pad(month.id + 1, 2)}PC`]),
          monthPositions: allPositionsForThisMonth,
          position: position > -1 ? position + 1 : null,
        };

        return result;
      });

      return {
        name,
        data,
      };
    });

  return { data };
}

type StaticPathsResult = {
  paths: { params: { year: string } }[];
  fallback: boolean;
};

export async function getStaticPaths(): Promise<StaticPathsResult> {
  const dir = path.join(process.cwd(), "data");
  const monthlyPositionsRepository = new PokerMonthlyPositionsRepository({ dir });
  const monthlyPositions = await monthlyPositionsRepository.getData();
  const years = GetYears(monthlyPositions);
  return {
    paths: years.map((year) => ({
      params: {
        year: `${year}`,
      },
    })),
    fallback: false,
  };
}

type StaticPropsResult = {
  props: ComponentProps;
};

type ComponentProps = {
  buildTimeDate: string;
  chartData: ChartData;
  earliestDate: string;
  latestDate: string;
  names: any[];
  tableData: any[];
  year: number;
};

export async function getStaticProps({ params }): Promise<StaticPropsResult> {
  const year = parseInt(params.year);
  const tableData = await getTableData(year);
  const names = tableData.map((x) => x.Person);
  const result = {
    props: {
      buildTimeDate: process.env.BUILD_TIME || new Date().toISOString(),
      chartData: await getChartData(year),
      earliestDate: await getEarliestDate(year),
      latestDate: await getLatestDate(year),
      names,
      tableData,
      year,
    },
  };
  return result;
}

export type YearProps = {
  year: string;
  data: {
    colour: { hex: string };
    Person: string;
    SRank: string;
    Points: number;
    Bonus: string;
    Chips: string;
  }[];
};

export default function Year(props: ComponentProps): ReactElement {
  const currentYear = new Date().getFullYear();
  const [playerVisiblity, setPlayerVisibility] = useState(props.names.map((x) => ({ name: x, visible: true })));
  const [isAllVisible, setIsAllVisible] = useState(true);
  const toggleShow = (name: string) => {
    const isAllVisible = playerVisiblity.every((x) => x.visible === true);
    const visibleCount = playerVisiblity.filter((x) => x.visible === false).length;
    const isMemberCurrentlyVisible = playerVisiblity.find((x) => x.name === name && x.visible === true).visible;

    if (isAllVisible) {
      // if they are all visible, the user wants to see one user
      const results = playerVisiblity.map((x) => ({
        name: x.name,
        visible: x.name === name,
      }));
      setPlayerVisibility(results);
    } else if (visibleCount === playerVisiblity.length - 1 && isMemberCurrentlyVisible) {
      // if only one item is visible and it's the user, set them all visible
      const results = playerVisiblity.map((x) => ({
        name: x.name,
        visible: x.name === name ? !x.visible : x.visible,
      }));
      setPlayerVisibility(results);
    } else {
      // otherwise flip the toggle
      const results = playerVisiblity.map((x) => ({
        name: x.name,
        visible: x.name === name ? !x.visible : x.visible,
      }));
      setPlayerVisibility(results);
    }
  };
  const toggleAll = (_: boolean): void => {
    const newValue = !playerVisiblity.every((x) => x.visible === true);
    const results = playerVisiblity.map((item) => ({
      ...item,
      visible: newValue,
    }));
    setIsAllVisible(newValue);
    setPlayerVisibility(results);
  };
  const title = `${props.year} Tournament`;
  const description = `Bucks Poker Tournament results for ${String(props.year)}`;
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <Breadcrumbs parent="Tournaments" parentLink="/tournaments">
          {props.year} Tournament
          {`${props.year}` === `${currentYear}` && (
            <Badge className="bg-indigo-500 text-white" title="Current Year">
              Current
            </Badge>
          )}
        </Breadcrumbs>
        <Chart
          className="max-h-80 w-full pb-8"
          type="line"
          datasetIdKey="label"
          options={{
            spanGaps: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              yAxis: {
                axis: "y",
                bounds: "data",
                reverse: true,
              },
            },
          }}
          data={{
            labels: props.chartData.data[0].data.map((x) => x.name),
            datasets: props.chartData.data.map((item) => ({
              label: item.name,
              data: item.data.map((x) => x.position),
              yAxisID: "yAxis",
              tension: 0.3,
              backgroundColor: GetColourForName(item.name, props.names),
              borderColor: GetColourForName(item.name, props.names),
              pointRadius: 6,
              hidden: playerVisiblity.find((x) => x.name === item.name).visible === false,
            })),
          }}
        />

        {/* <TournamentResultsTable
          names={props.names}
          data={props.tableData.map((item) => ({
            ...item,
            isChecked: playerVisiblity.find((x) => x.name === item.Person).visible === true,
          }))}
          onToggleAll={() => toggleAll(!isAllVisible)}
          onRowClick={(name: string) => toggleShow(name)}
          isAllChecked={isAllVisible}
        /> */}

        <p className="pt-1 pb-6 px-1">
          Showing data from {moment(props.earliestDate.substr(0, 10)).format("MMMM YYYY")} &rarr; {moment(props.latestDate.substr(0, 10)).format("MMMM YYYY")} inclusive.
        </p>
        {currentYear === props.year && <p className="pt-1 pb-6 px-1">This is the current year so the values here may change.</p>}
        <p className="pt-1 pb-6 px-1">
          This website was generated <span title={moment(props.buildTimeDate).format("LLLL")}>{moment(props.buildTimeDate).fromNow()}</span>.
        </p>
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

import "chart.js/auto";
import { Chart } from "react-chartjs-2";

import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import TournamentResultsTable from "../../components/TournamentResultsTable";
import moment from "moment";
import {
  GetMonthlyPositionsDataAsync,
  GetYearFiguresDataAsync,
} from "../../services/data";
import { Badge } from "../../components/Badges";
import { MonthNames } from "../../services/helpers";
import { getColour } from "../../services/colours"

const getTableData = async (year) => {
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

const getHighest = (arr) => {
  const items = arr.reduce((result, item) => {
    const keys = Object.keys(item).filter((key) => item[key].length > 0);
    return [...result, ...keys];
  }, []);
  const result = [...new Set(items)];
  return result;
};

const getMonthsForYear = async (year) => {
  const monthlyPositions = await GetMonthlyPositionsDataAsync();
  const monthlyPositionsFilteredByYear = monthlyPositions.filter(
    (x) => x.Year === `${year}`
  );
  const mergedProperties = getHighest(monthlyPositionsFilteredByYear);

  const result = mergedProperties
    .filter((x) => parseInt(x) > 0)
    .map((x) => parseInt(x))
    .sort((a, b) => a - b);

  return result;
};

const getEarliestDate = async (year) => {
  const monthsForYear = await getMonthsForYear(year);
  const lowestMonthNumber = monthsForYear[0];
  const month = lowestMonthNumber - 1;
  const day = 1;
  const result = new Date(Date.UTC(year, month, day))
    .toISOString()
    .substr(0, 10);
  return result;
};

const getLatestDate = async (year) => {
  const monthsForYear = await getMonthsForYear(year);
  const highestNumber = monthsForYear.reverse()[0];
  const result = new Date(Date.UTC(year, highestNumber - 1, 1))
    .toISOString()
    .substring(0, 10);
  return result;
};

const pad = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const months = [...Array(12)].map((_, i) => ({
  id: parseInt(i),
  name: MonthNames[i],
}));

const parseOrNull = (original) => (original === "" ? null : parseInt(original));

const getChartData = async (year) => {
  const rows = await GetMonthlyPositionsDataAsync();
  const monthRows = rows.filter((x) => parseInt(x.Year) === year);
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

        const position = allPositionsForThisMonth.indexOf(
          allPositionsForThisMonth.find((x) => x.name === name)
        );

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

        console.debug(result);
        return result;
      });

      return {
        name,
        data,
      };
    });

  return { data };
};

export async function getStaticPaths() {
  const yearData = await GetYearFiguresDataAsync();
  const years = [...new Set(yearData.map((x) => x.Yr))].reverse();
  return {
    paths: years.map((year) => ({
      params: {
        year: `${year}`,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const year = parseInt(params.year);
  const tableData = await getTableData(year);
  const names = tableData.map(x => x.Person);
  const result = {
    props: {
      buildTimeDate: process.env.BUILD_TIME || new Date(),
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

export default function Year(props) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <html lang="en-gb" />
        <title>{props.year} Tournament</title>
        <meta
          name="description"
          content={`Bucks Poker Tournament results for ${props.year}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <Breadcrumbs parent="Tournaments" parentLink="/tournaments">
          {props.year} Tournament
          {`${props.year}` === `${currentYear}` && (
            <Badge className="bg-indigo-500 text-white">Current</Badge>
          )}
        </Breadcrumbs>

        {/* <pre>{JSON.stringify(props.chartData, null, 2)}</pre> */}

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
              backgroundColor: getColour(item.name, props.names),
              borderColor: getColour(item.name, props.names),
              pointRadius: 6,
            })),
          }}
        />

        <TournamentResultsTable data={props.tableData} />
        <p className="pt-1 pb-6 px-1">
          Showing data from{" "}
          {moment(props.earliestDate.substr(0, 10)).format("MMMM YYYY")} &rarr;{" "}
          {moment(props.latestDate.substr(0, 10)).format("MMMM YYYY")}{" "}
          inclusive.
        </p>
        {currentYear === props.year && (
          <p className="pt-1 pb-6 px-1">
            This is the current year so the values here may change.
          </p>
        )}
        <p className="pt-1 pb-6 px-1">
          This website was last updated{" "}
          <span title={moment(props.buildTimeDate).format("LLLL")}>
            {moment(props.buildTimeDate).fromNow()}
          </span>
          .
        </p>
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

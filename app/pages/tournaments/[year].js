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
import { Colors, MonthNames } from "../../services/helpers";

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
    .substr(0, 10);
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
  const data = names.map((name) => {
    const row = monthRows.find((x) => x.Person === name);
    return {
      name,
      data: months.map((m) => {
        const monthPositions = monthRows
          .map((x) => ({
            name: x.Person,
            chips: parseOrNull(x[`${pad(m.id + 1, 2)}C`]),
            points: parseOrNull(x[`${pad(m.id + 1, 2)}P`]),
          }))
          .sort((a, b) => (a.chips > b.chips ? -1 : 1))
          .sort((a, b) => (a.points > b.points ? -1 : 1));
        return {
          ...m,
          chips: parseOrNull(row[`${pad(m.id + 1, 2)}P`]),
          chipsCumulative: parseOrNull(row[`${pad(m.id + 1, 2)}CC`]),
          points: parseOrNull(row[`${pad(m.id + 1, 2)}P`]),
          pointsCumulative: parseOrNull(row[`${pad(m.id + 1, 2)}PC`]),
          monthPositions,
          position: monthPositions.indexOf(
            monthPositions.find((x) => x.name === name)
          ),
        };
      }),
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
  const intYear = parseInt(params.year);
  const result = {
    props: {
      year: intYear,
      tableData: await getTableData(intYear),
      chartData: await getChartData(intYear),
      earliestDate: await getEarliestDate(intYear),
      latestDate: await getLatestDate(intYear),
      buildTimeDate: process.env.BUILD_TIME || new Date(),
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

        <pre>{JSON.stringify(props.chartData, null, 2)}</pre>

        <Chart
          className="max-h-100 w-full pb-8"
          type="line"
          datasetIdKey="label"
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              yAxis: {
                axis: "y",
                bounds: "data",
              },
            },
          }}
          data={{
            labels: props.chartData.data[0].data.map((x) => x.name),
            datasets: props.chartData.data.map((x, i) => ({
              label: x.name,
              data: x.data.map((x) => x.pointsCumulative).filter((x) => x > 0),
              yAxisID: "yAxis",
              tension: 0.3,
              backgroundColor: Colors[i],
              borderColor: Colors[i],
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

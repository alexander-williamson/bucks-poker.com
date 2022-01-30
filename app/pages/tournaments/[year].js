import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import TournamentResultsTable from "../../components/TournamentResultsTable";
import moment from "moment";
import {
  GetMonthlyPositionsDataAsync,
  GetYearFiguresDataAsync,
} from "../../services/data";

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

const getChartData = async (year) => {
  const monthlyPositions = await GetMonthlyPositionsDataAsync();
  const thisYearsData = monthlyPositions.filter(
    (x) => parseInt(x.Year) === year
  );
  const people = thisYearsData.map((x) => x.Person);

  const data = people.map((name, i) => ({
    name: name,
    data: MonthNames.map((month, index) => ({
      category: month.substr(0, 3),
      value: parseInt(
        thisYearsData.find((x) => x.Person === name)[`${index + 1}`]
      ),
    })),
    stroke: Colors[i],
  }));

  return data;
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
  return {
    props: {
      year: intYear,
      tableData: await getTableData(intYear),
      chartData: await getChartData(intYear),
      earliestDate: await getEarliestDate(intYear),
      latestDate: await getLatestDate(intYear),
      buildTimeDate: process.env.BUILD_TIME || new Date(),
    },
  };
}

export default function Year(props) {
  const currentYear = new Date().getFullYear();
  const title = `${props.year} Tournament ${
    props.year === currentYear ? "(Current)" : ""
  }`;
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <html lang="en-gb" />
        <title>{title}</title>
        <meta
          name="description"
          content={`Bucks Poker Tournament results for ${props.year}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <Breadcrumbs
          parent="Tournaments"
          parentLink="/tournaments"
          current={title}
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

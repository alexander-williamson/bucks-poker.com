import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import ResultsTable from "../../components/ResultsTable";
import moment from "moment";
import { GetMonthlyPositionsDataAsync, GetYearDataAsync } from "../../services/data"

const getTableData = async (year) => {
  const yearData = await GetYearDataAsync()
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

const getHighest = arr => {
  const items = arr.reduce((result, item) => {
    const keys = Object.keys(item).filter(key => item[key].length > 0)
    return [...result, ...keys]
  }, [])
  const result = [...new Set(items)]
  return result;
}

const getMonthsForYear = async (year) => {
  const monthlyPositions = await GetMonthlyPositionsDataAsync();
  const monthlyPositionsFilteredByYear = monthlyPositions.filter(x => x.Year === `${year}`)
  const mergedProperties = getHighest(monthlyPositionsFilteredByYear)

  const result = mergedProperties
    .filter(x => parseInt(x) > 0)
    .map(x => parseInt(x))
    .sort((a, b) => a - b);


  return result;
}

const getEarliestDate = async (year) => {
  const monthsForYear = await getMonthsForYear(year);
  const lowestMonthNumber = monthsForYear[0]
  const month = lowestMonthNumber - 1;
  const day = 1;
  const result = new Date(Date.UTC(year, month, day)).toISOString().substr(0, 10)
  return result
}

const getLatestDate = async (year) => {
  const monthsForYear = await getMonthsForYear(year);
  const highestNumber = monthsForYear.reverse()[0]
  const result = new Date(Date.UTC(year, highestNumber - 1, 1)).toISOString().substr(0, 10)
  return result
}


const colors = [
  "#f55142",
  "#f58442",
  "#f5b342",
  "#f5ec42",
  "#c8f542",
  "#87f542",
  "#4bf542",
  "#42f590",
  "#42f5b6",
  "#42f5f2",
  "#00bfff",
  "#0077ff",
  "#0022ff",
  "#9500ff",
  "#e100ff"
]

const getChartData = async (year) => {

  const monthlyPositions = await GetMonthlyPositionsDataAsync();
  const thisYearsData = monthlyPositions.filter(x => parseInt(x.Year) === year);
  const people = thisYearsData.map(x => x.Person)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const data = people.map((name, i) => ({
    name: name,
    data: months.map((month, index) => ({
      category: month.substr(0, 3),
      value: parseInt(thisYearsData.find(x => x.Person === name)[`${index + 1}`]),
    })),
    stroke: colors[i],
  }));


  return data;
}


export async function getStaticPaths() {
  const yearData = await GetYearDataAsync();
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
  const title = `${props.year} Tournament ${props.year === currentYear ? "(Current)" : ""
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
        <div className="hero py-20 text-center">
          <h1 className="text-5xl font-bold font-sans pb-5">{title}</h1>
        </div>

        <Breadcrumbs
          parent="Tournaments"
          parentLink="/tournaments"
          current={title}
        />

        {/* <ResponsiveContainer width="95%" height={400}>
          <LineChart className="pt-1 pb-6 px-0" reverseStackOrder>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} padding={{ left: 20, right: 20 }} />
            <YAxis dataKey="value" reversed tick={true} />
            <Tooltip />
            <Legend />
            {props.chartData.map((s) => (
              <Line
                connectNulls={true}
                dataKey="value"
                data={s.data}
                name={s.name}
                stroke={s.stroke}
                strokeWidth={1}
                points={true}
                type="monotone" />
            ))}
          </LineChart>
        </ResponsiveContainer> */}



        <ResultsTable data={props.tableData} />

        <p className="pt-1 pb-6 px-1">
          The data on this page includes data from months {moment(props.earliestDate.substr(0, 10)).format("MMMM YYYY")} &rarr; {moment(props.latestDate.substr(0, 10)).format("MMMM YYYY")} inclusive.

        </p>
        {
          currentYear === props.year && (
            <p className="pt-1 pb-6 px-1">
              This is the current year so the values here may change.
            </p>
          )
        }
        <p className="pt-1 pb-6 px-1">
          This website was last updated <span title={moment(props.buildTimeDate).format('LLLL')}>{moment(props.buildTimeDate).fromNow()}</span>.
        </p>
      </main >

      <div className="justify-self-end">
        <Footer />
      </div>
    </div >
  );
}

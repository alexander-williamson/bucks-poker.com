import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import Head from 'next/head'
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { GetYearFiguresDataAsync } from "../../services/data";
import { OrderSuffix } from "../../services/helpers";
import { StatsCard } from "../../components/StatsCards";
import { getColour } from "../../services/colours";

export async function getStaticPaths() {
  const yearData = await GetYearFiguresDataAsync();
  const names = [...new Set(yearData.map((x) => x.Person))].sort();
  return {
    paths: names.map((name) => ({
      params: {
        name: `${name}`,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const yearData = await GetYearFiguresDataAsync();
  const arrYearPosition = yearData
    .filter((x) => x.Person === params.name)
    .map((x) => ({ year: parseInt(x.Yr), position: parseInt(x.SRank) }));

  const tournamentWinCount = arrYearPosition.filter(
    (x) => x.position === 1
  ).length;

  const winningStreakData = arrYearPosition
    .map((x) => (x.position === 1 ? 1 : 0))
    .reduce(
      function (res, n) {
        if (n) res[res.length - 1]++;
        else res.push(0);
        return res;
      },
      [0]
    );
  const winningStreak = Math.max(...winningStreakData);

  const firstYear = Math.min(...arrYearPosition.map((x) => x.year));
  const lastYear = Math.max(...arrYearPosition.map((x) => x.year));
  const yearsPossible = lastYear - firstYear;
  const mapped = [...Array(yearsPossible)].map((_, i) => i + firstYear);

  const yearsPlayedData = mapped
    .map((x) => arrYearPosition.find((y) => y.year === x))
    .reduce(
      function (res, n) {
        if (n) res[res.length - 1]++;
        else res.push(0);
        return res;
      },
      [0]
    );
  const yearsPlayedStreak = Math.max(...yearsPlayedData) + 1;

  return {
    props: {
      name: params.name,
      tournamentWinCount,
      winningStreak,
      years: arrYearPosition,
      yearsPlayedStreak,
    },
  };
}

export default function Name(props) {
  const title = props.name;
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`Bucks Poker Tournament results for ${props.year}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <Breadcrumbs parent="Players" parentLink="/players">
          {title}
        </Breadcrumbs>
        <Chart
          className="max-h-40 w-full"
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
                reverse: true,
                suggestedMax: 11,
                suggestedMin: 1,
                axis: "y",
                bounds: "data",
              },
            },
          }}
          data={{
            labels: props.years.map((x) => x.year),
            datasets: [
              {
                label: props.name,
                data: props.years.map((x) => x.position),
                yAxisID: "yAxis",
                tension: 0.3,
                backgroundColor: getColour(props.name, [props.name]),
                borderColor: getColour(props.name, [props.name]),
                pointRadius: 6,
              },
            ],
          }}
        />
        <div className="flex flex-row flex-wrap w-full items-center content-center">
          <StatsCard
            title={
              props.years.length === 1
                ? "tournament entered"
                : "tournaments entered"
            }
            value={props.years.length}
          />
          <StatsCard
            title={
              props.years.length === 1 ? "tournament won" : "tournaments won"
            }
            value={props.tournamentWinCount}
          />
          <StatsCard
            title="best tournament result"
            value={OrderSuffix(Math.min(...props.years.map((x) => x.position)))}
          />
          <StatsCard title="best winning streak" value={props.winningStreak} />
          <StatsCard
            title="years played streak"
            value={props.yearsPlayedStreak}
          />
        </div>
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

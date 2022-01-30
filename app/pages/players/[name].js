import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { GetYearFiguresDataAsync } from "../../services/data";
import { OrderSuffix } from "../../services/helpers";

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
  const years = yearData
    .filter((x) => x.Person === params.name)
    .map((x) => ({ year: x.Yr, position: x.SRank }));

  const tournamentWinCount = years.filter((x) => x.position === "1").length;
  return {
    props: {
      name: params.name,
      tournamentWinCount: tournamentWinCount,
      years: years,
    },
  };
}

export default function Name(props) {
  const title = props.name;
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
        <Breadcrumbs parent="Players" parentLink="/players" current={title} />
        <Chart
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
                backgroundColor: "black",
                borderColor: "silver",
                pointRadius: 6,
              },
            ],
          }}
        />
        <p className="pt-3">
          They have played {props.years.length}{" "}
          {props.years.length === 1 ? "tournament" : "tournaments"} and won{" "}
          {props.tournamentWinCount}.
        </p>
        <p className="pt-3">
          Their best ever tournament position was{" "}
          {OrderSuffix(Math.min(...props.years.map((x) => x.position)))}.
        </p>
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

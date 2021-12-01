import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import DataTable from "../../components/DataTable";
import { GetYearDataAsync } from "../../services/data";

async function getPlayerNames() {
  const stats = await GetYearDataAsync();
  const allNames = [...new Set(stats.map((x) => x.Person))].sort();
  const latestYear = Math.max(...stats.map((x) => parseInt(x.Yr)));

  const getLastYear = (playerName) =>
    Math.max(...stats.filter((x) => x.Person === playerName).map((x) => x.Yr));

  const getTotalChips = (playerName) => {
    const chipTotalsEachYear = stats
      .filter((x) => x.Person === playerName)
      .map((x) => parseInt(x.Chips));
    return chipTotalsEachYear.reduce((a, b) => a + b, 0);
  };

  const getTotalYearsPlayed = (playerName) => {
    const yearResults = stats.filter((x) => x.Person === playerName);
    return yearResults.length;
  };

  const activePlayers = stats
    .filter((x) => x.Yr === `${latestYear}`)
    .map((x) => x.Person)
    .map((name) => ({
      name,
      lastYearPlayed: getLastYear(name),
      totalChips: getTotalChips(name),
      yearsPlayed: getTotalYearsPlayed(name),
    }));

  const otherPlayers = allNames
    .filter((name) => activePlayers.map((x) => x.name).indexOf(name) < 0)
    .map((name) => ({
      name,
      lastYearPlayed: getLastYear(name),
      totalChips: getTotalChips(name),
      yearsPlayed: getTotalYearsPlayed(name),
    }));

  return { activePlayers, otherPlayers };
}

export async function getStaticProps({ params }) {
  const { activePlayers, otherPlayers } = await getPlayerNames();
  return {
    props: {
      activePlayers,
      otherPlayers,
    },
  };
}

export default function People(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <html lang="en-gb" />
        <title>Players</title>
        <meta name="description" content="The Bucks Poker Tournament Results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <div className="hero py-20 text-center">
          <h1 className="text-5xl font-bold font-sans pb-5">Players</h1>
        </div>
        <Breadcrumbs current="Players" />

        <h2 className="text-3xl font-bold font-sans pb-5">Current Players</h2>
        <p className="pb-5">
          Players that sat for at least one Game the Current Tournament.
        </p>
        <DataTable
          headers={["Player Name", "Years Played", "Total Lifetime Chips"]}
          rows={props.activePlayers.map((player) => ({
            "Player Name": player.name,
            "Years Played": player.yearsPlayed,
            "Total Lifetime Chips": player.totalChips,
          }))}
        />

        <h2 className="text-3xl font-bold font-sans pb-5">Previous Players</h2>
        <p className="pb-5">
          Players that have not played in the Current Tournament.
        </p>
        <DataTable
          headers={["Player Name", "Years Played", "Total Lifetime Chips"]}
          rows={props.otherPlayers.map((player) => ({
            "Player Name": player.name,
            "Years Played": player.yearsPlayed,
            "Total Lifetime Chips":
              player.totalChips > 0 ? player.totalChips : "(not recorded)",
          }))}
        />
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

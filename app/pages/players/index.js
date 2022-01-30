import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import DataTable from "../../components/DataTable";
import { GetYearFiguresDataAsync } from "../../services/data";
import { BronzeBadge, GoldBadge, SilverBadge } from "../../components/Badges";

async function getData() {
  const yearFiguresData = await GetYearFiguresDataAsync();
  const allNames = [...new Set(yearFiguresData.map((x) => x.Person))].sort();
  const latestYear = Math.max(...yearFiguresData.map((x) => parseInt(x.Yr)));

  const rank = (dataSet, name, scoreFunc = (x) => x.totalPoints) => {
    const result = dataSet
      .map((x) => {
        if (!x.totalPoints) throw new Error("x.totalPoints not provided");
        return {
          name: x.name,
          score: scoreFunc(x),
        };
      })
      .sort((a, b) => a.score - b.score)
      .reverse();

    return result.map((x) => x.name).indexOf(name);
  };

  const getLastYear = (playerName) => {
    return Math.max(
      ...yearFiguresData.filter((x) => x.Person === playerName).map((x) => x.Yr)
    );
  };

  const getTotalChips = (playerName) => {
    const chipTotalsEachYear = yearFiguresData
      .filter((x) => x.Person === playerName)
      .map((x) => parseInt(x.Chips));
    return chipTotalsEachYear.reduce((a, b) => a + b, 0);
  };

  const getTotalPoints = (playerName) => {
    const pointsTotalEachYear = yearFiguresData
      .filter((x) => x.Person === playerName)
      .map((x) => parseInt(x.Points));
    const result = pointsTotalEachYear.reduce((a, b) => a + b, 0);
    return result;
  };

  const getTotalYearsPlayed = (playerName) => {
    const yearResults = yearFiguresData.filter((x) => x.Person === playerName);
    return yearResults.length;
  };

  const activePlayers = yearFiguresData
    .filter((x) => x.Yr === `${latestYear}`)
    .map((x) => x.Person)
    .map((name) => ({
      name,
      lastYearPlayed: getLastYear(name),
      totalChips: getTotalChips(name),
      totalPoints: getTotalPoints(name),
      yearsPlayed: getTotalYearsPlayed(name),
    }));

  const otherPlayers = allNames
    .filter((name) => activePlayers.map((x) => x.name).indexOf(name) < 0)
    .map((name) => ({
      name,
      lastYearPlayed: getLastYear(name),
      totalChips: getTotalChips(name),
      totalPoints: getTotalPoints(name),
      yearsPlayed: getTotalYearsPlayed(name),
    }));

  const overallRanking = allNames
    .map((name) => ({
      name,
      lastYearPlayed: getLastYear(name),
      totalChips: getTotalChips(name),
      totalPoints: getTotalPoints(name),
      yearsPlayed: getTotalYearsPlayed(name),
    }))
    .map((x, i, arr) => ({
      ...x,
      position: rank(arr, x.name),
    }))
    .sort((a, b) => a.position - b.position)
    .map((data) => ({ ...data }));

  return { activePlayers, otherPlayers, overallRanking };
}

export async function getStaticProps({ params }) {
  const { activePlayers, otherPlayers, overallRanking } = await getData();
  return {
    props: {
      activePlayers,
      otherPlayers,
      overallRanking,
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
        <Breadcrumbs>Players</Breadcrumbs>

        <h2 className="text-3xl font-bold font-sans pb-5">Active Players</h2>
        <p className="pb-5">
          Players that sat for at least one Game in the Current Tournament.
        </p>
        <DataTable
          headers={[
            "Player Name",
            "Years Played",
            "Total Lifetime Points",
            "Total Lifetime Chips",
          ]}
          rows={props.activePlayers.map((player) => ({
            "Player Name": <a href={player.name}>{player.name}</a>,
            "Years Played": player.yearsPlayed,
            "Total Lifetime Points":
              player.totalPoints > 0 ? player.totalPoints : "(not recorded)",
            "Total Lifetime Chips":
              player.totalChips > 0 ? player.totalChips : "(not recorded)",
          }))}
        />

        <h2 className="text-3xl font-bold font-sans pb-5">Overall Ranking</h2>
        <p className="pb-5">
          The best of the best. Calculated using most points from all
          tournaments,
        </p>
        <DataTable
          headers={[
            "Player Name",
            "Years Played",
            "Total Lifetime Points",
            "Total Lifetime Chips",
          ]}
          rows={props.overallRanking.map((player) => ({
            "Player Name": <a href={player.name}>{player.name}</a>,
            "Years Played": player.yearsPlayed,
            "Total Lifetime Points":
              player.totalPoints > 0 ? player.totalPoints : "(not recorded)",
            "Total Lifetime Chips": (
              <>
                {player.totalChips > 0 ? player.totalChips : "(not recorded)"}
                {player.position === 0 && (
                  <GoldBadge title="1st Overall Points">1st</GoldBadge>
                )}
                {player.position === 1 && (
                  <SilverBadge title="2nd Overall Points">2nd</SilverBadge>
                )}
                {player.position === 2 && (
                  <BronzeBadge title="2nd Overall Points">3rd</BronzeBadge>
                )}
              </>
            ),
          }))}
        />
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

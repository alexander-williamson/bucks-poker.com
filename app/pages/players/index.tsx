import Head from "next/head";
import { BronzeBadge, GoldBadge, SilverBadge } from "../../components/Badges";
import Breadcrumbs from "../../components/Breadcrumbs";
import DataTable from "../../components/DataTable";
import Footer from "../../components/Footer";
import { GetYearFiguresDataAsync, FILENAME } from "../../repositories/YearFiguresRepository";
import path from "path";
import { Year } from "../../models/Year";
import { OverallPositionService } from "../../services/OverallPositionService";

export async function getStaticProps({ params }) {
  const yearData = await GetYearFiguresDataAsync(path.resolve(`data/${FILENAME}`));
  const service = new OverallPositionService(yearData);

  const { activePlayers, otherPlayers, overallRanking } = service.getData();
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
        <title>Players</title>
        <meta name="description" content="The Bucks Poker Tournament Results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <Breadcrumbs>Players</Breadcrumbs>

        <h2 className="text-3xl font-bold font-sans pb-5">Active Players</h2>
        <p className="pb-5">Players that sat for at least one Game in the Current Tournament.</p>
        <DataTable
          headers={["Player Name", "Years Played", "Total Lifetime Points", "Total Lifetime Chips"]}
          rows={props.activePlayers.map((player) => ({
            id: player.name,
            "Player Name": <a href={player.name}>{player.name}</a>,
            "Years Played": player.yearsPlayed,
            "Total Lifetime Points": player.totalPoints > 0 ? player.totalPoints : "(not recorded)",
            "Total Lifetime Chips": player.totalChips > 0 ? player.totalChips : "(not recorded)",
          }))}
        />

        <h2 className="text-3xl font-bold font-sans pb-5">Overall Ranking</h2>
        <p className="pb-5">The best of the best. Calculated using most points from all tournaments,</p>
        <DataTable
          headers={["Player Name", "Years Played", "Total Lifetime Points", "Total Lifetime Chips"]}
          rows={props.overallRanking.map((player) => ({
            id: player.name,
            "Player Name": <a href={player.name}>{player.name}</a>,
            "Years Played": player.yearsPlayed,
            "Total Lifetime Points": player.totalPoints > 0 ? player.totalPoints : "(not recorded)",
            "Total Lifetime Chips": (
              <>
                {player.totalChips > 0 ? player.totalChips : "(not recorded)"}
                {player.position === 0 && <GoldBadge title="1st Overall Points">1st</GoldBadge>}
                {player.position === 1 && <SilverBadge title="2nd Overall Points">2nd</SilverBadge>}
                {player.position === 2 && <BronzeBadge title="2nd Overall Points">3rd</BronzeBadge>}
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

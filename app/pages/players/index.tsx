import Head from "next/head";
import path from "path";
import { ReactElement } from "react";
import { BronzeBadge, GoldBadge, SilverBadge } from "../../components/Badges";
import Breadcrumbs from "../../components/Breadcrumbs";
import DataTable, { DataTableProps, HeaderDefinition } from "../../components/DataTable";
import Footer from "../../components/Footer";
import { FILENAME, GetYearFiguresDataAsync } from "../../repositories/YearFiguresRepository";
import { OverallPositionService } from "../../services/OverallPositionService";

export async function getStaticProps({ params }) {
  const yearData = await GetYearFiguresDataAsync(path.resolve(`data/${FILENAME}`));
  const service = new OverallPositionService(yearData);
  const { activePlayers, otherPlayers, overallRanking } = service.getData();
  return { props: { activePlayers, otherPlayers, overallRanking } };
}

type PlayerTableDataSchema = {
  id: string;
  name: string | ReactElement;
  yearsPlayed: number;
  totalLifetimePoints: number | string;
  totalLifetimeChips: number | string;
};

export default function People(props) {
  const headers: HeaderDefinition<PlayerTableDataSchema>[] = [
    { key: "id", label: "", hidden: true },
    { key: "name", label: "Name" },
    { key: "yearsPlayed", label: "Years" },
    { key: "totalLifetimePoints", label: "Total Lifetime Points" },
    { key: "totalLifetimeChips", label: "Total Lifetime Chips" },
  ];

  const activePlayerTableData: DataTableProps<PlayerTableDataSchema> = {
    headers,
    rows: props.activePlayers.map((player) => ({
      id: player.name,
      playerName: <a href={player.name}>{player.name}</a>,
      yearsPlayed: player.yearsPlayed,
      totalLifetimePoints: player.totalPoints > 0 ? player.totalPoints : "(not recorded)",
      totalLifetimeChips: player.totalChips > 0 ? player.totalChips : "(not recorded)",
    })),
  };

  const overallRankingTableData: DataTableProps<PlayerTableDataSchema> = {
    headers,
    rows: props.overallRanking.map((player) => ({
      id: player.name,
      playerName: <a href={player.name}>{player.name}</a>,
      yearsPlayed: player.yearsPlayed,
      totalLifetimePoints: player.totalPoints > 0 ? player.totalPoints : "(not recorded)",
      totalLifetimeChips: player.totalChips > 0 ? player.totalChips : "(not recorded)",
    })),
  };

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
        <DataTable tableData={activePlayerTableData} />

        <h2 className="text-3xl font-bold font-sans pb-5">Overall Ranking</h2>
        <p className="pb-5">The best of the best. Calculated using most points from all tournaments,</p>
        <DataTable tableData={overallRankingTableData} />
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

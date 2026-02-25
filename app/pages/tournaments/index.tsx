import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import { Badge } from "../../components/Badges";
import { FILENAME, GetYearFiguresDataAsync } from "../../repositories/YearFiguresRepository";
import path from "path";

async function getYears(): Promise<number[]> {
  const stats = await GetYearFiguresDataAsync(path.resolve(`data/${FILENAME}`));
  const years = [...new Set(stats.map((x) => x.Yr))];
  return years.reverse();
}

type GetStaticProps = { props: { years: number[] } };
export async function getStaticProps(): Promise<GetStaticProps> {
  const years = await getYears();
  return { props: { years } };
}

export default function Tournaments(props) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Tournaments</title>
        <meta name="description" content="The Bucks Poker Tournament Results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <Breadcrumbs>Tournaments</Breadcrumbs>
        <ul>
          {props.years.map((year) => {
            return (
              <li key={year}>
                <Link href={`/tournaments/${encodeURIComponent(year)}`} className="block p-3 hover:bg-gray-100 rounded-lg">
                  {year} Tournament{" "}
                  {year === `${currentYear}` ? (
                    <Badge className="bg-indigo-500 text-white" title="Current">
                      Current
                    </Badge>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

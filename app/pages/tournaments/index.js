import Head from 'next/head'
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import { GetYearFiguresDataAsync } from "../../services/data";
import { Badge } from "../../components/Badges";

async function getYears() {
  const stats = await GetYearFiguresDataAsync();
  const years = [...new Set(stats.map((x) => x.Yr))];
  return years.reverse();
}

export async function getStaticProps({ params }) {
  return {
    props: {
      years: await getYears(),
    },
  };
}

export default function Tournaments(props) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{`${props.years} Tournament Results`}</title>
        <meta name="description" content="The Bucks Poker Tournament Results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <Breadcrumbs>Tournaments</Breadcrumbs>
        <ul>
          {props.years.map((year) => {
            return (
              <li key={year}>
                <Link
                  href={`/tournaments/${encodeURIComponent(year)}`}
                  className="block p-3 hover:bg-gray-100 rounded-lg">
                  {year}{" "}Tournament{" "}
                  {year === `${currentYear}` ? (
                    <Badge className="bg-indigo-500 text-white">
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
    </div >
  );
}

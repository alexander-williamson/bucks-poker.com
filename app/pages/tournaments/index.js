import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import { GetYearDataAsync } from "../../services/data"

async function getYears() {
  const stats = await GetYearDataAsync();
  const years = [...new Set(stats.map((x) => x.Yr))];
  return years.reverse();
}

export async function getStaticProps({ params }) {
  return {
    props: {
      years: await getYears()
    },
  };
}

export default function Tournaments(props) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <html lang="en-gb" />
        <title>{props.years} Tournament Results</title>
        <meta name="description" content="The Bucks Poker Tournament Results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto p-8">
        <div className="hero py-20 text-center">
          <h1 className="text-5xl font-bold font-sans pb-5">2021 Tournament</h1>
        </div>

        <Breadcrumbs current="Tournaments" />

        <ul>
          {props.years.map((year) => {
            return (
              <li key={year}>
                <Link href={`/tournaments/${encodeURIComponent(year)}`}>
                  <a className="block p-3 hover:bg-gray-100 rounded-lg">
                    {year} Tournament {year === currentYear ? "(Current)" : ""}
                  </a>
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

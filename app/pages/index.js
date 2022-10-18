import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { GetYearFiguresDataAsync } from "../services/data";

export async function getStaticProps() {
  const yearFiguresData = await GetYearFiguresDataAsync();
  const latestYear = Math.max(...yearFiguresData.map((x) => parseInt(x.Yr)));
  return {
    props: {
      latestYear,
    },
  };
}

export default function Home({ latestYear }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <html lang="en-gb" />
        <title>Bucks Poker</title>
        <meta name="description" content="Bucks Poker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto">
        <div className="hero py-20 text-center mx-3">
          <h1 className="text-5xl font-bold font-sans pb-5">
            Welcome to <a href="https://bucks-poker.com">Bucks-poker.com</a>
          </h1>
          <p className="description text-xl">
            Monthly closed door sessions between a few blokes. Sometimes over
            Zoom.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mx-3">
          <div className="rounded-lg border p-8">
            <Link href={`/tournaments/${latestYear}`}>
              <a className="card ">
                <h2 className="pb-5 font-bold text-lg">
                  The latest Tournament &rarr;
                </h2>
                <p>Learn more about this years trophy</p>
              </a>
            </Link>
          </div>

          <div className="rounded-lg border p-8">
            <Link href="/players">
              <a className="card ">
                <h2 className="pb-5 font-bold text-lg">The Players &rarr;</h2>
                <p>Current and past players</p>
              </a>
            </Link>
          </div>

          <div className="rounded-lg border p-8">
            <Link href="/tournaments">
              <a className="card">
                <h2 className="pb-5 font-bold text-lg">
                  Historical Results &rarr;
                </h2>
                <p>Stats and results from past tournaments</p>
              </a>
            </Link>
          </div>

          <div className="rounded-lg border p-8">
            <Link href="/rules">
              <a className="card">
                <h2 className="pb-5 font-bold text-lg">Rule Book &rarr;</h2>
                <p>Read the Bucks Poker Rule Book and how the evenings work</p>
              </a>
            </Link>
          </div>

          <div className="rounded-lg border p-8">
            <Link href="/hands">
              <a className="card">
                <h2 className="pb-5 font-bold text-lg">Texas Holdem Hands &rarr;</h2>
                <p>The order of winning hands</p>
              </a>
            </Link>
          </div>
        </div>
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

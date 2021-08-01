import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main mb-10 container mx-auto flex-auto">
        <div className="hero py-20 text-center">
          <h1 className="text-5xl font-bold font-sans pb-5">
            Welcome to <a href="https://bucks-poker.com">Bucks-poker.com</a>
          </h1>
          <p className="description text-xl">
            Monthly closed door sessions between a few blokes. Sometimes over
            Zoom.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-lg border p-8">
            <Link href="/tournaments/2021">
              <a className="card ">
                <h2 className="pb-5 font-bold text-lg">
                  The 2021 Tournament &rarr;
                </h2>
                <p>Learn more about this years trophy</p>
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
            <Link href="/resources">
              <a className="card">
                <h2 className="pb-5 font-bold text-lg">Resources &rarr;</h2>
                <p>Documents like Texas Holdem Hands and other links</p>
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

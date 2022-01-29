import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { GetYearFiguresDataAsync } from "../../services/data";

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
  return {
    props: {
      name: params.name,
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
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

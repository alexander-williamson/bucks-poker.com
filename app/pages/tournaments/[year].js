import Head from "next/head";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import ResultsTable from "../../components/ResultsTable";
import moment from "moment";

const stats = require("../../data/stats.json");
const getYearData = (year) => {
  const data = stats
    .filter((x) => `${x.Yr}` === `${year}`)
    .sort((a, b) => {
      if (parseInt(a.SRank) < parseInt(b.SRank)) {
        return -1;
      }
      if (parseInt(a.SRank) > parseInt(b.SRank)) {
        return 1;
      }
      return 0;
    });
  return data;
};

const getYears = () => {
  const stats = require("../../data/stats.json");
  const years = [...new Set(stats.map((x) => x.Yr))];
  return years.reverse();
};

export async function getStaticPaths() {
  return {
    paths: getYears().map((year) => ({
      params: {
        year: `${year}`,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //  const router = useRouter();
  // z const { year } = router.query;
  const intYear = parseInt(params.year);
  return {
    props: {
      year: intYear,
      data: getYearData(intYear),
      buildTimeDate: process.env.BUILD_TIME,
    },
  };
}

export default function Year(props) {
  const currentYear = new Date().getFullYear();
  const title = `${props.year} Tournament ${props.year === currentYear ? "(Current)" : ""
    }`;
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
        <div className="hero py-20 text-center">
          <h1 className="text-5xl font-bold font-sans pb-5">{title}</h1>
        </div>

        <Breadcrumbs
          parent="Tournaments"
          parentLink="/tournaments"
          current={title}
        />

        {currentYear === props.year && (
          <p className="pt-3 pb-6 px-1">
            This is the current year so the values here may change.
          </p>
        )}

        <ResultsTable data={props.data} />

        <p className="pt-1 pb-6 px-1">
          Data last updated {moment(props.buildTimeDate).fromNow()}.
        </p>
      </main>

      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}

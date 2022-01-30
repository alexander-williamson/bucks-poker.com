import { GoldBadge, SilverBadge, BronzeBadge } from "./Badges";
import { OrderSuffix } from "../services/helpers";

export default function ResultsTable(props) {
  return (
    <section className="container overflow-x-auto rounded-lg mb-5">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left bg-zinc-50 text-zinc-500 uppercase">
            <th className="border-0 px-4 py-3 ">Name</th>
            <th className="border-0 px-4 py-3">Rank</th>
            <th className="border-0 px-4 py-3">Points</th>
            <th className="border-0 px-4 py-3">Chips</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {props.data.map((row) => (
            <tr className="text-gray-700 hover:bg-zinc-100" key={row.Person}>
              <td className="border-0 px-4 py-3 border">
                <a href={"/players/" + row.Person}>{row.Person}</a>
              </td>
              <td className="border-0 px-4 py-3 font-semibold border">
                {parseInt(row.SRank) > 3 && OrderSuffix(row.SRank)}
                {row.SRank === "1" && (
                  <GoldBadge title="1st Overall Points">1st</GoldBadge>
                )}
                {row.SRank === "2" && (
                  <SilverBadge title="2nd Overall Points">2nd</SilverBadge>
                )}
                {row.SRank === "3" && (
                  <BronzeBadge title="2nd Overall Points">3rd</BronzeBadge>
                )}{" "}
              </td>
              <td className="border-0 px-4 py-3 border">{row.Points}</td>
              <td className="border-0 px-4 py-3 text-sm border">{row.Chips}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

import { GoldBadge, SilverBadge, BronzeBadge, Badge } from "./Badges";
import { OrderSuffix } from "../services/helpers";
import joi from "joi";

export default function TournamentResultsTable(props) {
  const { error } = joi.object().required().validate(props);
  if (error) {
    throw error;
  }

  return (
    <section className="container overflow-x-auto rounded-lg mb-5">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left bg-zinc-50 text-zinc-500 uppercase">
            <th className="border-0 px-4 py-3">Player</th>
            <th className="border-0 px-4 py-3">Rank</th>
            <th className="border-0 px-4 py-3">Points</th>
            <th className="border-0 px-4 py-3">Chips</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {props.data.map((row) => (
            <tr className="text-gray-700 hover:bg-zinc-100" key={row.Person}>
              {/* <td>
                <button className="px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </td> */}
              <td className="border-0 px-4 py-3">
                <a href={"/players/" + row.Person}>{row.Person}</a>
              </td>
              <td className="border-0 px-4 py-3 font-semibold">
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
              <td className="border-0 px-4 py-3">
                {Number(row.Points) + Number(row.Bonus)}
                {row.Bonus !== "0" && (
                  <>
                    <Badge className="bg-gray-400 text-white px-2">
                      {row.Bonus}
                    </Badge>
                  </>
                )}
              </td>
              <td className="border-0 px-4 py-3 text-sm border">{row.Chips}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

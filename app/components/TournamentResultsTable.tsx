import joi from "joi";
import { ReactElement } from "react";
import { OrderSuffix } from "../services/DateHelpers";
import {
  Badge,
  BronzeBadge,
  ColourBadge,
  GoldBadge,
  SilverBadge,
} from "./Badges";
import { GetColourForName } from "../services/ColourHelpers";

export type Props = {
  names: string[];
  data: {
    colour: { hex: string };
    Person: string;
    SRank: string;
    Points: number;
    Bonus: string;
    Chips: string;
    isChecked: boolean;
  }[];
  onRowClick: (name: string) => void;
  onToggleAll: () => void;
  isAllChecked: boolean;
};

export default function TournamentResultsTable(props: Props): ReactElement {
  const { error } = joi.object().required().validate(props);
  if (error) {
    throw error;
  }

  return (
    <section className="container overflow-x-auto rounded-lg mb-5">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left bg-zinc-50 text-zinc-500 uppercase">
            <th className="border-0 px-4 py-3">
              <input
                type="checkbox"
                checked={props.isAllChecked}
                onChange={() => props.onToggleAll()}
              />
            </th>
            <th className="border-0 px-4 py-3">Player</th>
            <th className="border-0 px-4 py-3">Rank</th>
            <th className="border-0 px-4 py-3">Points</th>
            <th className="border-0 px-4 py-3">Chips</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {props.data.map((row) => (
            <tr
              className="text-gray-700 hover:bg-zinc-100"
              onClick={() => props.onRowClick(row.Person)}
              key={row.Person}
            >
              <td>
                <span className="px-2">
                  <ColourBadge
                    hex={GetColourForName(row.Person, props.names)}
                    title={row.Person}
                    isChecked={row.isChecked}
                  />
                </span>
              </td>
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
                )}
              </td>
              <td className="border-0 px-4 py-3">
                {Number(row.Points) + Number(row.Bonus)}
                {row.Bonus !== "0" && (
                  <>
                    <Badge
                      className="bg-gray-400 text-white px-2"
                      title="Bonus"
                    >
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

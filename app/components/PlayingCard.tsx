const joi = require("joi");
import { CARD_SUIT_DIGITS_REGEX } from "./Hands";

export function PlayingCard(data) {
  const getCardSuit = (original) => original[0];
  const getCardDigits = (original) => `${original}`.substring(1);
  const getColorStyleForSuit = (original) => {
    // console.debug({ original, match: original.match(/♣/) });
    if (original.match(/♠/g)) {
      return "text-black-500";
    }
    if (original.match(/♣/g)) {
      return "text-green-600";
    }
    if (original.match(/♦/)) {
      return "text-indigo-600";
    }
    return "text-red-500";
  };

  const { value, error } = joi
    .object({
      card: joi.string().regex(CARD_SUIT_DIGITS_REGEX).required(),
    })
    .unknown()
    .validate(data, { abortEarly: false });

  if (error) {
    console.error(JSON.stringify(error));
    throw error;
  }

  return (
    <div className="relative z-0 h-20 p-0 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
      <p
        className={
          "text-2xl ml-1 mt-0 opacity-60 text-left " +
          getColorStyleForSuit(getCardSuit(value.card))
        }
      >
        {getCardSuit(value.card)}
      </p>
      <div className="max-w-sm mt-4 absolute inset-0 flex justify-center items-center z-10">
        <span
          className={
            "text-4xl font-bold " +
            getColorStyleForSuit(getCardSuit(value.card))
          }
        >
          {getCardDigits(value.card)}
        </span>
      </div>
    </div>
  );
}

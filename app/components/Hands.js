const joi = require("joi");
const CARD_SUIT_DIGITS_REGEX = /([♠️♥️♦️♣️]{1,1})(10|[1-9|J|Q|K|A])/

const hands = [
  {
    id: 1,
    name: "Royal Flush",
    cards: ["♥️A", "♥️K", "♥️Q", "♥️J", "♥️10"]
  },
  {
    id: 2,
    name: "Straight Flush",
    cards: ["♥️6", "♥️7", "♥️8", "♥️9", "♥️10"]
  },
  {
    id: 3,
    name: "Four Of a Kind",
    cards: ["♥️A", "♣️A", "♦️A", "♠️A", "♥️K"]
  },
  {
    id: 4,
    name: "Four Of a Kind",
    cards: ["♥️A", "♣️A", "♦️A", "♠️K", "♥️K"]
  },
  {
    id: 5,
    name: "Flush",
    cards: ["♣️K", "♣️10", "♣️8", "♣️7", "♣️5"]
  },
  {
    id: 6,
    name: "Straight",
    cards: ["♥9", "♠8", "♣7", "♦6", "♣5"]
  },
  {
    id: 7,
    name: "Three-of-a-Kind",
    cards: ['♠7', '♦7', '♣7', '♦K', '♣Q']
  },
  {
    id: 8,
    name: "Two-Pair",
    cards: ['♣9', '♦9', '♣6', '♠6', '♥Q']
  },
  {
    id: 9,
    name: "One-Pair",
    cards: ['♦A', '♥A', '♠K', '♦9', '♥4']
  },
  {
    id: 10,
    name: "High Card",
    cards: ['♠A', '♦J', '♣8', '♠6', '♥2']
  }
]

export default function Hands() {
  return <div className="hands">
    <h2 className="text-4xl mb-10">Texas Holdem Hands</h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
      {
        hands.map((hand) => <>
          <div key={"hand" + hand.id} className="block mb-6 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h3 className="text-2xl mb-4"><span className="opacity-50">{hand.id}</span> {hand.name}</h3>
            <div className="columns-5">
              {hand.cards.map((card, index) => <PlayingCard key={index} card={card} />)}
            </div>
          </div>
        </>)
      }
    </div>
  </div>
}


const getCardSuit = (original) => original[0];
const getCardDigits = (original) => `${original}`.substring(1)
const getColorStyleForSuit = (original) => {
  console.debug({ original, match: original.match(/♣/) })
  if (original.match(/♠/g)) {
    return "text-black-500";
  }
  if (original.match(/♣/g)) {
    return "text-green-600"
  }
  if (original.match(/♦/)) {
    return "text-indigo-600"
  }
  return "text-red-500";
}

export function PlayingCard(data) {
  const { value, error } = joi.object({
    card: joi.string().regex(CARD_SUIT_DIGITS_REGEX).required()
  }).unknown().validate(data, { abortEarly: false })
  if (error) {
    console.error(JSON.stringify(error));
    throw error;
  }
  return (
    <div className="relative z-0 h-20 p-0 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <p className={"text-2xl ml-1 mt-0 opacity-60 text-left " + getColorStyleForSuit(getCardSuit(value.card))}>{getCardSuit(value.card)}</p>
      <div className="max-w-sm mt-4 absolute inset-0 flex justify-center items-center z-10">
        <span className={"text-4xl font-bold " + getColorStyleForSuit(getCardSuit(value.card))}>{getCardDigits(value.card)}</span>
      </div>
    </div>
  );
}
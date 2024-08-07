import { PlayingCard } from "./PlayingCard";

export const CARD_SUIT_DIGITS_REGEX = /([♠️♥️♦️♣️]{1,1})(10|[1-9|J|Q|K|A])/

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
    name: "Full House",
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
    <div className="grid grid-rows-5 grid-flow-col">{
      hands.map((hand) => <>
        <div key={"hand" + hand.id} className="block mb-6 p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
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





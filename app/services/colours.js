export function getColour(name) {
  const colours = {
    "Alex": "#7600D9",
    "Andy": "#B400D9",
    "Anthony": "#D900C0",
    "Bob": "#D90082",
    "Chris": "#D90044",
    "Crafty": "#D90006",
    "Illya": "#D93800",
    "Jim": "#D97600",
    "John": "#D9B400",
    "Jon": "#C0D900",
    "Jonathan": "#82D900",
    "Keith": "#44D900",
    "Maisy": "#06D900",
    "Mark": "#00D938",
    "Matt": "#00D976",
    "Matthew": "#00D9B4",
    "Pepe": "#00C0D9",
    "Prashant": "#0082D9",
    "Richard": "#0044D9",
    "Richard Snr": "#0006D9",
    "Stuart": "#3800D9",
  }
  const result = colours[name];
  if (!result) {
    throw new Error("Could not find colour for name " + name);
  }
  return result;
}
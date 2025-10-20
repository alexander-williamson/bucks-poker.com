import chroma from "chroma-js";

export function GetColourForName(name: string, names: string[]): string {
  const scale = chroma.scale(chroma.brewer.Set2).mode("hcl").colors(names.length);

  const mapped = names.map((element, index) => ({
    name: element,
    color: scale[index],
  }));

  const found = mapped.find((x) => x.name === name);
  if (!found) {
    throw new Error("Could not find colour for name " + name);
  }

  return found.color;
}

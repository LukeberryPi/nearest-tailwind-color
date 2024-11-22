export type TripleNumberTuple = [number, number, number];

export function hexToRGB(hex: string): TripleNumberTuple {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

export function RGBToHex(rgb: TripleNumberTuple): string {
  return "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function getDistanceBetweenColors(color1: TripleNumberTuple, color2: TripleNumberTuple) {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) + Math.pow(color1[1] - color2[1], 2) + Math.pow(color1[2] - color2[2], 2),
  );
}

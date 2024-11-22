import { Clipboard, closeMainWindow, LaunchProps, showToast, Toast } from "@raycast/api";
import { getDistanceBetweenColors, hexToRGB, RGBToHex } from "./utils";
import { tailwindColors } from "./tailwind-colors";

export default async function Command(props: LaunchProps<{ arguments: Arguments.GetNearestTailwindColorHexcode }>) {
  const { hexcode } = props.arguments;

  if (!hexcode || !/^#[0-9A-F]{6}$/i.test(hexcode)) {
    showToast({
      style: Toast.Style.Failure,
      title: "Invalid Hex Color",
      message: "Please enter a valid hex color (e.g., #fafafa)",
    });
    return;
  }

  const inputRGB = hexToRGB(hexcode);

  let nearestColor = { name: "", rgb: [0, 0, 0], hex: "" };
  let minDistance = Infinity;

  for (const [colorName, colorValue] of Object.entries(tailwindColors)) {
    const colorRGB = hexToRGB(colorValue);
    const distance = getDistanceBetweenColors(inputRGB, colorRGB);

    if (distance < minDistance) {
      minDistance = distance;
      nearestColor = { name: colorName, rgb: colorRGB, hex: RGBToHex(colorRGB) };
    }
  }

  await closeMainWindow();

  Clipboard.copy(nearestColor.hex);

  showToast({
    title: `Copied ${nearestColor.hex} to clipboard`,
  });
}

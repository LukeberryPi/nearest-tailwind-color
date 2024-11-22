import { Clipboard, closeMainWindow, LaunchProps, showToast, Toast } from "@raycast/api";
import { getDistanceBetweenColors, hexToRGB } from "./utils";
import { tailwindColors } from "./tailwind-colors";

export default async function Command(props: LaunchProps<{ arguments: Arguments.GetNearestTailwindColorName }>) {
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

  let nearestColor = { name: "", rgb: [0, 0, 0] };
  let minDistance = Infinity;

  for (const [colorName, colorValue] of Object.entries(tailwindColors)) {
    const colorRGB = hexToRGB(colorValue);
    const distance = getDistanceBetweenColors(inputRGB, colorRGB);

    if (distance < minDistance) {
      minDistance = distance;
      nearestColor = { name: colorName, rgb: colorRGB };
    }
  }

  await closeMainWindow();

  showToast({
    title: `Copied ${nearestColor.name} to clipboard`,
  });

  Clipboard.copy(nearestColor.name);
}

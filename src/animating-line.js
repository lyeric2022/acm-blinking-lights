import { LEDCanvas } from "christmas-client-js";
import { startDrawing } from "#lib/svg.js";

const url =
  "wss://blinktest.acmcsuf.com/ws/018c4c0e-7003-7407-b990-a5e9e415da22";
const fps = 25;

async function main() {
  const canvas = new LEDCanvas(url);
  await canvas.connect();

  let y = 0;
  await startDrawing(canvas, fps, (svg, width, height) => {
    // Move the line down by one pixel each frame.
    y = (y + 1) % (height);

    svg.rect(width, height).fill("white");
    svg.line(0, y, width, y).stroke({ width: 20, color: "red" });
    svg.line(0, (y + 10) % height, width, (y + 10) % height).stroke({ width: 18, color: "orange" });
    svg.line(0, (y + 20) % height, width, (y + 20) % height).stroke({ width: 18, color: "yellow" });
    svg.line(0, (y + 30) % height, width, (y + 30) % height).stroke({ width: 18, color: "green" });
    svg.line(0, (y + 40) % height, width, (y + 40) % height).stroke({ width: 18, color: "blue" });
    svg.line(0, (y + 50) % height, width, (y + 50) % height).stroke({ width: 23, color: "purple" });

  });
}

await main();

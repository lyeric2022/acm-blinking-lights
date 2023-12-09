import { LEDCanvas } from "christmas-client-js";
import { startDrawing } from "#lib/svg.js";

const url = "wss://blinktest.acmcsuf.com/ws/018c4c05-f55c-7fd8-ba3c-50a41721d237";
const fps = 25;
const numberOfLights = 50; // Change this value to increase/decrease the number of lights

async function main() {
  const canvas = new LEDCanvas(url);
  await canvas.connect();

  // Rave light parameters.
  const colorList = ["purple", "yellow", "red", "blue", "green", "purple", "orange", "pink"];
  const shapeList = ["line", "circle", "rectangle"]; // Different shapes to draw
  const maxSize = 20; // Maximum size of shapes
  const minSize = 5; // Minimum size of shapes

  let hueIndex = 0;
  let shapeIndex = 0;

  await startDrawing(canvas, fps, (svg, width, height) => {
    for (let i = 0; i < numberOfLights; i++) {
      // Generate random parameters for each shape
      const shape = shapeList[shapeIndex];
      const size = Math.random() * (maxSize - minSize) + minSize;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const color = colorList[hueIndex];

      // Draw the selected shape with random parameters
      if (shape === "line") {
        const endX = Math.random() * width;
        const endY = Math.random() * height;
        svg.line(x, y, endX, endY).stroke({ width: size, color });
      } else if (shape === "circle") {
        svg.circle(size).move(x - size / 2, y - size / 2).fill(color);
      } else if (shape === "rectangle") {
        const widthRect = Math.random() * (maxSize - minSize) + minSize;
        const heightRect = Math.random() * (maxSize - minSize) + minSize;
        svg.rect(widthRect, heightRect).move(x, y).fill(color);
      }

      // Update indexes for next iteration
      hueIndex = (hueIndex + 1) % colorList.length;
      shapeIndex = (shapeIndex + 1) % shapeList.length;
    }
  });
}

await main();

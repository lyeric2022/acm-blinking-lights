import { LEDCanvas } from "christmas-client-js";
import * as imagejs from "image-js";

const url = "wss://blinktest.acmcsuf.com/ws/018c4c05-f55c-7fd8-ba3c-50a41721d237";

const canvas = new LEDCanvas(url);
await canvas.connect();

const canvasInfo = await canvas.canvasInfo();
console.log(`Canvas is ${canvasInfo.width}x${canvasInfo.height}`);

const imagePath = "static/acm-image.png";
const image = await imagejs.Image.load(imagePath);
console.log(`Loaded ${imagePath} (${image.width}x${image.height})`);

canvas.draw(canvasInfo, image);
console.log(`Drew ${imagePath}!`);

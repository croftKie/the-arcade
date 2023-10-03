import { Game, Snake } from "./classes.js";

const snake = new Snake(10, 10, [
	{ x: 50, y: 50 },
	{ x: 40, y: 50 },
]);
const canvas = document.getElementById("game");
const g = new Game(
	canvas.getContext("2d"),
	10,
	10,
	250,
	snake,
	canvas.height,
	canvas.width,
);
g.food.genFood(g.snake, g.height, g.width);
g.main();

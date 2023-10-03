export class Game {
	constructor(ctx, x, y, frameLength, snake, height, width) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.frameLength = frameLength;
		this.snake = snake;
		this.board_border = "black";
		this.board_background = "white";
		this.height = height;
		this.width = width;
		this.food = new Food(10, 10);
		this.score = 0;
	}

	clearBoard() {
		this.ctx.fillStyle = this.board_background;
		this.ctx.strokestyle = this.board_border;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	drawSnake() {
		this.snake.secPos.forEach((part) => {
			this.snake.drawPart(this.ctx, part);
		});
	}

	main() {
		document.addEventListener("keydown", (event) => {
			this.snake.changeDirection(event);
		});

		this.food.drawFood(this.ctx, this.snake, this.height, this.width);
		setTimeout(() => {
			const leftBorder =
				this.snake.secPos[0].x >= this.width ||
				this.snake.secPos[0].x <= 0;
			const rightBorder =
				this.snake.secPos[0].y >= this.height ||
				this.snake.secPos[0].y < 0;
			if (leftBorder) {
				this.clearBoard();
				this.snake = new Snake(10, 10, [{ x: 50, y: 50 }]);
			}
			if (rightBorder) {
				this.clearBoard();
				this.snake = new Snake(10, 10, [{ x: 50, y: 50 }]);
			}

			this.clearBoard();
			this.drawSnake();
			const scoreCheck = this.snake.moveSnake(
				this.food,
				this.height,
				this.width,
				this.score,
			);
			if(scoreCheck){
				this.score += 10;
				document.getElementById("score").innerText = this.score;
			}
			this.main();
		}, this.frameLength);
	}
}

export class Snake {
	constructor(startingWidth, startingHeight, secPos) {
		this.startingWidth = startingWidth;
		this.startingHeight = startingHeight;
		this.secPos = secPos;
		this.snake_col = "lightblue";
		this.snake_border = "darkblue";
		this.dx = 10;
		this.dy = 0;
	}

	drawPart(ctx, part) {
		ctx.fillStyle = "lightblue";
		ctx.strokeStyle = "darkblue";
		ctx.fillRect(part.x, part.y, this.startingHeight, this.startingWidth);
		ctx.strokeRect(part.x, part.y, this.startingHeight, this.startingWidth);
	}
	moveSnake(food, height, width, score) {
		const new_head = {
			x: this.secPos[0].x + this.dx,
			y: this.secPos[0].y + this.dy,
		};
		this.secPos.unshift(new_head);
		const hasEaten =
			this.secPos[0].x === food.foodX && this.secPos[0].y === food.foodY;
		if (hasEaten) {
			food.genFood(this, height, width);
			return true;
		} else {
			this.secPos.pop();
			return false;
		}
	}
	changeDirection(event) {
		const goingUp = this.dy === -10;
		const goingDown = this.dy === 10;
		const goingRight = this.dx === 10;
		const goingLeft = this.dx === -10;

		if (event.keyCode === 37 && !goingRight) {
			this.dx = -10;
			this.dy = 0;
		}

		if (event.keyCode === 38 && !goingDown) {
			this.dx = 0;
			this.dy = -10;
		}

		if (event.keyCode === 39 && !goingLeft) {
			this.dx = 10;
			this.dy = 0;
		}

		if (event.keyCode === 40 && !goingUp) {
			this.dx = 0;
			this.dy = 10;
		}
	}
}

export class Food {
	constructor(height, width) {
		this.height = height;
		this.width = width;
		this.foodX = 0;
		this.foodY = 0;
	}

	#genFoodLocation(min, max) {
		return Math.round((Math.random() * (max - min) + min) / 10) * 10;
	}
	genFood(snake, boardHeight, boardWidth) {
		this.foodX = this.#genFoodLocation(0, boardWidth - 10);
		this.foodY = this.#genFoodLocation(0, boardHeight - 10);

		snake.secPos.forEach((pos) => {
			const hasEaten = pos.x === this.foodX && pos.y === this.foodY;
			if (hasEaten) {
				genFood();
			}
		});
	}
	drawFood(ctx, snake, boardHeight, boardWidth) {
		ctx.fillStyle = "lightgreen";
		ctx.strokeStyle = "darkgreen";
		ctx.fillRect(this.foodX, this.foodY, this.height, this.width);
		ctx.strokeRect(this.foodX, this.foodY, this.height, this.width);
	}
}

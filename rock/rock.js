const modal = document.querySelector(".modal");
const game = document.querySelector(".game");
const opponent = document.querySelector(".opponent");
const score_num = document.querySelector(".score-num");
const result = document.querySelector(".result");
const result_text = document.querySelector(".result>p");
const player_text = document.querySelector(".player-text");
const opp_text = document.querySelector(".opp-text");

// settings
const options = [
  {
    name: "rock",
    element: document.querySelector(".rock_one"),
  },
  {
    name: "paper",
    element: document.querySelector(".paper_one"),
  },
  {
    name: "scissor",
    element: document.querySelector(".scissor_one"),
  },
];

let score = localStorage.getItem("score") || 0;

score_num.innerText = score;

main();

function main() {
  const paper_one = document.querySelector(".paper_one");
  const scissor_one = document.querySelector(".scissor_one");
  const rock_one = document.querySelector(".rock_one");
  const rules = document.querySelector(".rules");

  rules.addEventListener("click", () => {
    if (modal.classList.contains("hidden")) {
      modal.classList.remove("hidden");
    } else {
      modal.classList.add("hidden");
    }
  });
  paper_one.addEventListener("click", () => {
    const player = options[1];
    const opponent = options[randomOppChoice()];

    modeOneAnim(player, () => {
      onComplete(player, opponent);
    });

    resetGame(player, opponent);
  });
  scissor_one.addEventListener("click", () => {
    const player = options[2];
    const opponent = options[randomOppChoice()];

    modeOneAnim(player, () => {
      onComplete(player, opponent);
    });

    resetGame(player, opponent);
  });
  rock_one.addEventListener("click", () => {
    const player = options[0];
    let opponent = options[randomOppChoice()];

    modeOneAnim(player, () => {
      onComplete(player, opponent);
    });

    resetGame(player, opponent);
  });
}

function resetGame(player, opponent) {
  const dupe = document.querySelector(".dupe");
  document.querySelector(".restart").addEventListener("click", () => {
    resetToOneAnim(player, opponent);
    gameModeOne();

    if (dupe) {
      dupe.remove();
    }
    gsap.to(".score-num", { y: 300, duration: 0.2 });
    result_text.innerText = updateScore(player, opponent);
    gsap.to(".score-num", { y: 0, duration: 0.2, delay: 0.5 });
  });
}

// Game Logic
function randomOppChoice() {
  return Math.round(Math.random() * 2);
}
function compare(player, opponent) {
  if (player === opponent) {
    return 1;
  }
  if (player === options[0] && opponent === options[2]) {
    return 2;
  }
  if (player === options[1] && opponent === options[0]) {
    return 2;
  }
  if (player === options[2] && opponent === options[1]) {
    return 2;
  }

  return 0;
}
function updateScore(player, opponent) {
  const result = compare(player, opponent);
  if (result === 1) {
    return "Draw";
  }
  if (result === 2) {
    score++;
    score_num.innerText = score;
    localStorage.setItem("score", score);
    return "You Win";
  }
  if (result === 0) {
    score--;
    score_num.innerText = score;
    localStorage.setItem("score", score);
    return "You Lose";
  }
}
function gameModeTwo(player, opponent) {
  player.element.classList.add("player");
  opponent.element.classList.remove("hidden");
  opponent.element.classList.add("opponent");
  game.classList.add("game_alt");
  result.classList.remove("hidden");
  player_text.classList.remove("hidden");
  opp_text.classList.remove("hidden");
}
function gameModeOne() {
  options.forEach((opts) => {
    opts.element.classList.remove("hidden");
    opts.element.classList.remove("player");
    opts.element.classList.remove("opponent");
  });
  game.classList.remove("game_alt");
  result.classList.add("hidden");
  player_text.classList.add("hidden");
  opp_text.classList.add("hidden");
}
function createDupe(player) {
  const op = document.createElement("div");
  op.classList.add("dupe");
  op.classList.add("outer");
  switch (player.name) {
    case options[0].name:
      op.classList.add("rock_one");
      break;
    case options[1].name:
      op.classList.add("paper_one");
      break;
    case options[2].name:
      op.classList.add("scissor_one");
      break;
    default:
      break;
  }
  op.classList.add("opponent");
  op.innerHTML = player.element.innerHTML;
  game.appendChild(op);
  return op;
}

function onComplete(player, opponent) {
  options.forEach((opts) => {
    if (opts.name !== player.name) {
      opts.element.classList.add("hidden");
    }
  });
  if (player.name === opponent.name) {
    gameModeTwo(player, { element: createDupe(player) });
  } else {
    gameModeTwo(player, opponent);
  }

  modeTwoAnim(player, opponent);
}

function modeOneAnim(player, onComplete) {
  const tl = gsap.timeline({ onComplete: onComplete });
  tl.to(`.${player.name}_one`, {
    scale: 1.2,
    duration: 0.5,
  });
  tl.to(`.${player.name}_one`, {
    scale: 0,
    duration: 0.25,
  });

  options.forEach((op) => {
    if (op.name !== player.name) {
      tl.to(`.${op.name}_one`, {
        scale: 1.2,
        duration: 0.5,
      });
      tl.to(`.${op.name}_one`, {
        scale: 0,
        duration: 0.25,
      });
    }
  });

  tl.to(".game", { scale: 0, duration: 0.5 });

  tl.play();
}

function modeTwoAnim(player, opponent) {
  const tl = gsap.timeline();
  tl.to(".game", { scale: 1, duration: 0.5 });

  tl.fromTo(
    `.${player.name}_one`,
    {
      scale: 0,
      x: -1000,
      duration: 0.5,
    },
    { scale: 1, x: 0, duration: 0.5 }
  );
  tl.fromTo(
    `.${opponent.name}_one`,
    {
      scale: 0,
      x: 1000,
      duration: 0.5,
    },
    { scale: 1, x: 0, duration: 0.5 }
  );

  tl.play();
}

function resetToOneAnim(player, opponent) {
  options.forEach((op) => {
    if (op.name !== player.name && op.name !== opponent.name) {
      gsap.to(`.${op.name}_one`, {
        scale: 1,
        duration: 0,
      });
    }
  });
}

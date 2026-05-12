const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

const pvpBtn = document.getElementById("pvpBtn");
const botBtn = document.getElementById("botBtn");
const levelSelect = document.getElementById("levelSelect");

let mode = "bot"; // default
let playerTurn = 1;
let player1Choice = null;

pvpBtn.onclick = () => {
  mode = "pvp";
  levelSelect.style.display = "none";
  result.textContent = "Player vs Player Mode";
};

botBtn.onclick = () => {
  mode = "bot";
  levelSelect.style.display = "inline-block";
  result.textContent = "Player vs Bot Mode";
};

optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src =
      "https://codingstella.com/wp-content/uploads/2024/01/download.png";
    result.textContent = "Wait...";

    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    setTimeout(() => {
      gameContainer.classList.remove("start");

      let imageSrc = e.target.querySelector("img").src;

      if (mode === "pvp") {
        handlePVP(index, imageSrc);
      } else {
        handleBotMode(index, imageSrc);
      }

    }, 2000);
  });
});

function handlePVP(index, imageSrc) {
  if (playerTurn === 1) {
    player1Choice = index;
    userResult.src = imageSrc;
    result.textContent = "Player 2 Turn";
    playerTurn = 2;
  } else {
    cpuResult.src = imageSrc;
    let userValue = ["R", "P", "S"][player1Choice];
    let cpuValue = ["R", "P", "S"][index];
    showResult(userValue, cpuValue);
    playerTurn = 1;
  }
}

function handleBotMode(index, imageSrc) {
  userResult.src = imageSrc;

  let userValue = ["R", "P", "S"][index];
  let cpuIndex = getBotChoice(index);
  let cpuImages = [
    "rock.png",
    "paper.png",
    "Scissors.png"
  ];

  cpuResult.src = cpuImages[cpuIndex];
  let cpuValue = ["R", "P", "S"][cpuIndex];

  showResult(userValue, cpuValue);
}

function getBotChoice(userIndex) {
  let level = levelSelect.value;
  let random = Math.floor(Math.random() * 3);

  let winningMove = {
    0: 1, // Rock -> Paper
    1: 2, // Paper -> Scissors
    2: 0  // Scissors -> Rock
  };

  if (level === "easy") {
    return random;
  }

  if (level === "medium") {
    return Math.random() < 0.6 ? winningMove[userIndex] : random;
  }

  if (level === "hard") {
    return Math.random() < 0.8 ? winningMove[userIndex] : random;
  }

  if (level === "impossible") {
    // 90% bot win, 10% user win
    return Math.random() < 0.9
      ? winningMove[userIndex]
      : random;
  }

  return random;
}

function showResult(userValue, cpuValue) {
  let outcomes = {
    RR: "Draw",
    RP: "Cpu",
    RS: "User",
    PP: "Draw",
    PR: "User",
    PS: "Cpu",
    SS: "Draw",
    SR: "Cpu",
    SP: "User"
  };

  let outComeValue = outcomes[userValue + cpuValue];

  result.textContent =
    userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
}

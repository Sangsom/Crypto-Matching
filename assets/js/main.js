
const grid = document.getElementById('grid');
let gameCards = [];
let cardsFlipped = [];
let cardsFound = [];
let clicks = 0;
let roundStart = false;
let rounds = 0;

let startTime = 0;
let endTime = 0;

const cryptocurrencies = [
  {
    name: "Bitcoin",
    id: "btc"
  },
  {
    name: "Ethereum",
    id: "eth"
  },
  {
    name: "Ripple",
    id: "xrp"
  },
  {
    name: "Bitcoin Cash",
    id: "bch"
  },
  {
    name: "Litecoin",
    id: "ltc"
  },
  {
    name: "NEO",
    id: "neo"
  },
  {
    name: "Cardano",
    id: "ada"
  },
  {
    name: "Stellar",
    id: "xlm"
  }
];

// Shuffle array
const shuffleArray = arr =>
  arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

// Reset everything
const clearGame = () => {
  gameCards = [];
  cardsFlipped = [];
  cardsFound = [];
  rounds = 0;
  clicks = 0;
}

// Reset round
const clearRound = () => {
  cardsFlipped = [];
  clicks = 0;
}

const loadNewGame = () => {
  const gameContainer = document.getElementById('game-container');
  const startBtn = document.getElementById('start-button');
  gameContainer.style.visibility = "visible";
  startBtn.style.display = "none";
  startGame();
}

// Reset the game grid and generate new cards
const startGame = () => {
  startTime = performance.now();

  clearGame();
  updateRounds();

  // Create grid array and shuffle it
  gameCards.push(...cryptocurrencies, ...cryptocurrencies);
  gameCards = shuffleArray(gameCards);

  // Clear the grid
  grid.innerHTML = "";

  for (let i = 0; i < gameCards.length; i++) {
    // Create variables
    const gridBox = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');
    const gridImg = document.createElement('img');

    // Add class
    gridBox.classList.add("grid-box");
    front.classList.add('front');
    back.classList.add('back');

    // Set gridbox numbering
    gridBox.setAttribute('id', i);

    // Set img attributes
    gridImg.setAttribute('src', `/assets/svg/${gameCards[i].id}.svg`);
    gridImg.setAttribute('alt', `${gameCards[i].name}`);
    gridImg.setAttribute('cID', gameCards[i].id);

    // Add event listeners to grid boxes
    gridBox.addEventListener('click', handleOpenCard);

    // Create html and append to #grid
    back.appendChild(gridImg);
    gridBox.appendChild(front);
    gridBox.appendChild(back);
    grid.appendChild(gridBox);

  }
}

const handleOpenCard = (e) => {
  // When new round starts set it to true
  clicks === 0 ? roundStart = true : null;

  console.log(rounds);

  if (roundStart) {
    // Allow to perform only 2 clicks per round
    if (clicks < 2) {
      const parentBox = e.target.parentNode;
      const box = parentBox.getAttribute('id');
      parentBox.classList.add('show');

      const back = parentBox.lastChild;
      const cID = back.lastChild.getAttribute('cID');

      const card = {
        id: cID,
        box: box
      }

      // add to cards flipped per round
      cardsFlipped.push(card);
      clicks++;
    }

    if (clicks == 2) {
      roundStart = false;
      rounds++;
      updateRounds();

      if (cardsFlipped[0].id === cardsFlipped[1].id) {
        cardsFound.push(...cardsFlipped);
        clearRound();
      } else {
        // Clear the deck and hide cards
        setTimeout(() => {
          cardsFlipped.forEach((el) => {
            document.getElementById(el.box).classList.remove('show');
            clearRound();
          })
        }, 1000)

      }
    }

    // Here the game is finished
    if (cardsFound.length === 16) {
      endTime = performance.now();
      console.log('Performance', gameTime(startTime, endTime));
      alert('Game completed');
    }
  }

}

const updateRounds = () => {
  //document.getElementById('rounds').innerText = rounds;
}

const gameTime = (startTime, endTime) => {
  return (endTime - startTime) / 1000;
}

document.addEventListener("DOMContentLoaded", () => {
  const restartBtn = document.getElementById('restart');
  restartBtn.addEventListener('click', startGame)
});
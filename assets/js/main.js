
const grid = document.getElementById('grid');
let gameCards = [];
let cardsFlipped = [];
let cardsFound = [];
let clicks = 0;

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
  clicks = 0;
}

// Reset round
const clearRound = () => {
  cardsFlipped = [];
  clicks = 0;
}

// Reset the game grid and generate new cards
const startGame = () => {
  clearGame();

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
  // Allow to perform only 2 clicks per round
  if (clicks < 2) {
    const parentBox = e.target.parentNode;
    parentBox.classList.add('show');

    const back = parentBox.lastChild;
    const cID = back.lastChild.getAttribute('cID');

    // add to cards flipped per round
    cardsFlipped.push(cID);
    clicks++;
  }

  if (clicks == 2) {
    if (cardsFlipped[0] === cardsFlipped[1]) {
      cardsFound.push(...cardsFlipped);
      clearRound();

      console.log(cardsFound);
    } else {
      console.log('Not equal');
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Start grid when document has loaded
  startGame();
});
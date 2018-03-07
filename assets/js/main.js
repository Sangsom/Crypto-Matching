
const grid = document.getElementById('grid');
let gameCards = [];

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


// Reset the game grid and generate new cards
const startGame = () => {
  // Create grid array and shuffle it
  gameCards = [];
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

    // Create html and append to #grid
    back.appendChild(gridImg);
    gridBox.appendChild(front);
    gridBox.appendChild(back);
    grid.appendChild(gridBox);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Start grid when document has loaded
  startGame();

  const gridBox = document.getElementsByClassName('grid-box');

  for (let box of gridBox) {
    box.addEventListener("click", (e) => {
      const parentBox = e.target.parentNode;

      parentBox.classList.add('show');
    })
  }

});
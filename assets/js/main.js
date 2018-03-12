
const grid = document.getElementById('grid');
const modal = document.querySelector('.modal');
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

  resetStarRating();
}

// Reset round
const clearRound = () => {
  cardsFlipped = [];
  clicks = 0;
}

const loadNewGame = () => {
  const gameContainer = document.getElementById('game-container');
  const startBtn = document.getElementById('start-button');
  const modal = document.querySelector('.modal');

  if (modal.classList.contains('is-active')) {
    modal.classList.remove('is-active');
  }

  gameContainer.style.visibility = "visible";

  gameContainer.classList.add('animated', 'rotateIn');

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

  if (roundStart) {
    // Allow to perform only 2 clicks per round
    if (clicks < 2) {
      const parentBox = e.target.parentNode;
      const box = parentBox.getAttribute('id');
      parentBox.classList.add('show');
      parentBox.classList.add('open');

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
        cardsFlipped.forEach((el) => {
          clearRound();
          document.getElementById(el.box).classList.remove('open');
        })
        cardsFound.push(...cardsFlipped);
        clearRound();
      } else {
        const openCards = document.getElementsByClassName('open');
        setTimeout(() => {
          openCards[0].children.item(1).children[0].classList.add('animated', 'wobble');
          openCards[1].children.item(1).children[0].classList.add('animated', 'wobble');
        }, 500);

        setTimeout(() => {
          openCards[0].children.item(1).children[0].classList.remove('animated', 'wobble');
          openCards[1].children.item(1).children[0].classList.remove('animated', 'wobble');

          cardsFlipped.forEach((el) => {
            clearRound();
            document.getElementById(el.box).classList.remove('show', 'open');
          })
        }, 1500)

      }
    }

    // Here the game is finished
    if (cardsFound.length === 16) {
      endGame();
    }
  }

}

const endGame = () => {
  modal.classList.add('is-active');
  endTime = performance.now();

  const time = document.getElementById('time');
  const moves = document.getElementById('moves');

  time.innerText = gameTime(startTime, endTime);
  moves.innerText = rounds;

  const stars = document.querySelectorAll('.stars-rating').item(1);
  setStars(stars);
}

const updateStars = () => {
  const stars = document.querySelector('.stars-rating');
  setStars(stars);
}

const setStars = (stars) => {
  const star = stars.children;

  if (rounds >= 18) {
    star.item(2).classList.remove('checked');
  }
  if (rounds >= 25) {
    star.item(1).classList.remove('checked');
  }
}

const resetStarRating = () => {
  const stars = document.querySelectorAll('.stars-rating');

  for (let i = 0; i < stars.length; i++) {
    for (let j = 0; j < stars[i].children.length; j++) {
      let star = stars[i].children;
      star.item(j).classList.add('checked');
    }
  }
}

const updateRounds = () => {
  const roundsEl = document.getElementById('rounds');
  roundsEl.innerText = rounds;
  updateStars();
}

const gameTime = (startTime, endTime) => {
  return parseFloat((endTime - startTime) / 1000).toFixed(2);
}

const closeModal = () => {
  modal.classList.remove('is-active');
}

document.addEventListener("DOMContentLoaded", () => {
  const restartBtn = document.getElementById('restart');
  restartBtn.addEventListener('click', startGame);
});

// Create keyboard events
window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "Enter":
      loadNewGame();
    default:
      return;
  }
})
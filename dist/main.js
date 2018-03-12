'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var grid = document.getElementById('grid');
var modal = document.querySelector('.modal');
var gameCards = [];
var cardsFlipped = [];
var cardsFound = [];
var clicks = 0;
var roundStart = false;
var rounds = 0;

var startTime = 0;
var endTime = 0;

var cryptocurrencies = [{
  name: "Bitcoin",
  id: "btc"
}, {
  name: "Ethereum",
  id: "eth"
}, {
  name: "Ripple",
  id: "xrp"
}, {
  name: "Bitcoin Cash",
  id: "bch"
}, {
  name: "Litecoin",
  id: "ltc"
}, {
  name: "NEO",
  id: "neo"
}, {
  name: "Cardano",
  id: "ada"
}, {
  name: "Stellar",
  id: "xlm"
}];

// Shuffle array
var shuffleArray = function shuffleArray(arr) {
  return arr.map(function (a) {
    return [Math.random(), a];
  }).sort(function (a, b) {
    return a[0] - b[0];
  }).map(function (a) {
    return a[1];
  });
};

// Reset everything
var clearGame = function clearGame() {
  gameCards = [];
  cardsFlipped = [];
  cardsFound = [];
  rounds = 0;
  clicks = 0;

  resetStarRating();
};

// Reset round
var clearRound = function clearRound() {
  cardsFlipped = [];
  clicks = 0;
};

var loadNewGame = function loadNewGame() {
  var gameContainer = document.getElementById('game-container');
  var startBtn = document.getElementById('start-button');
  var modal = document.querySelector('.modal');

  if (modal.classList.contains('is-active')) {
    modal.classList.remove('is-active');
  }

  gameContainer.style.visibility = "visible";

  gameContainer.classList.add('animated', 'rotateIn');

  startBtn.style.display = "none";
  startGame();
};

// Reset the game grid and generate new cards
var startGame = function startGame() {
  var _gameCards;

  startTime = performance.now();

  clearGame();
  updateRounds();

  // Create grid array and shuffle it
  (_gameCards = gameCards).push.apply(_gameCards, cryptocurrencies.concat(cryptocurrencies));
  gameCards = shuffleArray(gameCards);

  // Clear the grid
  grid.innerHTML = "";

  for (var i = 0; i < gameCards.length; i++) {
    // Create variables
    var gridBox = document.createElement('div');
    var front = document.createElement('div');
    var back = document.createElement('div');
    var gridImg = document.createElement('img');

    // Add class
    gridBox.classList.add("grid-box");
    front.classList.add('front');
    back.classList.add('back');

    // Set gridbox numbering
    gridBox.setAttribute('id', i);

    // Set img attributes
    gridImg.setAttribute('src', './assets/svg/' + gameCards[i].id + '.svg');
    gridImg.setAttribute('alt', '' + gameCards[i].name);
    gridImg.setAttribute('cID', gameCards[i].id);

    // Add event listeners to grid boxes
    gridBox.addEventListener('click', handleOpenCard);

    // Create html and append to #grid
    back.appendChild(gridImg);
    gridBox.appendChild(front);
    gridBox.appendChild(back);
    grid.appendChild(gridBox);
  }
};

var handleOpenCard = function handleOpenCard(e) {
  // When new round starts set it to true
  clicks === 0 ? roundStart = true : null;

  if (roundStart) {
    // Allow to perform only 2 clicks per round
    if (clicks < 2) {
      var parentBox = e.target.parentNode;
      var box = parentBox.getAttribute('id');
      parentBox.classList.add('show');
      parentBox.classList.add('open');

      var back = parentBox.lastChild;
      var cID = back.lastChild.getAttribute('cID');

      var card = {
        id: cID,
        box: box

        // add to cards flipped per round
      };cardsFlipped.push(card);
      clicks++;
    }

    if (clicks == 2) {
      roundStart = false;
      rounds++;
      updateRounds();

      if (cardsFlipped[0].id === cardsFlipped[1].id) {
        var _cardsFound;

        cardsFlipped.forEach(function (el) {
          clearRound();
          document.getElementById(el.box).classList.remove('open');
        });
        (_cardsFound = cardsFound).push.apply(_cardsFound, _toConsumableArray(cardsFlipped));
        clearRound();
      } else {
        var openCards = document.getElementsByClassName('open');
        setTimeout(function () {
          openCards[0].children.item(1).children[0].classList.add('animated', 'wobble');
          openCards[1].children.item(1).children[0].classList.add('animated', 'wobble');
        }, 500);

        setTimeout(function () {
          openCards[0].children.item(1).children[0].classList.remove('animated', 'wobble');
          openCards[1].children.item(1).children[0].classList.remove('animated', 'wobble');

          cardsFlipped.forEach(function (el) {
            clearRound();
            document.getElementById(el.box).classList.remove('show', 'open');
          });
        }, 1500);
      }
    }

    // Here the game is finished
    if (cardsFound.length === 16) {
      endGame();
    }
  }
};

var endGame = function endGame() {
  modal.classList.add('is-active');
  endTime = performance.now();

  var time = document.getElementById('time');
  var moves = document.getElementById('moves');

  time.innerText = gameTime(startTime, endTime);
  moves.innerText = rounds;

  var stars = document.querySelectorAll('.stars-rating').item(1);
  setStars(stars);
};

var updateStars = function updateStars() {
  var stars = document.querySelector('.stars-rating');
  setStars(stars);
};

var setStars = function setStars(stars) {
  var star = stars.children;

  if (rounds >= 18) {
    star.item(2).classList.remove('checked');
  }
  if (rounds >= 25) {
    star.item(1).classList.remove('checked');
  }
};

var resetStarRating = function resetStarRating() {
  var stars = document.querySelectorAll('.stars-rating');

  for (var i = 0; i < stars.length; i++) {
    for (var j = 0; j < stars[i].children.length; j++) {
      var star = stars[i].children;
      star.item(j).classList.add('checked');
    }
  }
};

var updateRounds = function updateRounds() {
  var roundsEl = document.getElementById('rounds');
  roundsEl.innerText = rounds;
  updateStars();
};

var gameTime = function gameTime(startTime, endTime) {
  return parseFloat((endTime - startTime) / 1000).toFixed(2);
};

var closeModal = function closeModal() {
  modal.classList.remove('is-active');
};

document.addEventListener("DOMContentLoaded", function () {
  var restartBtn = document.getElementById('restart');
  restartBtn.addEventListener('click', startGame);
});

// Create keyboard events
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "Enter":
      loadNewGame();
    default:
      return;
  }
});
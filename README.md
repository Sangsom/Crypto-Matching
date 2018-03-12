# Cryptomatching game
This is game is created for a Front-End Developer Nanodegree project at Udacity.
In this game you must find 8 pairs of cryptocurrency cards which are hidden in a 16 card grid. 
Try it online on [Github Pages](https://sangsom.github.io/Crypto-Matching/).

## Game Features
- Randomly generated grid every time the game is started.
- Round counter - In how many rounds player have found all cards.
- Star rating - Showing how many stars player have when finishing game and during the game.
- Game time - When game is finished play can see time in seconds it required to finish the game.
- Restart game - Game grid is generated randomly and player starts the game again.

## Usage for developers
To start using this project follow these steps:
1. Git clone [respository](https://github.com/Sangsom/Crypto-Matching.git).
2. Open the code directory `cd Crypto-Matching`
3. Install dependencies `npm install`
4. Run gulp server `gulp watch`

Now you can access and use application [http://localhost:3000/](http://localhost:3000/)

## How to play
To start playing player need to press Start button or "Enter" keyboard button.
Afterwards player must find matching cryptocurrency cards. Per round player can open only 2 cards. If the cards match they stay revealed on the deck, if not then the last 2 opened cards are hidden again. Game is completed when all the cards are found.

## For developers
### Code dependencies:
- animate.css - Used for adding animations
- browser-sync - Used for syncing the browser when saving changes in code.
- bulma - CSS Framework used in project.
- gulp-sass and gulp - Gulp used to convert SASS to CSS and browser syncing with code.

# License
MIT License

Copyright (c) 2018 Rinalds Pudulis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

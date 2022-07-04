'use strict()';

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//default state
function init() {
  score0.textContent = 0;
  score1.textContent = 0;
  diceEl.classList.add('hidden');
  current0.textContent = 0;
  current1.textContent = 0;
  actPlayer = 0;
  currentScore = 0;
  diceValue = 0;
  totalscore = [0, 0];
  playing = true;
}
init();

//new game button
const newGame = function () {
  player1.classList.remove('player--active', 'player--winner');
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');

  init();
};

btnNew.addEventListener('click', newGame);
const addValue = function (actPlayer) {
  if (diceValue !== 1) {
    currentScore += diceValue;
    document.querySelector(`#current--${actPlayer}`).textContent = currentScore;
  }
};

const nextPlayer = function () {
  document.querySelector(`#current--${actPlayer}`).textContent = 0;
  actPlayer = actPlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Roll button
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceValue = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceValue}.png`;

    if (diceValue !== 1) {
      addValue(actPlayer);
    } else nextPlayer();
  }
});

//Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    totalscore[actPlayer] += currentScore;
    document.querySelector(`#score--${actPlayer}`).textContent =
      totalscore[actPlayer];
    if (totalscore[actPlayer] < 15) nextPlayer();
    else {
      document
        .querySelector(`.player--${actPlayer}`)
        .classList.toggle('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    }
  }
});

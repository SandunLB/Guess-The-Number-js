'use strict';

let secretNumber;
let maxNumber = 20;
let score;
let highscore = 0;
let timer;
let timeLeft = 60;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayTime = function (time) {
  document.querySelector('.time').textContent = time;
};

const setSecretNumber = function() {
  secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
};

const setDifficulty = function() {
  const difficulty = document.querySelector('#difficulty').value;
  maxNumber = Number(difficulty);
  resetGame();
};

document.querySelector('#difficulty').addEventListener('change', setDifficulty);

const startTimer = function() {
  timeLeft = 60;
  displayTime(timeLeft);
  clearInterval(timer);
  timer = setInterval(function() {
    if (timeLeft > 0) {
      timeLeft--;
      displayTime(timeLeft);
    } else {
      clearInterval(timer);
      displayMessage('⏰ Time\'s up! You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }, 1000);
};

const resetGame = function() {
  score = maxNumber === 20 ? 20 : maxNumber === 50 ? 50 : 100;
  setSecretNumber();
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  clearInterval(timer);
  startTimer();
};

resetGame();

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('⛔️ No number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    clearInterval(timer);

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
      clearInterval(timer);
    }
  }
});

document.querySelector('.again').addEventListener('click', resetGame);

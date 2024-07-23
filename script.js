'use strict';

let secretNumber;
let maxNumber = 20;
let score;
let highscore = 0;
let timer;
let timeLeft = 60;

// Display messages
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Display time left
const displayTime = function (time) {
  document.querySelector('.timer').textContent = `⏱️ Time: ${time}s`;
};

// Set the secret number based on maxNumber
const setSecretNumber = function () {
  secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
};

// Update the displayed maximum number
const updateMaxNumberDisplay = function () {
  document.querySelector('#max-number').textContent = maxNumber;
};

// Adjust difficulty settings
const setDifficulty = function () {
  const difficulty = document.querySelector('#difficulty').value;
  maxNumber = Number(difficulty);
  updateMaxNumberDisplay();  // Update the max number display
  resetGame();
};

document.querySelector('#difficulty').addEventListener('change', setDifficulty);

// Start the timer
const startTimer = function () {
  timeLeft = 60;
  displayTime(timeLeft);
  clearInterval(timer);
  timer = setInterval(function () {
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

// Reset the game
const resetGame = function () {
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

// Handle check button click
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');

  // When player wins
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

  // When guess is wrong
  } else {
    const difference = Math.abs(guess - secretNumber);
    let hint;

    if (difference <= maxNumber / 20) {
      hint = '🔥 Extremely Close!';
    } else if (difference <= maxNumber / 10) {
      hint = '🌡️ Very Close!';
    } else if (difference <= maxNumber / 5) {
      hint = '🟠 Close!';
    } else if (difference <= maxNumber / 2) {
      hint = '🟡 Far!';
    } else {
      hint = '🟢 Very Far!';
    }

    if (score > 1) {
      displayMessage(hint);
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
      clearInterval(timer);
    }
  }
});

// Handle again button click
document.querySelector('.again').addEventListener('click', resetGame);

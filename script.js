'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let timer;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const startTimer = function () {
  const startTime = Date.now();
  const countdown = function () {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.querySelector('.timer').textContent = `⏱️ Time: ${elapsedTime}s`;
  };
  timer = setInterval(countdown, 1000);
};

const stopTimer = function () {
  clearInterval(timer);
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    displayMessage('⛔️ No number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    stopTimer();
  } else if (guess !== secretNumber) {
    if (score > 1) {
      const difference = Math.abs(guess - secretNumber);
      if (difference <= 2) {
        displayMessage('🔥 Very Close!');
      } else if (difference <= 4) {
        displayMessage(guess > secretNumber ? '📉 Slightly too high!' : '📈 Slightly too low!');
      } else if (difference <= 6) {
        displayMessage(guess > secretNumber ? '📉 A bit too high!' : '📈 A bit too low!');
      } else {
        displayMessage(guess > secretNumber ? '📉 Too high!' : '📈 Too low!');
      }
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
      stopTimer();
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  stopTimer();
  startTimer();
});

document.querySelector('.difficulty').addEventListener('change', function () {
  const difficulty = document.querySelector('.difficulty').value;
  if (difficulty === 'easy') {
    secretNumber = Math.trunc(Math.random() * 10) + 1;
  } else if (difficulty === 'medium') {
    secretNumber = Math.trunc(Math.random() * 50) + 1;
  } else if (difficulty === 'hard') {
    secretNumber = Math.trunc(Math.random() * 100) + 1;
  }
  displayMessage('Difficulty changed, start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  stopTimer();
  startTimer();
});

startTimer();

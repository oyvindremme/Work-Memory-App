"use strict";

var greetings = ["Hello", "Cheerio", "Sup", "Yo", "Bonjour", "Hola", "Konichiwa"];
var level = document.getElementById("level");
var currentLevel = 0;
var textsContainer = document.getElementById('texts');
var numberContainer = document.getElementById('numbers');
var buttonContainer = document.getElementById('buttons');
var appNumbers = document.getElementsByClassName('application__number-container__number');
var countdown = document.getElementById('countbar');
var numbers = [];
var userGuesses = [];
var rights = 0;
var wrongs = 0;
var boxesToGenerate = 2;
var countdownAmount = 5;
var appNumbersModulus = appNumbers.length % 3;
var app = {
  init: function init() {
    currentLevel = 0;
    numbers = [];
    userGuesses = [];
    rights = 0;
    wrongs = 0;
    boxesToGenerate = 2;
    countdownAmount = 5;
    textsContainer.innerHTML = "";
    numberContainer.innerHTML = "\n            <div class=\"col-md-12 text-center\">\n                <h1>".concat(greetings[Math.floor(Math.random() * greetings.length)], "!</h1>\n                <p class=\"lead\">Press start button to begin.</p>\n                <button class=\"btn btn-block btn-lg btn-primary\" onclick=\"app.showNumbers()\">Start</button>\n            </div>\n        ");
    buttonContainer.innerHTML = "";
  },
  showNumbers: function showNumbers() {
    boxesToGenerate++;
    numbers = [];
    userGuesses = [];
    currentLevel++;
    level.style.display = "block";
    level.innerHTML = "Level ".concat(currentLevel);
    textsContainer.innerHTML = "";
    numberContainer.innerHTML = "";
    buttonContainer.innerHTML = "";

    while (numbers.length < boxesToGenerate) {
      numbers.push(Math.floor(Math.random() * 10));
    }

    numbers.forEach(function (number) {
      numberContainer.innerHTML += "\n                <div class=\"application__number-container\">\n                    <input type=\"text\" class=\"application__number-container__number\" value=\"".concat(number, "\" maxlength=\"1\" readonly>\n                </div>\n            ");
    });
    setTimeout(function () {
      app.setupGuessFields();
    }, 2000);
  },
  setupGuessFields: function setupGuessFields() {
    textsContainer.innerHTML = "";
    numberContainer.innerHTML = "";
    numbers.forEach(function () {
      numberContainer.innerHTML += "\n                <div class=\"application__number-container\">\n                    <input type=\"number\" class=\"application__number-container__number\" inputMode=\"numeric\" pattern=\"[0-9]*\">\n                </div>\n            ";
    });
    appNumbers[0].addEventListener("focus", function () {
      app.guessNumber();
    });

    if (!(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))) {
      appNumbers[0].focus();
    }
  },
  guessNumber: function guessNumber() {
    var _loop = function _loop(i) {
      appNumbers[i].addEventListener("keyup", function () {
        if (i + 1 == appNumbers.length) {
          gatherResult();
        } else {
          appNumbers[i + 1].scrollIntoView();
          appNumbers[i + 1].focus();
        }
      });
    };

    for (var i = 0; i < numbers.length; i++) {
      _loop(i);
    }

    countdown.classList.add("counting");
    /*
    * Every third game on and after level 5 gets +2 seconds of countdown.
    * For example: Level 5 gets 7 seconds, level 8 gets 9 seconds and so forth.
    */

    if (appNumbers.length >= 6 && appNumbersModulus === 0) {
      countdownAmount += 2;
    }

    document.querySelector('.counting').style.animationDuration = countdownAmount + "s";
    var timer = setTimeout(function () {
      gatherResult();
    }, countdownAmount * 1000);

    function gatherResult() {
      clearTimeout(timer);

      for (var i = 0; i < numbers.length; i++) {
        if (appNumbers[i].value === "" || appNumbers[i].value === " " || appNumbers[i].value.length > 1) {
          userGuesses.push('?');
        } else {
          userGuesses.push(parseInt(appNumbers[i].value));
        }
      }

      app.getScore();
    }
  },
  getScore: function getScore() {
    level.style.display = "none";
    countdown.classList.remove("counting");
    numberContainer.innerHTML = "";

    for (var i = 0; i < userGuesses.length; i++) {
      if (numbers[i] === userGuesses[i]) {
        rights++;
        numberContainer.innerHTML += "\n                    <div class=\"application__number-container\">\n                        <input id=\"inp".concat(i + 1, "\" type=\"text\" class=\"application__number-container__number border-primary text-primary\" value=\"").concat(userGuesses[i], "\" maxlength=\"1\" readonly>\n                    </div>\n                ");
      } else {
        wrongs++;
        numberContainer.innerHTML += "\n                    <div class=\"application__number-container\">\n                        <input id=\"inp".concat(i + 1, "\" type=\"text\" class=\"application__number-container__number application__number-container__number--wrong-answer border-danger text-danger\" value=\"").concat(userGuesses[i], "\" maxlength=\"1\" readonly>\n                        <span class=\"text-primary correct-number\">").concat(numbers[i], "</span>\n                    </div>\n                ");
      }
    }

    if (wrongs >= 1) {
      textsContainer.innerHTML = "\n                <div class=\"col-md-12 text-center\">\n                    <h1>Oops!</h1>\n                    <p class=\"lead\">You made it to level ".concat(currentLevel, ".</p>\n                </div>\n            ");
      buttonContainer.innerHTML = "\n                <div class=\"col-md-12 text-center\">\n                    <button class=\"btn btn-block btn-lg btn-primary\" onclick=\"app.init()\">Back to menu</button>\n                </div>\n            ";
    } else {
      textsContainer.innerHTML = "\n                <div class=\"col-md-12 text-center\">\n                    <h1>You did it!</h1>\n                    <p class=\"lead\">Try out level ".concat(currentLevel + 1, "!</p>\n                </div>\n            ");
      buttonContainer.innerHTML = "\n                <div class=\"col-6\">\n                \n                </div>\n                <div class=\"col-md-12 text-center\">\n                    <button class=\"btn btn-block btn-lg btn-primary\" onclick=\"app.showNumbers()\">Level ".concat(currentLevel + 1, "</button>\n                    <button class=\"btn btn-block btn-lg btn-outline-primary\" onclick=\"app.init()\">Stop playing</button>\n                </div>\n            ");
    }
  }
};
app.init();
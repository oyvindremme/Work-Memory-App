let greetings = ["Hello", "Cheerio", "Sup", "Yo", "Bonjour", "Hola"];

const level = document.getElementById("level");
let currentLevel = 0;

const textsContainer = document.getElementById('texts');
const numberContainer = document.getElementById('numbers');
const buttonContainer = document.getElementById('buttons');
const appNumbers = document.getElementsByClassName('application__number');

const countdown = document.getElementById('countbar');

let numbers = [];
let userGuesses = [];

let rights = 0;
let wrongs = 0;

let boxesToGenerate = 2;

let countdownAmount = 5;

const functions = {
    init: () => {
        currentLevel = 0;

        numbers = [];
        guesses = [];

        rights = 0;
        wrongs = 0;

        boxesToGenerate = 2;

        countdownAmount = 5;

        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = `
            <div class="col-md-12 text-center">
                <h1>${greetings[Math.floor(Math.random() * greetings.length)]}!</h1>
                <p class="lead">Press start button to begin.</p>
                <button class="btn btn-lg btn-primary" onclick="functions.showNumbers()">Start</button>
            </div>
        `;
        buttonContainer.innerHTML = ``;
    },
    showNumbers: () => {
        boxesToGenerate++;
        numbers = [];
        guesses = [];

        currentLevel++;
        level.style.display = "block";
        level.style.top = "0";
        level.innerHTML = `Level ${currentLevel}`;

        countdown.style.top = "-20px";

        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = ``;
        buttonContainer.innerHTML = ``;
        while (numbers.length < boxesToGenerate) {
            numbers.push(Math.floor(Math.random() * 10));
        }
        numbers.forEach(number => {
            numberContainer.innerHTML += `
                <div class="col-2 mb-3">
                    <input type="text" class="application__number" value="${number}" maxlength="1" readonly>
                </div>
            `;
        });
        setTimeout(function() {
            functions.setupGuessFields();
        }, 2000);
    },
    // Change this, PLEASE
    setupGuessFields: () => {
        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = ``;
        numbers.forEach(() => {
            numberContainer.innerHTML += `
                <div class="col-2 mb-3">
                    <input type="number" class="application__number" inputMode="numeric" pattern="[0-9]*">
                </div>
            `;
        });
        appNumbers[0].addEventListener("focus", () => {
            functions.guessNumber();
        });
        if (!(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))) {
            appNumbers[0].focus();
        }
    },
    guessNumber: () => {
        level.style.top = "40px";
        countdown.style.top = "0";
        for (let i = 0; i < numbers.length; i++) {
            appNumbers[i].addEventListener("keyup", () => {
                if (i+1 == appNumbers.length) {
                    gatherResult(); 
                } else {
                    setTimeout(() => {
                        appNumbers[i+1].focus();
                    }, 0);
                }
            });
        }
        countdown.classList.add("counting");
        let appNumbersModulus = appNumbers.length % 3;
        /*
        * Every third game on and after level 5 gets plus two seconds of countdown.
        * For example: Level 5 gets 7 seconds, level 8 gets 9 seconds and so forth.
        */
        if (appNumbers.length >= 6 && appNumbersModulus === 0) {
            countdownAmount += 2;
        }
        document.querySelector('.counting').style.animationDuration = countdownAmount + "s";
        let timer = setTimeout(() => {
            gatherResult();
        }, countdownAmount * 1000);
        function gatherResult() {
            clearTimeout(timer);
            for (let i = 0; i < numbers.length; i++) {
                if (appNumbers[i].value === "" || appNumbers[i].value === " ") {
                    guesses.push('?');
                } else {
                    guesses.push(parseInt(appNumbers[i].value))
                }
            }
            functions.getScore();
        }
    },
    getScore: () => {
        level.style.display = "none";

        countdown.classList.remove("counting");
        numberContainer.innerHTML = ``;
        for (let i = 0; i < guesses.length; i++) {
            if (numbers[i] === guesses[i]) {
                rights++;
                numberContainer.innerHTML += `
                    <div class="col-2 mb-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-primary text-primary" value="${guesses[i]}" maxlength="1" readonly>
                    </div>
                `;
            } else {
                wrongs++;
                numberContainer.innerHTML += `
                    <div class="col-2 mb-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-danger text-danger" value="${guesses[i]}" maxlength="1" readonly>
                        <span class="text-primary correct-number">${numbers[i]}</span>
                    </div>
                `;
            }
        }
        if (wrongs >= 1) {
            textsContainer.innerHTML = `
                <div class="col-md-12 text-center">
                    <h1>Oops!</h1>
                    <p class="lead">You made it to level ${currentLevel}.</p>
                </div>
            `;
            buttonContainer.innerHTML = `
                <div class="col-md-12 text-center">
                    <button class="btn btn-lg btn-primary" onclick="functions.init()">Back to menu</button>
                </div>
            `;
        } else {
            textsContainer.innerHTML = `
                <div class="col-md-12 text-center">
                    <h1>You did it!</h1>
                    <p class="lead">Try out level ${currentLevel + 1}!</p>
                </div>
            `;
            buttonContainer.innerHTML = `
                <div class="col-md-12 text-center">
                    <button class="btn btn-lg btn-primary" onclick="functions.showNumbers()">Level ${currentLevel +1}</button>
                    <button class="btn btn-lg btn-outline-primary" onclick="functions.init()">Stop playing</button>
                </div>
            `;
        }
    }
};
functions.init();
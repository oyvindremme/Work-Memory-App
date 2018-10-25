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

let amount = 2;

let greetings = ["Hello", "Cheerio", "Sup", "Yo", "Bonjour", "Hola"];

const functions = {
    init: () => {
        currentLevel = 0;
        numbers = [];
        guesses = [];
        rights = 0;
        wrongs = 0;
        amount = 2;
        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = `
            <div class="col-md-12 text-center">
                <h1>${greetings[Math.floor(Math.random() * greetings.length)]}!</h1>
                <p class="lead">Press start button to begin.</p>
                <button class="btn btn-lg btn-success" onclick="functions.showNumbers()">Start</button>
            </div>
        `;
        buttonContainer.innerHTML = ``;
    },
    showNumbers: () => {
        amount++;
        numbers = [];
        guesses = [];

        currentLevel++;
        level.style.display = "block";
        level.innerHTML = `Level ${currentLevel}`;

        console.log(currentLevel);

        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = ``;
        buttonContainer.innerHTML = ``;
        while (numbers.length < amount) {
            numbers.push(Math.floor(Math.random() * 10));
        }
        numbers.forEach(number => {
            numberContainer.innerHTML += `
                <div class="col-3 mb-3">
                    <input type="text" class="application__number" value="${number}" maxlength="1" readonly>
                </div>
            `;
        });
        setTimeout(function() {
            functions.guessNumbers();
        }, 2000);
    },
    guessNumbers: () => {
        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = ``;
        numbers.forEach(() => {
            numberContainer.innerHTML += `
                <div class="col-3 mb-3">
                    <input type="number" class="application__number" inputMode="numeric" pattern="[0-9]*">
                </div>
            `;
        });
        setTimeout(() => {
            appNumbers[0].focus();
        }, 0);
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
        let timer = setTimeout(() => {
            gatherResult();
        }, 5000);
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
                    <div class="col-3 mb-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-success text-success" value="${guesses[i]}" maxlength="1" readonly>
                    </div>
                `;
            } else {
                wrongs++;
                numberContainer.innerHTML += `
                    <div class="col-3 mb-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-danger text-danger" value="${guesses[i]}" maxlength="1" readonly>
                        <span class="text-success correct-number">${numbers[i]}</span>
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
                    <button class="btn btn-lg btn-outline-success" onclick="functions.init()">Back to menu</button>
                </div>
            `;
        } else {
            textsContainer.innerHTML = `
                <div class="col-md-12 text-center">
                    <h1>You did it!</h1>
                    <p class="lead">Try the next level.</p>
                </div>
            `;
            buttonContainer.innerHTML = `
                <div class="col-md-12 text-center">
                    <button class="btn btn-lg btn-outline-success" onclick="functions.init()">Back to menu</button>
                    <button class="btn btn-lg btn-success" onclick="functions.showNumbers()">Next level</button>
                </div>
            `;
        }
    }
};
functions.init();
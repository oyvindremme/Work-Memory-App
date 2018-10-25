const textsContainer = document.getElementById('texts');
const numberContainer = document.getElementById('numbers');
const buttonContainer = document.getElementById('buttons');
const appNumbers = document.getElementsByClassName('application__number');

const countdown = document.getElementById('countbar');

let numbers = [];
let userGuesses = [];

let amount = 2;

let greetings = ["Hello", "Cheerio", "Sup", "Yo", "Bonjour", "Hola"];

const functions = {
    init: () => {
        numbers = [];
        guesses = [];
        amount = 2;
        textsContainer.innerHTML = `
            <div class="col-md-12">
                <h1>${greetings[Math.floor(Math.random() * greetings.length)]}!</h1>
                <p class="lead">Press start button to begin.</p>
            </div>
        `;
        numberContainer.innerHTML = ``;
        buttonContainer.innerHTML = `
            <div class="col-md-12 text-center">
                <button class="btn btn-lg btn-success" onclick="functions.showNumbers()">Start</button>
            </div>
        `;
    },
    showNumbers: () => {
        amount++;
        numbers = [];
        guesses = [];
        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = ``;
        buttonContainer.innerHTML = ``;
        while (numbers.length < amount) {
            numbers.push(Math.floor(Math.random() * 10));
        }
        numbers.forEach(number => {
            numberContainer.innerHTML += `
                <div class="col-4 mb-3">
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
                <div class="col-4 mb-3">
                    <input type="number" class="application__number" inputMode="numeric" pattern="[0-9]*">
                </div>
            `;
        });
        appNumbers[0].focus();
        for (let i = 0; i < numbers.length; i++) {
            appNumbers[i].addEventListener("keyup", () => {
                if (i+1 == appNumbers.length) {
                    gatherResult(); 
                } else {
                    appNumbers[i+1].focus();
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
                typeof parseInt(appNumbers[i].value) === 'number' ? guesses.push(parseInt(appNumbers[i].value)) : guesses.push('?');
            }
            functions.getScore();
        }
    },
    getScore: () => {
        countdown.classList.remove("counting");
        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = ``;
        buttonContainer.innerHTML = `
            <div class="col-md-12 mt-2 text-center">
                <button class="btn btn-lg btn-success" onclick="functions.showNumbers()">Next level</button>
                <button class="btn btn-lg btn-outline-success" onclick="functions.init()">Back to menu</button>
            </div>
        `;
        for (let i = 0; i < guesses.length; i++) {
            if (numbers[i] === guesses[i]) {
                numberContainer.innerHTML += `
                    <div class="col-4 mb-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-success text-success" value="${guesses[i]}" maxlength="1" readonly>
                    </div>
                `;
            } else {
                numberContainer.innerHTML += `
                    <div class="col-4 mb-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-danger text-danger" value="${guesses[i]}" maxlength="1" readonly>
                    </div>
                `;
            }
        }
    }
};
functions.init();
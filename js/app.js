const textsContainer = document.getElementById('texts');
const numberContainer = document.getElementById('numbers');
const buttonContainer = document.getElementById('buttons');
const appNumbers = document.getElementsByClassName('application__number');

let numbers = [];
let userGuesses = [];

let amount = 2;

const functions = {
    init: () => {
        numbers = [];
        guesses = [];
        amount = 2;
        textsContainer.innerHTML = `
            <div class="col-md-12">
                <h1>Hello!</h1>
                <p class="lead">Press start button to begin.</p>
            </div>
        `;
        numberContainer.innerHTML = ``;
        buttonContainer.innerHTML = `
            <div class="col-md-12">
                <button class="btn btn-lg btn-success btn-block" onclick="functions.showNumbers()">Start</button>
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
                <div class="col-3">
                    <input type="text" class="application__number" value="${number}" maxlength="1" readonly>
                </div>
            `;
        });
        setTimeout(function() {
            functions.guessNumbers();
        }, 2000);
    },
    guessNumbers: () => {
        numberContainer.innerHTML = ``;
        numbers.forEach(() => {
            numberContainer.innerHTML += `
                <div class="col-3">
                    <input type="text" class="application__number" inputMode="numeric" pattern="[0-9]*" maxlength="1">
                </div>
            `;
        });
        appNumbers[0].focus();
        console.log(appNumbers.length);
        for (let i = 0; i < numbers.length; i++) {
            appNumbers[i].addEventListener("keyup", () => {
                if (i+1 == appNumbers.length) {
                    appNumbers[i].focus();
                } else {
                    appNumbers[i+1].focus();
                }
            });
        }
        setTimeout(() => {
            for (let i = 0; i < numbers.length; i++) {
                typeof parseInt(appNumbers[i].value) === 'number' ? guesses.push(parseInt(appNumbers[i].value)) : guesses.push('?');
            }
            functions.getScore();
        }, 5000);

    },
    getScore: () => {
        textsContainer.innerHTML = ``;
        numberContainer.innerHTML = ``;
        buttonContainer.innerHTML = `
            <div class="col-md-12 mt-5">
                <button class="btn btn-lg btn-success btn-block" onclick="functions.showNumbers()">More numbers</button>
                <button class="btn btn-lg btn-success btn-block" onclick="functions.init()">Back to start</button>
            </div>
        `;
        for (let i = 0; i < guesses.length; i++) {
            if (numbers[i] === guesses[i]) {
                numberContainer.innerHTML += `
                    <div class="col-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-success text-success" value="${guesses[i]}" maxlength="1" readonly>
                    </div>
                `;
            } else {
                numberContainer.innerHTML += `
                    <div class="col-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-danger text-danger" value="${guesses[i]}" maxlength="1" readonly>
                    </div>
                `;
            }
        }
    }
};
functions.init();
const numberContainer = document.getElementById('numbers');
const appNumbers = document.getElementsByClassName('application__number');

let numbers = [];
let userGuesses = [];

const functions = {
    init: () => {
        numberContainer.classList.add('flex-column');
        numbers = [];
        guesses = [];
        numberContainer.innerHTML = `
            <h1>Hello!</h1>
            <p class="lead">Press the start button to begin.</p>
            <button class="btn btn-lg btn-success" onclick="functions.showNumbers()">Start</button>
        `;
    },
    showNumbers: () => {
        numberContainer.classList.remove('flex-column');
        numberContainer.innerHTML = ``;
        while (numbers.length < 4) {
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
                    functions.getScore();
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
        numberContainer.innerHTML = ``;
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
        numberContainer.innerHTML += `
            <button class="btn btn-lg btn-success mt-5" onclick="functions.init()">Try again</button>
        `;
    }
};
functions.init();
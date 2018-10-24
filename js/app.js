const app = document.getElementById('app');
const appNumbers = document.getElementsByClassName('application__number');

let numbers = [];
let guesses = [];

const functions = {
    init: () => {
        app.classList.add('flex-column');
        numbers = [];
        guesses = [];
        app.innerHTML = `
            <h1>Hello!</h1>
            <p class="lead">Press the start button to begin.</p>
            <button class="btn btn-lg btn-success" onclick="functions.showNumbers()">Start</button>
        `;
    },
    showNumbers: () => {
        app.classList.remove('flex-column');
        app.innerHTML = ``;
        while (numbers.length < 4) {
            numbers.push(Math.floor(Math.random() * 10));
        }
        numbers.forEach(number => {
            app.innerHTML += `
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
        app.innerHTML = ``;
        numbers.forEach(() => {
            app.innerHTML += `
                <div class="col-3">
                    <input type="number" class="application__number" inputMode="numeric" pattern="[0-9]*" maxlength="1">
                </div>
            `;
        });
        appNumbers[0].focus();
        setTimeout(() => {
            for (let i = 0; i < numbers.length; i++) {
                typeof parseInt(appNumbers[i].value) === 'number' ? guesses.push(parseInt(appNumbers[i].value)) : guesses.push('?');
            }
            functions.getScore();
        }, 5000);

    },
    getScore: () => {
        app.innerHTML = ``;
        for (let i = 0; i < guesses.length; i++) {
            if (numbers[i] === guesses[i]) {
                app.innerHTML += `
                    <div class="col-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-success text-success" value="${guesses[i]}" maxlength="1" readonly>
                    </div>
                `;
            } else {
                app.innerHTML += `
                    <div class="col-3">
                        <input id="inp${i + 1}" type="text" class="application__number border-danger text-danger" value="${guesses[i]}" maxlength="1" readonly>
                    </div>
                `;
            }
        }
        app.innerHTML += `
            <button class="btn btn-lg btn-success mt-5" onclick="functions.init()">Try again</button>
        `;
    }
};
functions.init();
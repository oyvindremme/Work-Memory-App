// App DOM Selector
const app = document.getElementById('app');
// Number inputs
const appNumbers = document.getElementsByClassName('application__number');
// Array for numbers generated
let numbers = [];
// Array for user's guesses/numbers
let guesses = [];
// Contains all functions for application
const functions = {
    // Initial function. This is the first thing the user sees when opening the application and clicking "Try again"
    init: () => {
        // Array for numbers generated
        numbers = [];
        // Array for user's guesses/numbers
        guesses = [];
        // Adds button for starting application
        app.innerHTML = `
            <button class="btn btn-lg btn-outline-dark" onclick="functions.showNumbers()">Start</button>
        `;
    },
    // Shows the numbers the user has to guess
    showNumbers: () => {
        // Clears the DOM
        app.innerHTML = ``;
        // Adds random numbers to array
        while (numbers.length < 4) {
            numbers.push(Math.floor(Math.random() * 10));
        }
        // Displays the random numbers added to the array to the DOM
        for (let i = 0; i < numbers.length; i++) {
            app.innerHTML += `
                <div class="col-3">
                    <input type="text" class="application__number" value="${numbers[i]}" maxlength="1" readonly>
                </div>
            `;
        }
        // User gets a definite amount of time to memorize numbers before next function runs
        setTimeout(() => {
            functions.guessNumbers();
        }, 2000);
    },
    // This function requires the user to guess the numbers that was shown (in correct order) in the previous function
    guessNumbers: () => {
        // Clears the DOM
        app.innerHTML = ``;
        // Adds inputs to the DOM from amount of numbers existing in the numbers array
        for (let i = 0; i < numbers.length; i++) {
            app.innerHTML += `
                <div class="col-3">
                    <input type="text" class="application__number" maxlength="1">
                </div>
            `;
        }
        // FOR DEBUGGING
        console.log(numbers);
        // Timeout for user's definite time of guessing the correct numbers
        setTimeout(() => {
            // Pushes the guesses the user made to the guesses array
            for (let i = 0; i < numbers.length; i++) {
                appNumbers[i].value === '' ? guesses.push('?') : guesses.push(parseInt(appNumbers[i].value));
            }
            functions.getScore();
        }, 5000);

    },
    // The user gets an overview of what he/she guessed right and wrong
    getScore: () => {
        // Clears the DOM
        app.innerHTML = ``;
        // Loops through and compares the user guesses to the numbers array
        for (let i = 0; i < guesses.length; i++) {
            // Ternary operator for comparing stored numbers to user guesses
            numbers[i] === guesses[i]
            // Displays a success on the input if the user correctly guessed the number
            ? app.innerHTML += `<div class="col-3">
                                    <input type="text" class="application__number border-success text-success" value="${guesses[i]}" maxlength="1" readonly>
                                </div>`
            // Displays an error on the input if the user guessed the wrong number
            : app.innerHTML += `<div class="col-3">
                                    <input type="text" class="application__number border-danger text-danger" value="${guesses[i]}" maxlength="1" readonly>
                                </div>`;
        }
        // Adds a button to go back to the application start
        app.innerHTML += `
            <button class="btn btn-lg btn-outline-dark" onclick="functions.init()">Try again</button>
        `;
        // FOR DEBUGGING
        console.log(guesses);
    }
};
// Initial function (when user opens the application for the first time)
functions.init();
import React from 'react';
import StartMenu from './StartMenu';
import ShowNumbers from './ShowNumbers';
import SetUpGuessFields from './SetUpGuessFields';

class WorkMemoryTestIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 0,
            currentLevel: 0,
            numbers: [],
            userGuesses: [],
            rights: 0,
            wrongs: 0,
            boxesToGenerate: 2,
            countdownAmount: 5
        }
        this.goToShowNumbers = this.goToShowNumbers.bind(this);
    }

    goToShowNumbers() {
        this.setState({
            step: 1,
            boxesToGenerate: this.state.boxesToGenerate + 1,
            numbers: [],
            userGuesses: [],
            currentLevel: this.state.currentLevel + 1,
        });
    }

    render() {
        switch (this.state.step) {
            case 0:
                return(
                    <div className="application container">
                        <StartMenu startTest={this.goToShowNumbers}/>
                    </div>
                );
            case 1:
                console.log(this.state.boxesToGenerate);
                console.log(this.state.currentLevel);
                while(this.state.numbers.length < this.state.boxesToGenerate){
                    this.state.numbers.push(Math.floor(Math.random() * 10));
                };
                let numbersArray = [];
                this.state.numbers.forEach((number) => {
                    numbersArray.push(<ShowNumbers key={number} fieldValue={number}/>);
                });
                setTimeout(() => {
                    this.setState({
                        step: 2
                    });
                }, 2000);
                return(
                    <div className="application container">
                        <div className="row justify-content-center">
                            {numbersArray}
                        </div>
                    </div>
                );
            case 2:
                console.log(this.state.numbers);
                console.log(this.state.userGuesses);
                let guessFields = [];
                this.state.numbers.forEach((number) => {
                    guessFields.push(<SetUpGuessFields key={number} />);
                });
                setTimeout(() => {
                    this.setState({
                        step: 3
                    });
                    console.log(this.state.countdownAmount);
                }, this.state.countdownAmount * 1000);
                return(
                    <div className="application container">
                        <div className="row justify-content-center">
                            {guessFields}
                        </div>
                    </div>
                );
            case 3:
            setTimeout(() => {
                this.setState({
                    step: 0
                });
            }, 2000);
                return(
                    <h1>YAY YOU MADE IT WOOO</h1>
                );
            default:
                break;
        }
        return(
            <div className="container application">
                <StartMenu />
            </div>
        );
    }

}

export default WorkMemoryTestIndex;
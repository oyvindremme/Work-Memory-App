import React from 'react';
import StartMenu from './StartMenu';
import ApplicationContainer from './ApplicationContainer';
import NumberField from './NumberField';

class WorkMemoryTestIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 0,
            currentLevel: 0,
            numbers: [],
            userGuesses: [],
            guessFields: [],
            rights: 0,
            wrongs: 0,
            boxesToGenerate: 2,
            countdownAmount: 5
        }
    }

    // Function to start/increment application
    goToShowNumbers = () => {
        this.setState({
            step: 1,
            boxesToGenerate: this.state.boxesToGenerate + 1,
            numbers: [],
            userGuesses: [],
            guessFields: [],
            currentLevel: this.state.currentLevel + 1,
        });
    }

    render() {
        switch (this.state.step) {
            case 0:

                return(
                    <ApplicationContainer>
                        <StartMenu startTest={this.goToShowNumbers}/>
                    </ApplicationContainer>
                );

            case 1:

                console.log(this.state.boxesToGenerate);
                console.log(this.state.currentLevel);

                while(this.state.numbers.length < this.state.boxesToGenerate){
                    this.state.numbers.push(Math.floor(Math.random() * 10));
                };

                let numbersArray = [];

                this.state.numbers.forEach((number, i) => {
                    numbersArray.push(<NumberField key={i} fieldValue={number}/>);
                });

                setTimeout(() => {
                    this.setState({
                        step: 2
                    });
                }, 2000);

                return(
                    <ApplicationContainer>
                        <div className="row justify-content-center">
                            {numbersArray}
                        </div>
                    </ApplicationContainer>
                );

            case 2:

                console.log(this.state.numbers);
                this.state.numbers.forEach((number, i) => {
                    this.state.guessFields.push(<NumberField key={i} fieldValue=""/>);
                });

                setTimeout(() => {
                    this.setState({
                        step: 3
                    });
                }, this.state.countdownAmount * 1000);

                return(
                    <ApplicationContainer>
                        <div className="row justify-content-center">
                            {this.state.guessFields}
                        </div>
                    </ApplicationContainer>
                );

            case 3:

                setTimeout(() => {
                    this.setState({
                        step: 0
                    });
                }, 2000);
                    console.log(this.state.userGuesses);
                return(
                    <ApplicationContainer>
                        <h1>END</h1>
                    </ApplicationContainer>
                );

            default:

                break;

        }
        return(
            <ApplicationContainer>
                <StartMenu />
            </ApplicationContainer>
        );
    }

}

export default WorkMemoryTestIndex;
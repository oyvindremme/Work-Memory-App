import React from 'react';

class StartMenu extends React.Component {
    state = {
        greetings: [
            "Hello",
            "Cheerio",
            "Sup",
            "Yo",
            "Bonjour",
            "Hola",
            "Konichiwa"
        ]
    }
    randomGreetings() {
        return this.state.greetings[Math.floor(Math.random() * this.state.greetings.length)];
    }
    render() {
        return(
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>{this.randomGreetings()}!</h1>
                    <p className="lead">Press start button to begin.</p>
                    <button className="btn btn-block btn-lg btn-primary" onClick={this.props.startTest}>Start</button>
                </div>
            </div>
        );
    }
}

export default StartMenu;
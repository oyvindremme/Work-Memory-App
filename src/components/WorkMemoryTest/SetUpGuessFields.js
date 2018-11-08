import React from 'react';

class SetUpGuessFields extends React.Component {
    render() {
        return(
            <div className="application__number-container">
                <input type="number" className="application__number-container__number" inputMode="numeric" pattern="[0-9]*" />
            </div>
        );
    }
}

export default SetUpGuessFields;
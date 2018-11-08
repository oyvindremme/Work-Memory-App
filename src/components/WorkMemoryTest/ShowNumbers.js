import React from 'react';

class ShowNumbers extends React.Component {
    render() {
        return(
            <div className="application__number-container">
                <input type="text" className="application__number-container__number" value={this.props.fieldValue} maxLength="1" readOnly />
            </div>
        );
    }
}

export default ShowNumbers;
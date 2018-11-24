import React from 'react';

class NumberField extends React.Component {
    render() {
        return(
            <div className="col-2 mb-5" style={styles}>
                <input type="number" value={this.props.fieldValue} style={styles.input} inputMode="numeric" pattern="[0-9]*" />
            </div>
        );
    }
}

const styles = {
    input: {
        fontSize: '7rem',
        width: '100%',
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: "1",
        border: "0",
        borderBottom: "7px solid #000000",
        borderStyle: "solid"
    }
}

export default NumberField;
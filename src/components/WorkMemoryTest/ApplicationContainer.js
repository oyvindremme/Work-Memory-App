import React from 'react';

class ApplicationContainer extends React.Component {
    render() {
        return(
            <div className="container" style={styles}>
                {this.props.children}
            </div>
        );
    }
}

const styles = {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    gridTemplateRows: 'auto',
    minHeight: '100vh'
}

export default ApplicationContainer;
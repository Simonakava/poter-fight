import React from 'react';
import './Shield.css';

export default class Shield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let shieldStyle={
            top: this.props.fighter.top-20 + "px",
            left: this.props.fighter.left + "px",
            width: 1.2*this.props.fighter.width + "px",
            height: 1.3*this.props.fighter.height + "px",
        }

        return (
            <div style={shieldStyle} className="energyShield"></div>
        );
    }
}
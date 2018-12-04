import React, { Component } from 'react';
import './wallFight.css';
import background1 from '../image/background/backgroundCastle.jpg';
import background2 from '../image/background/backgroundCastleBasement.jpg';
import background3 from '../image/background/backgroundCastleDoor.jpg';
import background4 from '../image/background/backgroundCastleFire.jpg';
import background5 from '../image/background/backgroundCastleIndoor.jpg';
import background6 from '../image/background/backgroundCastleNight.jpg';
import background7 from '../image/background/backgroundCastleStairs.jpg';
import background8 from '../image/background/backgroundForestLightning.jpg';
import background9 from '../image/background/backgroundQuidditch.jpg';
import background10 from '../image/background/backgroundQuidditchFight.jpg';
import background11 from '../image/background/backgroundQuidditchStadium.jpg';
import background12 from '../image/background/backgroundTrain.jpg';


class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgImage: [
                background1,
                background2,
                background3,
                background4,
                background5,
                background6,
                background7,
                background8,
                background9,
                background10,
                background11,
                background12,
            ],
            selectedImage: background1,
        };
    }

    componentDidMount() {
        this.getRandomBackground();
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return(!(nextProps.turn === this.props.turn))
    }

    componentWillUpdate=()=>{
        this.getRandomBackground();
    }

    getRandomBackground() {
        const randomImage = this.state.bgImage[Math.floor(Math.random() * this.state.bgImage.length)];
        this.setState({
            selectedImage: randomImage,
        });
    }

    render() {
        return (
            <div className="pic" style={{ backgroundImage: `url(${this.state.selectedImage})` }} />
        );
    }
}

export default Wall;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Settings from './Settings';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupButtons: false,
      showSettings: false,
    };
    this.displayPopups = this.displayPopups.bind(this)
  }

    displayPopups = () => {
      this.setState({
        popupButtons: !this.state.popupButtons,
      });
    }

    gameTypeChoice = (choice) => {
      this.props.gameType(choice);
    }

    showSettings = () => {
      this.setState({
        showSettings: !this.state.showSettings,
      });
    }

    setVolume = (target, bool) => {
      this.props.setVolume(target, bool);
    }

    render() {
      return (
        <div className="container1">
          <p className="title1">Potter Fight</p>
          <button type="button" onClick={() => this.displayPopups()} className="newGame">NEW GAME</button>
          {
            this.state.popupButtons 
              ? (
                <div className="hidden">
                  <Link to="/HouseSelection"><button style={{color: 'rgb(252, 222, 53)'}} type="button" onClick={() => this.gameTypeChoice('1v1')}>1 VS 1</button></Link>
                  <Link to="/HouseSelection"><button style={{color: 'rgb(252, 222, 53)'}} type="button" onClick={() => this.gameTypeChoice('tournament')}>TOURNAMENT</button></Link>
                </div>
              )
              : (
                <div />
              )
            }
          <button className="settings" type="button" onClick={() => this.showSettings()}>SETTINGS</button>
          {this.state.showSettings ?
          (
            <Settings
              isMusicOn={this.setVolume}
              isSoundOn={this.setVolume}
              showSettings={this.showSettings}
            />
          ):
          (<div />)}
        </div>
      );
    }
}

export default HomePage;

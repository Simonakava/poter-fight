import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import './App.css';
import Fight from './scripts/Fight';
import HouseSelection from './scripts/HouseSelection';
import TournementVictory from './scripts/TournementVictory';
import HomePage from './scripts/HomePage';
import music from './sound/backgroundMusic.mp3';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameType: 'tournament',
      fightersHouse: ['Gryffindor', 'Slytherin', 'Hufflepuff'],
      isEndTournament: {
        Gryffindor: 600,
        Slytherin: 200,
        Ravenclaw: 300,
        Hufflepuff: 400,
      },
      soundVolume: 1,
      musicVolume: 1,
    };

    this.backgroundMusic = new Audio(music);
    this.backgroundMusic.play();
    this.backgroundMusic.volume = this.state.musicVolume;
  }

  getGameType = (choice) => {
    this.setState({ gameType: choice })
  }

  getFinalSelection = (players) => {
    this.setState({ fightersHouse: players })
  }

  endTournament = (scoreFighters) => {
    this.setState({ isEndTournament: scoreFighters })
  }

  setVolume = (target, bool) => {
    if (target.includes('Music')) {
      if (!bool) this.setState({ musicVolume: 0 });
      else this.setState({ musicVolume: 1 });
    }
    else if (target.includes('Sound')) {
      if (!bool) this.setState({ soundVolume: 0 });
      else this.setState({ soundVolume: 1 });
    }
  }

  componentDidUpdate = () => {
    this.backgroundMusic.volume = this.state.musicVolume;
    this.soundsVolume = this.state.soundVolume;
  }

  render() {
    return (
      <div className="App">
        <audio autoPlay>
          <source src='./sound/backgroundMusic.mp3'></source>
        </audio>
        <HashRouter>
          <Switch>
            <Route
              exact path="/"
              render={() => (
                <HomePage
                  gameType={this.getGameType}
                  setVolume={this.setVolume}
                />)}
            />
            <Route
              path="/HouseSelection"
              render={() => (
                <HouseSelection
                  finalSelection={this.getFinalSelection}
                  gameType={this.state.gameType}
                />)}
            />
            <Route
              path="/Fight"
              render={() => (
                <Fight
                  fightersHouse={this.state.fightersHouse}
                  endTournament={this.endTournament}
                  gameType={this.state.gameType}
                  soundEffect={{
                    musicVolume: this.state.musicVolume,
                    effectsVolume: this.state.soundVolume,
                  }}
                />)}
            />
            <Route
              path="/TournementVictory"
              render={() => (
                <TournementVictory
                  isEndTournament={this.state.isEndTournament}

                />)}
            />
          </Switch>
        </HashRouter>

      </div>
    );
  }
}

export default App;
import React from 'react';
import volumeOn from '../image/volumeOn.png';
import volumeOff from '../image/volumeOff.png';

import './Settings.css';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMusicOn: true,
      isSoundOn: true,
    };
  }

  toggle = (inputToToggle) => {
    this.props[inputToToggle](inputToToggle, !this.state[inputToToggle]);
    this.setState({
      [inputToToggle]: !this.state[inputToToggle]
    });
  }

  toggleWindow = () => {
    this.props.showSettings();
  }

  render() {
    const volumeOnStyle = {
      width: '30px',
      height: '30px',
      display: this.state.isMusicOn ? 'block' : 'none',
    };

    const volumeOffStyle = {
      width: '30px',
      height: '30px',
      display: !this.state.isMusicOn ? 'block' : 'none',
    };

    const soundOnStyle = {
      width: '30px',
      height: '30px',
      display: this.state.isSoundOn ? 'block' : 'none',
    };

    const soundOffStyle = {
      width: '30px',
      height: '30px',
      display: !this.state.isSoundOn ? 'block' : 'none',
    }

    return (
      <div id="settings">
        <div className="settingSound">
          <p>Music :</p>
          <p>
            <button type="button" onClick={() => { this.toggle('isMusicOn'); }} style={volumeOnStyle}><img src={volumeOn} alt="volume on" /></button>
            <button type="button" onClick={() => { this.toggle('isMusicOn'); }} style={volumeOffStyle}><img src={volumeOff} alt="volume off" /></button>
          </p>
        </div>
        <div className="settingSound">
          <p>Sound :</p>
          <p>
            <button type="button" onClick={() => { this.toggle('isSoundOn'); }} style={soundOnStyle}><img src={volumeOn} alt="sound on" /></button>
            <button type="button" onClick={() => { this.toggle('isSoundOn'); }} style={soundOffStyle}><img src={volumeOff} alt="sound off" /></button>
          </p>
        </div>
      </div>
    );
  }
}

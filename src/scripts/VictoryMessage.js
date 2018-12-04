import React from 'react';
import './VictoryMessage.css'
import { Link } from "react-router-dom";

//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class VictoryMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modeTournoi: this.props.gameType === "1v1" ? false : true,
      turn:this.props.turn,
    };
  }

  nextFight=()=>{
    this.setState({
      turn:this.state.turn++
    })
    this.props.nextFight(this.state.turn);
  }

  restartFight=()=>{
    this.props.restartFight();
  }

  render() {
    

    return (
      <div className="VictoryText">
        <p>CONGRATS {this.props.winningHouse} !!</p>
        <div className="ButtonChoice">{
          this.state.modeTournoi ?
            <button onClick={this.nextFight}>Next Fight</button>
            :
            <button onClick={this.restartFight}>Start Again</button>
        }
            <Link to="/"><button >Home Page</button></Link>
        </div>
      </div>
    );
  }
}

export default VictoryMessage;

import React, { Component } from 'react';
import Shield from './HeaderShield';
import Timer from './Timer'

class Header extends Component {

  constructor(props){
    super(props);
    this.state={
      fighter1: this.props.fighter1,
      fighter2: this.props.fighter2,
    }
  }

  renderShields(numberOfShields){
    const shieldsItem = [];
    for (var i=0; i < numberOfShields; i++) {
      shieldsItem.push(<Shield />);
    }
    return shieldsItem;
  }

  endOfFight=()=>{
    //this.props.fighter2.life > this.props.fighter1.life ? this.props.endOfFight(this.props.fighter1.id, this.props.fighter2.id) : this.props.endOfFight(this.props.fighter2.id, this.props.fighter1.id)
    this.props.endOfFight()
  }

  render() {

    let shieldsFighter1={
      position : "absolute",
      top : "45px",
      left : "34vw",
      zIndex : 3,
    }

    let shieldsFighter2={
      position : "absolute",
      top : "45px",
      left : "61vw",
      zIndex : 3,
    }
      
    return (
      <div>
        <Timer
          fightTime = {this.props.fightTime}
          endOfFight={this.endOfFight}
          modalVictory={this.props.modalVictory}
          displayInstr={this.props.displayInstr}
          startGame={this.props.startGame}
        />
        <div id="shieldsFighter1" style={shieldsFighter1}>
            {
              this.renderShields(this.props.fighter1.defense.shieldNumber)
            } 
        </div>
        <div id="shieldsFighter2" style={shieldsFighter2}>
            {
              this.renderShields(this.props.fighter2.defense.shieldNumber)
            } 
        </div>
      </div>
    );
  }
}

export default Header;

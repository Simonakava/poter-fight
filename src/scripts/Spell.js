import React, { Component } from 'react';
import './Spell.css';

class Spell extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    let spellStyle={
      position: "absolute",
      top: this.props.spell.top+"px",
      left: this.props.spell.left+"px",
      width: this.props.spell.width+"px",
      height: this.props.spell.height+"px",
    }
    
    return (
      <div className="spell" id={this.props.spell.id} style={spellStyle}>
      </div>
    );
  }
}

export default Spell;

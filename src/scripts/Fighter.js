import React, { Component } from 'react';
import './Fighter.css';
import GryffindorColor from "../image/silouhetteGryffindor.png";
import SlytherinColor from "../image/silouhetteSlytherin.png";
import RavenclawColor from "../image/silouhetteRavenclaw.png";
import HufflepuffColorColor from "../image/silouhetteHufflepuff.png";
//import HeadDeath from "../image/tetedemort.png"; Image tête de mort si besoin
import HeadDeath2 from "../image/lightning-death.png";
import Impact from "../image/Impact.gif"

class Fighter extends Component {

  constructor(props) {
    super(props);
    this.Gryffindor = GryffindorColor;
    this.Slytherin = SlytherinColor;
    this.Ravenclaw = RavenclawColor;
    this.Hufflepuff = HufflepuffColorColor;
    //this.Head = HeadDeath; image tête de mort si besoin
    this.Head2 = HeadDeath2;

    this.state = {
      spellCasted: false,
      rotation: this.props.fighter.rotation,
      facesRight: this.props.fighter.facesRight,
      top: this.props.fighter.top,
      left: this.props.fighter.left,
      width: this.props.fighter.width,
      height: this.props.fighter.height,
      speed: 50,
      tabKeys: [],
    }
  }


  componentDidMount() {

    document.addEventListener("keydown", this.inTab1, false)
    document.addEventListener("keyup", this.outTab1, false);

  }



  inTab1 = (event) => {
    let localTabKeys = this.state.tabKeys;
    if (localTabKeys.indexOf(event.key) < 0) {
      localTabKeys.push(event.key)
    }
    this.setState({
      tabKeys: localTabKeys,
    })
    this.handleKeyPress(localTabKeys)
  }


  handleKeyPress = (localTabKeys) => {
    if (this.props.victory === false && this.props.displayInstr === false && this.props.startGame === false) {
      if (localTabKeys.indexOf(this.props.fighter.moveUp) !== -1 && this.props.fighter.top > 110) {
        this.props.fighter.move(this.props.fighter.id, -this.state.speed, 0)
      }
      if (localTabKeys.indexOf(this.props.fighter.moveDown) !== -1 && this.props.fighter.top < window.innerHeight - this.props.fighter.height - 20) {
        this.props.fighter.move(this.props.fighter.id, this.state.speed, 0)
      }
      if (localTabKeys.indexOf(this.props.fighter.moveLeft) !== -1 && this.props.fighter.left > -20) {
        this.props.fighter.move(this.props.fighter.id, 0, -this.state.speed)
      }
      if (localTabKeys.indexOf(this.props.fighter.moveRight) !== -1 && this.props.fighter.left < window.innerWidth - this.props.fighter.width - 20) {
        this.props.fighter.move(this.props.fighter.id, 0, this.state.speed)
      }
      if (localTabKeys.indexOf(this.props.fighter.attack) !== -1) {
        this.props.fighter.castSpell(this.props.fighter.id, this.props.fighter.facesRight)
      }
      if (localTabKeys.indexOf(this.props.fighter.rotate) !== -1) {
        this.props.fighter.rotateFighter(this.props.fighter.id)
      }
      if (localTabKeys.indexOf(this.props.fighter.defend) !== -1 && this.props.fighter.defense.shieldNumber > 0) {
        this.props.fighter.takeOutShield(this.props.fighter.id)
      }
    }
  }



  outTab1 = (event) => {
    let localTabKeys = this.state.tabKeys;
    if (localTabKeys.indexOf(event.key) >= 0) {
      localTabKeys.splice(localTabKeys.indexOf(event.key), 1)
    }
    this.setState({
      tabKeys: localTabKeys,
    })
  }



  render() {

    let fighterStyle = {
      transform: `rotateY(${this.props.fighter.rotation}deg)`,
      position: "absolute",
      top: this.props.fighter.top + "px",
      left: this.props.fighter.left + "px",
      width: this.state.width + "px",
      height: this.state.height + "px",
      backgroundImage: this.props.fighter.deathFighter === true ? `url(${Impact})` : `url(${this[this.props.fighter.house]})`,
    };// ternaire pour afficher la mort de fightherID

    let fighterStyleTouched = {
      transform: `rotateY(${this.props.fighter.rotation}deg)`,
      position: "absolute",
      top: this.props.fighter.top + "px",
      left: this.props.fighter.left + "px",
      width: this.state.width + "px",
      height: this.state.height + "px",
      backgroundImage: `url(${this.Head2})`,
    };

    let fighterId = "fighter" + this.props.fighter.house
    return (

      <div>
        <div className="fighter" style={(this.props.fighter.touched) ? fighterStyleTouched : fighterStyle} id={fighterId}>
        </div>
      </div>
    );
  }
}

export default Fighter;

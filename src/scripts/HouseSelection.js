import React, { Component } from "react";
import Hogwarts from "../image/logochoice.png";
import "./Houses.css"
import { Link } from "react-router-dom"
import trash from "../image/trash.svg"


class HouseSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerSelection: [],   //tableau envoyé à "App" via this.props.finalSelection()
      playerAmount: this.props.gameType === "1v1" ? 2 : 3,  // quantité de joueurs (valeur initiale à 3 en tournoi, et par défaut à 2 en 1v1)
      selection: "", //  maison qui apparaît sur le bouton de confirmation
      clearButton: false,   // permet de faire disparaitre le bouton après avoir confirmé son choix de maison
      Gryffindor: {
        isSelected: false,   // empêche 2+ joueurs de sélectionner la même maison
        top: 250,  //px
        left: 10,   //%
        height: 200,  //px
        width: 12,  //%
        opacity: 1,   //opacité diminuée quand maison est choisie -> grayOut()
      },
      Slytherin: {
        isSelected: false,
        top: 250,
        left: 79,
        height: 200,
        width: 12,
        opacity: 1,   //opacité diminuée quand maison est choisie -> grayOut()
      },
      Hufflepuff: {
        isSelected: false,
        top: 500,
        left: 10,
        height: 200,
        width: 12,
        opacity: 1,   //opacité diminuée quand maison est choisie -> grayOut()
      },
      Ravenclaw: {
        isSelected: false,
        top: 500,
        left: 79,
        height: 200,
        width: 12,
        opacity: 1,    //opacité diminuée quand maison est choisie -> grayOut()
      },
    }
  }

  clearChoice = () => {
    this.setState({
      playerSelection: [],
      clearButton: false,
      Gryffindor: { opacity: 1, isSelected: false },
      Slytherin: { opacity: 1, isSelected: false },
      Ravenclaw: { opacity: 1, isSelected: false },
      Hufflepuff: { opacity: 1, isSelected: false },
    });
  }

  playerAmount = (amount) => {
    this.clearChoice();
    this.setState({
      playerAmount: amount,
    });
  }
  
  // ajout maison par joueur
  addToPlayerSelection = (housePicked) => {
    this.setState({ clearButton: true });
    if (this.state.playerAmount !== this.state.playerSelection.length && this.state[housePicked].isSelected === false ) {
      const playerAdd = this.state.playerSelection
      playerAdd.push(housePicked)
      this.setState({ playerSelection: playerAdd })
      this.grayOut(housePicked)
    }
  }
  
  // bouton reset choix maison
  clearButton() {
    if (this.state.playerSelection.length >= 0 && this.state.clearButton === true)
      return <button
        onClick={this.clearChoice} className="clear-button"><img src={trash} /></button>;
  }

  // fonction pour empêcher de sélectionner maison deux fois:
  grayOut = (select) => {
    this.setState({
      [select]: {
        isSelected: true,
        opacity: 0.4,
      }
    })
  }

  hideUnselectedHouse = () => {
    if (this.state.playerAmount === this.state.playerSelection.length) {
      switch (this.state.Gryffindor.isSelected) {case false: this.setState({Gryffindor: {opacity: 0}})};
      switch (this.state.Slytherin.isSelected) {case false: this.setState({Slytherin: {opacity: 0}})};
      switch (this.state.Ravenclaw.isSelected) {case false: this.setState({Ravenclaw: {opacity: 0}})};
      switch (this.state.Hufflepuff.isSelected) {case false: this.setState({Hufflepuff: {opacity: 0}})};
    }
  }

  // fonction du onclick pour confirmer le choix final et passer à la page de combat. Link pour envoyer sur ./fight.js
  playerConfirmation() {
    if (this.state.playerAmount !== 0 && this.state.playerSelection.length === this.state.playerAmount) //1ère condition du "if" nécessaire pour que bouton apparaisse pas au début
      return <Link to="/fight"><button
        onClick={() => this.props.finalSelection(this.state.playerSelection)}
        className="start-button">START COMBAT</button></Link>
  }

  // titre de la page -> change en fonction du joueur qui doit choisir sa maison:
  pageTitle = () => {
    if (this.state.playerSelection.length < this.state.playerAmount) { return <h1 className="choose-house"> Player {this.state.playerSelection.length + 1}: Choose your  House</h1> }
    else { return <h1 className="choose-house">Houses have been chosen!</h1> }
  }

  //les quatre fonctions suivantes affichent les choix de maison pour chaque joueur (faudrait en faire une seule fonction)

  selectionChoice1 = () => {
    if (typeof this.state.playerSelection[0] !== "undefined") return <h2 className="player-selection">Player 1: {this.state.playerSelection[0]}</h2>
  }
  selectionChoice2 = () => {
    if (typeof this.state.playerSelection[1] !== "undefined") return <h2 className="player-selection">Player 2: {this.state.playerSelection[1]}</h2>
  }
  selectionChoice3 = () => {
    if (typeof this.state.playerSelection[2] !== "undefined") return <h2 className="player-selection">Player 3: {this.state.playerSelection[2]}</h2>
  }
  selectionChoice4 = () => {
    if (typeof this.state.playerSelection[3] !== "undefined") return <h2 className="player-selection">Player 4: {this.state.playerSelection[3]}</h2>
  }

  render() {
    // 4 fonctions suivantes = styles des blasons pour anim. Pour l'instant anim sur opacity quand maison choisie
    let slytherinStyle = {
      backgroundSize: "contain",
      position: "absolute",
      top: this.state.Slytherin.top + "px",
      left: this.state.Slytherin.left + "%",
      height: this.state.Slytherin.height + "px",
      width: this.state.Slytherin.width + "%",
      opacity: this.state.Slytherin.opacity
    };

    let gryffindorStyle = {
      backgroundSize: "contain",
      position: "absolute",
      top: this.state.Gryffindor.top + "px",
      left: this.state.Gryffindor.left + "%",
      height: this.state.Gryffindor.height + "px",
      width: this.state.Gryffindor.width + "%",
      opacity: this.state.Gryffindor.opacity
    };

    let ravenclawStyle = {
      backgroundSize: "contain",
      position: "absolute",
      top: this.state.Ravenclaw.top + "px",
      left: this.state.Ravenclaw.left + "%",
      height: this.state.Ravenclaw.height + "px",
      width: this.state.Ravenclaw.width + "%",
      opacity: this.state.Ravenclaw.opacity
    };

    let hufflepuffStyle = {
      backgroundSize: "contain",
      position: "absolute",
      top: this.state.Hufflepuff.top + "px",
      left: this.state.Hufflepuff.left + "%",
      height: this.state.Hufflepuff.height + "px",
      width: this.state.Hufflepuff.width + "%",
      opacity: this.state.Hufflepuff.opacity
    };


    return (

      <body className="body">
        <div>{this.props.gameType === "tournament" ? <h1>Tournament Mode</h1> : <h1>1 vs 1</h1>}
          {/* blason poudlard */}
          <img src={Hogwarts} className="main-shield" alt="HOGWARTS" />
          {/* titre page */}
          {this.pageTitle()}
          {/* choix du nombre de joueurs */}
          {this.props.gameType === "tournament" ?
            <select className="player-amount" onChange={(e) => { this.playerAmount(parseInt(e.target.value, 10)) }} >
              {/*} <option value="2">2 players</option> */}
              <option value="3">3 players</option>
              <option value="4">4 players</option>
            </select>
            :
            <div></div>
          }
        </div>
        <div id="playerChoice">
          {/* affichage du choix des joueurs */}
          {this.selectionChoice1()}
          {this.selectionChoice2()}
          {this.selectionChoice3()}
          {this.selectionChoice4()}
        </div>
        <div>
          {() => this.grayOut()}
          {/* blasons des maisons */}
          <div className="Slytherin shield-button" onClick={() => this.addToPlayerSelection("Slytherin")} style={slytherinStyle}>
          </div>
          <div className="Gryffindor shield-button" onClick={() => this.addToPlayerSelection("Gryffindor")} style={gryffindorStyle}>
          </div>
          <div className="Ravenclaw shield-button" onClick={() => this.addToPlayerSelection("Ravenclaw")} style={ravenclawStyle}>
          </div>
          <div className="Hufflepuff shield-button" onClick={() => this.addToPlayerSelection("Hufflepuff")} style={hufflepuffStyle}>
          </div>
        </div>
        {/* boutons de confirmation */}
        {this.clearButton()}
        {this.playerConfirmation()}
        {this.hideUnselectedHouse()}
      </body>

    );
  }
}

export default HouseSelection;
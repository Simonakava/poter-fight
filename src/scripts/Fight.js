import React, { Component } from 'react';
import Fighter from './Fighter';
import Spell from './Spell';
import Header from './Header';
import Instructions from './Instructions'
import './Fight.css';
import VictoryMessage from "./VictoryMessage"
import TournementVictory from "./TournementVictory"
import Wall from "./wallFight.js"
//import ReactDOM from 'react-dom';
import Shield from "./Shield.js"
import { Redirect } from 'react-router'
// import { Link } from "react-router-dom"



import GryffindorShield from '../image/gryffindor.png'
import SlytherinShield from '../image/slytherin.png'
import RavenclawShield from '../image/ravenclaw.png'
import HufflepuffShield from '../image/hufflepuff.png'

import spellSound from '../sound/attackSound.wav'
import shieldSound from '../sound/defenseSound.mp3'
import deathSound from '../sound/ScreamAndDie.wav'


class Fight extends Component {

    constructor() {
        super();

        this.welcomeFight = this.welcomeFight.bind(this)
        this.spellSound = new Audio(spellSound);
        this.shieldSound = new Audio(shieldSound);
        this.deathSound = new Audio(deathSound);

        // eslint-disable-next-line no-unused-expressions
        this.houseStyles = {
            Gryffindor: {
                shield: GryffindorShield,
                barColor: "#BA2732",
            },
            Slytherin: {
                shield: SlytherinShield,
                barColor: "#2A612B",
            },
            Ravenclaw: {
                shield: RavenclawShield,
                barColor: "#3A519A",
            },
            Hufflepuff: {
                shield: HufflepuffShield,
                barColor: "#F9E569",
            },
        },
            this.state = {

                startGame: false,
                seconds: 3,
                messageStart: false,

                redirect: false,

                fightTime: {
                    minutes: 2,
                    seconds: 0,
                },

                //Instructions Screen
                displayInstr: false,
                keyInstr: 66,
                turn: 1,

                //Avatar 1
                progressAttack1: 100,
                progress: 100,
                leftavatar: 5,
                topavatar: 5,
                heightavatar: 130,
                widthavatar: 130,
                borderradius: 50,
                scoreFighter1: 0,


                //Avatar 2
                progressAttack2: 100,
                progress1: 100,
                righttavatar1: 5,
                topavatar1: 5,
                heightavatar1: 130,
                widthavatar1: 130,
                borderradius1: 50,
                scoreFighter2: 0,

                //turn:this.props.turn,

                fighter1: {
                    id: "fighter1",
                    spellCasted: false,
                    deathFighter: false, //Affichage de la mort
                    rotation: 0,
                    facesRight: true,
                    top: 250,
                    left: 100,
                    life: 100,
                    width: 160,
                    height: 120,
                    attack: "w",      // Attaque: w
                    defend: "q",    // Défense: q
                    rotate: "a",     // Rotate: a
                    moveUp: "e",         // Up: e
                    moveDown: "d",      // Down: d
                    moveLeft: "s",        // Left: s
                    moveRight: "f",       // Right: f
                    house: "Slytherin",
                    //house: this.props.fightersHouse[0],
                    //house:this.getCurrentFighters()[0],
                    castSpell: this.castSpell,
                    move: this.move,
                    rotateFighter: this.rotate,
                    takeOutShield: this.takeOutShield,
                    defense: {
                        shieldOn: false,
                        shieldNumber: 3,
                        shieldTime: 3000,
                    },
                    touched: false
                },
                fighter2: {
                    id: "fighter2",
                    spellCasted: false,
                    deathFighter: false, // Affichage de la Mort
                    rotation: 180,
                    facesRight: false,
                    top: 250,
                    left: 1300,
                    life: 100,
                    width: 160,
                    height: 120,
                    attack: "!",                 // Attaque: ! 
                    defend: "m",               // Défense: m
                    rotate: "p",                // Rotate: p
                    moveUp: "ArrowUp",                 // Up: Flèche du haut
                    moveDown: "ArrowDown",               // Down: Flèche du bas
                    moveLeft: "ArrowLeft",               // Left: Flèche de gauche
                    moveRight: "ArrowRight",              // Right: Flèche de droite
                    house: "Gryffindor",
                    allCharacteristics: this.fighterAndSpellCallback,
                    castSpell: this.castSpell,
                    move: this.move,
                    rotateFighter: this.rotate,
                    takeOutShield: this.takeOutShield,
                    defense: {
                        shieldOn: false,
                        shieldNumber: 3,
                        shieldTime: 3000,
                    },
                    touched: false
                },
                spellfighter1: {
                    left: 0,
                    top: 0,
                    height: 15,
                    width: 15,
                    direction: 10,
                    id: "",
                },
                spellfighter2: {
                    left: 0,
                    top: 0,
                    height: 15,
                    width: 15,
                    direction: -1,
                    id: "",
                },
                modalVictory: false,
                
                ///////////PLAYERS
                scoreFighters: {
                    Gryffindor: 0,
                    Slytherin: 0,
                    Ravenclaw: 0,
                    Hufflepuff: 0,
                },


            }
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.victoryHouse = '';
    }



    progressBar = (progress) => {
        return <div className="progressbar">
            <div className="progress" style={{
                width: progress + '%',
                backgroundColor: this.houseStyles[this.state.fighter1.house].barColor
            }}>
            </div>
        </div>
    }

    progressBar1 = (progress1) => {
        return <div className="progressbar1">
            <div className="progress1" style={{
                //width: `${progress1}%`,
                width: progress1 + '%',
                backgroundColor: this.houseStyles[this.state.fighter2.house].barColor
            }}>
            </div>
        </div>
    }

    castSpell = (fighterID, facesRight) => {
        let spellID = "spell" + fighterID
        let x = facesRight ? 190 : -30;
        // Apparition du spell
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                spellCasted: true,
            }
        })
        this.setState({
            [spellID]: {
                ...this.state[spellID],
                left: this.state[fighterID].left + x,
                top: this.state[fighterID].top + 35,
                direction: x / Math.abs(x)
            }
        })
        // Spell movement
        let spellIntervall = setInterval(() => {
            if (!this.state.displayInstr) {
                this.setState({
                    [spellID]: {
                        ...this.state[spellID],
                        left: this.state[spellID].left + 10 * this.state[spellID].direction,
                    }
                })
            }
        }, 10)


        // Destruction of spell
        setTimeout(
            function () {
                clearInterval(spellIntervall);
                this.setState({
                    [fighterID]: {
                        ...this.state[fighterID],
                        spellCasted: false,
                    },
                });
            }
                .bind(this),
            2000
        );
        this.spellSound.play();
        this.spellSound.volume = this.props.soundEffect.effectsVolume;
    }

    move = (fighterID, x, y) => {
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                top: this.state[fighterID].top + x,
                left: this.state[fighterID].left + y,
            }
        })
    }

    rotate = (fighterID) => {
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                rotation: this.state[fighterID].rotation - 180,
                facesRight: !this.state[fighterID].facesRight,
            }
        })
    }

    // Wizard shield function
    takeOutShield = (fighterID) => {
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                defense: {
                    ...this.state[fighterID].defense,
                    shieldOn: true,
                    shieldNumber: this.state[fighterID].defense.shieldNumber - 1,
                },
            }
        })
        setTimeout(
            function () {
                this.setState({
                    [fighterID]: {
                        ...this.state[fighterID],
                        defense: {
                            ...this.state[fighterID].defense,
                            shieldOn: false,
                        },
                    }
                })
            }
                .bind(this),
            this.state[fighterID].defense.shieldTime
        );
        this.shieldSound.play();
        this.shieldSound.volume = this.props.soundEffect.effectsVolume;
    }

    hasCollision(object1, object2) {
        if (this.state.modalVictory === false)
            if (object1.top < object2.top + object2.width &&
                object1.top + object1.width > object2.top &&
                object1.left < object2.left + object2.height &&
                object1.height + object1.left > object2.left) {
                return true
            }
            else {
                return false
            };
    };


    //Instructions Screen>>>>>>>>>>>>>>>>>>
    handleKeyPress(event) {
        if (event.key === "Escape") {
            this.Instr()
        }
    }
    Instr = () => {
        this.setState({ displayInstr: !this.state.displayInstr })
    }



    // Fighters selection depending on turn and number of players
    getCurrentFighters = (turn) => {
        let i = 0;
        let j = 1;

        switch (this.props.fightersHouse.length) {
            case 3:
                switch (turn) {
                    case 1: { i = 0; j = 1 }; break;
                    case 2: { i = 1; j = 2 }; break;
                    case 3: { i = 0; j = 2 }; break;
                };

                break;
            case 4:
                switch (turn) {
                    case 1: { i = 0; j = 1 }; break;
                    case 2: { i = 2; j = 3 }; break;
                    case 3: { i = 0; j = 2 }; break;
                    case 4: { i = 1; j = 3 }; break;
                    case 5: { i = 0; j = 3 }; break;
                    case 6: { i = 1; j = 2 }; break;
                    //case 7: { this.setState({ redirect: !this.state.redirect}) }; break;
                };

                break;
            //default: { i = 0; j = 1 }; break;
        }

        this.setState({
            fighter1: {
                ...this.state.fighter1,
                life: 100,
                left: 250,
                top: 250,
                house: this.props.fightersHouse[i],
                deathFighter: false,
                style: {
                    opacity: 1,
                },
                defense: {
                    shieldTime: 3000,
                    shieldOn: false,
                    shieldNumber: 3,
                }
            },
            fighter2: {
                ...this.state.fighter2,
                life: 100,
                left: 1400,
                top: 250,
                house: this.props.fightersHouse[j],
                deathFighter: false,
                style: {
                    opacity: 1,
                },
                defense: {
                    shieldTime: 3000,
                    shieldOn: false,
                    shieldNumber: 3,
                }
            },
            spellfighter1: {
                ...this.state.spellfighter1,
                id: "spell" + this.props.fightersHouse[i],
            },
            spellfighter2: {
                ...this.state.spellfighter2,
                id: "spell" + this.props.fightersHouse[j],
            },
            progress: 100,
            progress1: 100,
            modalVictory: false,
            startGame: true,
            turn: turn,
            //Initialisation des scoreFighter à 0
            scoreFighter1: 0,
            scoreFighter2: 0,
            fightTime: {
                minutes: 2,
                seconds: 0,
            },
        })

    }


    componentDidMount = () => {

        this.timer = setInterval(this.welcomeFight, 1000);

        this.getCurrentFighters(1);
        setInterval(() => {
            let currentState1 = this.state.progress;
            let currentState2 = this.state.progress1;

            // Collision detection between a spell and a shield
            if (this.state.fighter1.defense.shieldOn) {
                if (this.hasCollision(this.state.spellfighter2, this.state.fighter1)) {
                    this.hitsShield("spellfighter2", "fighter2");
                }
            }
            if (this.state.fighter2.defense.shieldOn) {
                if (this.hasCollision(this.state.spellfighter1, this.state.fighter2)) {
                    this.hitsShield("spellfighter1", "fighter1");
                }
            }

            if (this.hasCollision(this.state.spellfighter1, this.state.fighter2)) {
                //window.alert("COLLISIOOOOOOOOOOOOOOOOOOOOOON")
                //this.loseLife(fighter2.id)
                this.setState({
                    fighter2: {
                        ...this.state.fighter2,
                        touched: true
                    },
                    progress1: currentState2 - 20,
                    fighter1: {
                        ...this.state.fighter1,
                        spellCasted: false,
                    },
                    spellfighter1: {
                        ...this.state.spellfighter1,
                        top: 0,
                        left: 0,
                    }
                })
                setTimeout(
                    function () {
                        this.setState({
                            fighter2: {
                                ...this.state.fighter2,
                                touched: false
                            }
                        })
                    }.bind(this), 250
                )

                ////JE PENSE QUON  PEUT LE VIRER
                //this.deathOfAPlayer(fighter2.id)
                if (this.state.progress === 0) {
                    this.setState({
                        scoreFighter2: this.state.scoreFighter2 + currentState2,
                        progress: -1,
                        modalVictory: true,


                    });


                    switch (this.state.fighter2.house) {
                        case "Gryffindor": this.state.scoreFighters.Gryffindor += this.state.scoreFighter2; break;
                        case "Slytherin": this.state.scoreFighters.Slytherin += this.state.scoreFighter2; break;
                        case "Ravenclaw": this.state.scoreFighters.Ravenclaw += this.state.scoreFighter2; break;
                        case "Hufflepuff": this.state.scoreFighters.Hufflepuff += this.state.scoreFighter2; break;
                    }
                }


                if (this.state.progress1 === 0) {
                    this.setState({
                        scoreFighter1: this.state.scoreFighter1 + currentState1,
                        progress1: - 1,
                        modalVictory: true,
                        // Affichage de la mort
                        fighter2: {
                            ...this.state.fighter2,
                            deathFighter: true
                        }
                        
                    });
                    this.deathSound.play();
                    this.deathSound.volume = this.props.soundEffect.effectsVolume;
                    

                    this.victoryHouse = this.state.fighter1.house;


                    switch (this.state.fighter1.house) {
                        case "Gryffindor": this.state.scoreFighters.Gryffindor += this.state.scoreFighter1; break;
                        case "Slytherin": this.state.scoreFighters.Slytherin += this.state.scoreFighter1; break;
                        case "Ravenclaw": this.state.scoreFighters.Ravenclaw += this.state.scoreFighter1; break;
                        case "Hufflepuff": this.state.scoreFighters.Hufflepuff += this.state.scoreFighter1; break;
                    }

                }
            }
            if (this.hasCollision(this.state.spellfighter2, this.state.fighter1)) {
                //this.loseLife(fighter1.id)
                //window.alert("COLLISIOOOOOOOOOOOOOOOOOOOOOON")
                this.setState({
                    fighter1: {
                        ...this.state.fighter1,
                        touched: true
                    },
                    progress: currentState1 - 20,
                    fighter2: {
                        ...this.state.fighter2,
                        spellCasted: false,
                    },
                    spellfighter2: {
                        ...this.state.spellfighter2,
                        top: 0,
                        left: 0,
                    }
                })
                setTimeout(
                    function () {
                        this.setState({
                            fighter1: {
                                ...this.state.fighter1,
                                touched: false
                            }
                        })
                    }.bind(this), 250
                )

                //this.deathOfAPlayer(fighter1.id)
                if (this.state.progress === 0) {
                    this.setState({
                        scoreFighter2: this.state.scoreFighter2 + currentState2,
                        progress: - 1,
                        modalVictory: true,
                        //Affichage de la mort
                        fighter1: {
                            ...this.state.fighter1,
                            deathFighter: true
                        }

                    });
                    this.deathSound.play();
                    this.deathSound.volume = this.props.soundEffect.effectsVolume

                    this.victoryHouse = this.state.fighter2.house;
                    switch (this.state.fighter2.house) {

                        case "Gryffindor": this.state.scoreFighters.Gryffindor += this.state.scoreFighter2; break;
                        case "Slytherin": this.state.scoreFighters.Slytherin += this.state.scoreFighter2; break;
                        case "Ravenclaw": this.state.scoreFighters.Ravenclaw += this.state.scoreFighter2; break;
                        case "Hufflepuff": this.state.scoreFighters.Hufflepuff += this.state.scoreFighter2; break
                    }
                }
                if (this.state.progress1 === 0) {
                    this.setState({
                        scoreFighter1: this.state.scoreFighter1 + currentState1,
                        progress1: - 1,
                        modalVictory: true,
                        deathFighter: true, // Affichage de la mort
                    });
                    this.deathSound.play();
                    this.deathSound.volume = this.props.soundEffect.effectsVolume

                    switch (this.state.fighter1.house) {
                        case "Gryffindor": this.state.scoreFighters.Gryffindor += this.state.scoreFighter1; break;
                        case "Slytherin": this.state.scoreFighters.Slytherin += this.state.scoreFighter1; break;
                        case "Ravenclaw": this.state.scoreFighters.Ravenclaw += this.state.scoreFighter1; break;
                        case "Hufflepuff": this.state.scoreFighters.Hufflepuff += this.state.scoreFighter1; break;
                    }
                }
            }
        }, 10)
        document.addEventListener("keydown", this.handleKeyPress)


    }

    welcomeFight = () => {

        this.conditionDecount()
        this.letsFight()
    }

    conditionDecount = () => {

        if (this.state.seconds <= 1) {
            clearInterval(this.timer);
            this.setState({
                messageStart: true,
                seconds: null,
                fightTime: {
                    minutes: 2,
                    seconds: 0,
                },
            });
        }

        if (this.state.seconds > 1) {
            this.setState({
                seconds: this.state.seconds - 1
            })
        }


    }

    letsFight = () => {
        setTimeout(
            function () {
            //    clearInterval(this.timer);
                this.setState({
                    startGame: false,
                    seconds: 4,
                    messageStart: false,
                })
            }
                .bind(this),
            3500);
    }

    //loseLife(fighterID){}

    addScores = () => {
        switch (this.state.fighter1.house) {
            case "Gryffindor": this.state.scoreFighters.Gryffindor += this.state.scoreFighter1; break;
            case "Slytherin": this.state.scoreFighters.Slytherin += this.state.scoreFighter1; break;
            case "Ravenclaw": this.state.scoreFighters.Ravenclaw += this.state.scoreFighter1; break;
            case "Hufflepuff": this.state.scoreFighters.Hufflepuff += this.state.scoreFighter1; break;
        }
        switch (this.state.fighter2.house) {
            case "Gryffindor": this.state.scoreFighters.Gryffindor += this.state.scoreFighter2; break;
            case "Slytherin": this.state.scoreFighters.Slytherin += this.state.scoreFighter2; break;
            case "Ravenclaw": this.state.scoreFighters.Ravenclaw += this.state.scoreFighter2; break;
            case "Hufflepuff": this.state.scoreFighters.Hufflepuff += this.state.scoreFighter2; break;
        }
    }

    endOfFight = () => {
        this.setState({
            scoreFighter1: this.state.scoreFighter1 + this.state.progress,
            scoreFighter2: this.state.scoreFighter2 + this.state.progress1,
            progress1: - 1,
            modalVictory: true,
        });
        this.addScores()
    }

    // Consequence of a shield being hitten
    hitsShield(spellID, fighterID) {
        this.setState({
            [spellID]: {
                ...this.state[spellID],
                left: 0,
                top: 0,
            },
            [fighterID]: {
                ...this.state[fighterID],
                spellCasted: false,
            }

        })
    }

    restartFight = () => {

        this.reIntitialize(this.state.fighter1.id, 100, true, false);
        this.reIntitialize(this.state.fighter2.id, 1100, false, false);
        this.setState({
            progress: 100,
            progress1: 100,
            modalVictory: false,
            /* fightTime: {
                minutes: 2,
                seconds: 0,
            }, */
        })

    }

    reIntitialize = (fighterID, leftPosition, newFacePosition, notDead) => {
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                life: 100,
                spellCasted: false,
                deathFighter: notDead,// Affichage de la mort
                top: 250,
                left: leftPosition,
                facesRight: newFacePosition,
                defense: {
                    shieldOn: false,
                    shieldNumber: 3,
                    shieldTime: 3000,
                }
            },
        })
    }

    nextFight = (turn, seconds) => {
        this.setState({
            seconds: 4,
        })
        this.timer = setInterval(this.welcomeFight, 1000);
        this.getCurrentFighters(turn);

        this.welcomeFight(seconds)
        //mettre le setstate en bas
    }

    redirect = () => {
        if (this.state.modalVictory === true && this.state.turn === 3 && this.props.fightersHouse.length === 3) {
            this.props.endTournament(this.state.scoreFighters)
            this.addScores()
            return <Redirect to='/TournementVictory' />
        }
        if (this.state.modalVictory === true && this.state.turn === 6 && this.props.fightersHouse.length === 4) {
            this.props.endTournament(this.state.scoreFighters)
            this.addScores()
            return <Redirect to='/TournementVictory' />
        }
    }


    //redirect = () => this.state.redirect ? <Redirect to='/TournementVictory' /> : ""
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/TournementVictory' />;
        }

        let avatarStyle = {
            position: "absolute",
            top: this.state.topavatar + "px",
            left: this.state.leftavatar + "px",
            width: this.state.widthavatar + "px",
            height: this.state.heightavatar + "px",
            backgroundImage: `url(${this.houseStyles[this.state.fighter1.house].shield})`,
            backgroundPosition: "right",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        }

        let avatarId = "avatar" + this.props.house

        let avatarStyle1 = {
            position: "absolute",
            top: this.state.topavatar1 + "px",
            right: this.state.righttavatar1 + "px",
            width: this.state.widthavatar1 + "px",
            height: this.state.heightavatar1 + "px",
            backgroundImage: `url(${this.houseStyles[this.state.fighter2.house].shield})`,
            backgrounPosition: "left",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
        }
        let avatarId1 = "avatar" + this.props.house

        let instrStyle = {
            position: "absolute",
            bottom: "20px",
            color: "white",
            right: "20px",
            width: 150 + "px",
            margin: "auto",
            border: 3 + "px" + " " + "solid" + " " + "white",
            lineHeight: 2 + "px",
            opacity: 0.8,
            fontSize: "25px",
        }

        let gri = 'Gryffindor: ' + this.state.scoreFighters.Gryffindor
        let sly = 'Slytherin: ' + this.state.scoreFighters.Slytherin
        let rav = 'Ravenclaw: ' + this.state.scoreFighters.Ravenclaw
        let huf = 'Hufflepuff: ' + this.state.scoreFighters.Hufflepuff



        let grifStyle = {
            backgroundColor: "#BA2732"
        }

        let sylStyle = {
            backgroundColor: "#2A612B"
        }

        let ravStyle = {
            backgroundColor: "#3A519A"
        }

        let hufStyle = {
            backgroundColor: "#F9E569"
        }

        return (

            <div>
                <div>
                    <Wall 
                        turn={this.state.turn}
                    />
                </div>
                <div id="bodyFight">
                    <div className="full">
                        {this.redirect()}
                        <Header
                            fighter1={this.state.fighter1}
                            fighter2={this.state.fighter2}
                            startGame={this.state.startGame}
                            fightTime={this.state.fightTime}
                            endOfFight={this.endOfFight}
                            modalVictory={this.state.modalVictory}
                            displayInstr={this.state.displayInstr}
                        />
                        <div className="avatar" id={avatarId} style={avatarStyle}></div>
                        {this.progressBar(this.state.progress)}

                        <div className="avatar1" id={avatarId1} style={avatarStyle1}></div>
                        {this.progressBar1(this.state.progress1)}
                    </div>
                    <div style={{zIndex:-1,}}>
                        <Fighter                // Player#1
                            fighter={this.state.fighter1}
                            victory={this.state.modalVictory}
                            displayInstr={this.state.displayInstr}
                            startGame={this.state.startGame}
                        />
                    </div>
                    <div style={{zIndex:-1,}}>
                        <Fighter                // Player#2
                            fighter={this.state.fighter2}
                            victory={this.state.modalVictory}
                            displayInstr={this.state.displayInstr}
                            startGame={this.state.startGame}
                        />
                    </div>
                    <div>{
                        this.state.fighter1.spellCasted ?
                            <Spell
                                spell={this.state.spellfighter1}
                            />
                            :
                            <div></div>
                    }</div>
                    <div>{
                        this.state.fighter2.spellCasted ?
                            <Spell
                                spell={this.state.spellfighter2}
                            />
                            :
                            <div></div>
                    }</div>
                    <div>{
                        this.state.fighter1.defense.shieldOn ?
                            <Shield
                                fighter={this.state.fighter1}
                            />
                            :
                            <div></div>
                    }</div>
                    <div>{
                        this.state.fighter2.defense.shieldOn ?
                            <Shield
                                fighter={this.state.fighter2}
                            />
                            :
                            <div></div>
                    }</div>

                    <div>{
                        this.state.startGame ?
                            <div className="beginFight">
                                {!this.state.messageStart ? <h1 className="titleBegin">{this.state.fighter1.house} vs {this.state.fighter2.house}</h1>:<div></div>}
                                <h1 className="decount">{this.state.seconds}</h1>{
                                    this.state.messageStart ?
                                        <h1 className="decount">Fight !</h1>
                                        :
                                        <h1></h1>
                                }
                            </div>
                            :
                            <div></div>
                    }</div>

                    <div>
                        <div className="spaceInstr" style={instrStyle}>
                            <p>Press ESCAPE</p>
                            <p>for Instructions</p>                            
                        </div>
                        {
                            this.state.displayInstr && !this.state.modalVictory ?
                                <Instructions />
                                :
                                <div></div>
                        }
                    </div>

                    <div className="score">
                        {/* <h2 className="scorePerso" style={grifStyle}>{ordered}</h2> */}
                        <p className="scorePerso" style={grifStyle}>{gri}</p>
                        <p className="scorePerso" style={sylStyle}>{sly}</p>
                        <p className="scorePerso" style={hufStyle}>{huf}</p>
                        <p className="scorePerso" style={ravStyle}>{rav}</p>
                    </div>

                    <div style={{zIndex:10,}}>{
                        this.state.modalVictory ?
                            <VictoryMessage
                                getCurrentFighters={this.getCurrentFighters}
                                turn={this.state.turn}
                                getCurrentFighter={this.getCurrentFighters}
                                turn={this.state.turn}
                                nextFight={this.nextFight}
                                restartFight={this.restartFight}
                                gameType={this.props.gameType}
                                winningHouse={this.victoryHouse}
                            />
                            :
                            <div></div>
                    }</div>

                </div>

            </div>
        );
    }
}

export default Fight;
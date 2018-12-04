import React, { Component } from "react";
import "./TournementVictory.css";
import { Link } from "react-router-dom";


import gryffindorTeam from '../image/gryffindor.png'
import slytherinTeam from '../image/slytherin.png'
import ravenclawTeam from '../image/ravenclaw.png'
import hufflepuffTeam from '../image/hufflepuff.png'


class TournementVictory extends Component {
    constructor(props) {
        super(props);
        this.Gryffindor = gryffindorTeam;
        this.Slytherin = slytherinTeam;
        this.Ravenclaw = ravenclawTeam;
        this.Hufflepuff = hufflepuffTeam;

        this.state = {
            score: this.props.isEndTournament
        }

    }

    rankHouses() {
        let score = this.state.score
        let houseSort = [];
        for (let key in score) {
            houseSort.push([key, score[key]]);
        }
        houseSort.sort(function (a, b) {
            return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0))
        });
        let first = houseSort[houseSort.length - 1]
        let second = houseSort[houseSort.length - 2]
        let third = houseSort[houseSort.length - 3]
        let style1 = { backgroundImage: `url(${this[first[0]]})` }
        let style2 = { backgroundImage: `url(${this[second[0]]})` }
        let style3 = { backgroundImage: `url(${this[third[0]]})` }
        return <div>
            <div className="fullScore">
                <div className="skore two">{second[1]} pts</div>
                <div className="skore one">{first[1]} pts</div>
                <div className="skore three">{third[1]} pts</div>
            </div>

            <div className="award" id="firstAward" style={style1}></div>
            <div className="award" id="secondAward" style={style2}></div>
            <div className="award" id="thirdAward" style={style3}></div>
        </div >

    }




    render() {



        return (
            <div>
                <body className="bodyTournementVictory">
                    <p className="titleWinners"> WINNERS </p>
                    <div className="gobleoffireimage"></div>
                    <Link to="/"><button className="boutonTournementHomePage">Home Page</button></Link>
                    <div className="boutonPodium"></div>
                    {this.rankHouses()}
                </body>
            </div>

        );
    }

}
export default TournementVictory;
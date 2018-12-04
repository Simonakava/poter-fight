import React, { Component } from "react"
import './Instructions.css'



class Instructions extends Component {
    render() {


        return (
                <div className="keyboardLayout" >
                    <div className="container">
                        <div className="image1"></div>
                        <div className="image2"></div>
                    </div>
                    <div className="container2">
                        <table>
                            <tr>
                                <th></th>
                                <td>E</td>
                            </tr>
                            <tr>
                                <td>S</td>
                                <td>D</td>
                                <td>F</td>
                            </tr>
                        </table>
                        <span>MOVE</span>
                        <table>
                            <tr>
                                <th></th>
                                <th>↑</th>
                            </tr>
                            <tr>
                                <td>←</td>
                                <td>↓</td>
                                <td>→</td>
                            </tr>
                        </table>
                    </div>
                    <div className="container3">
                        <p>A</p>
                        <span>ROTATE</span>
                        <p>P</p>
                    </div>
                    <div className="container5">
                        <p>Q</p>
                        <span>DEFEND</span>
                        <p>M</p>
                    </div>
                    <div className="container4">
                        <p>W</p>
                        <span>ATTACK</span>
                        <p>!</p>
                    </div>
                </div>
        )
    }
}

export default Instructions
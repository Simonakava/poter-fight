import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: this.props.fightTime.minutes,
            seconds: this.props.fightTime.seconds,
            timer: "0" + this.props.fightTime.minutes + ":0" + this.props.fightTime.seconds
        };
    }

    componentDidMount = () => {

        let timerInterval = setInterval(() => {
            if (!this.props.displayInstr && !this.props.modalVictory && !this.props.startGame) {
                if (this.state.seconds === 0) {
                    this.setState({
                        minutes: this.state.minutes - 1,
                        seconds: 59
                    })
                }
                else {
                    this.setState({
                        seconds: this.state.seconds - 1,
                    })
                }

                this.setState({
                    timer: this.state.seconds > 9 ? "0" + this.state.minutes + ":" + this.state.seconds : "0" + this.state.minutes + ":0" + this.state.seconds
                })

                if (this.state.minutes === 0 && this.state.seconds === 0) {
                    clearInterval(timerInterval);
                    this.props.endOfFight();
                }
            }
        }, 1000);
    }


    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.fightTime !== this.props.fightTime) {
            this.setState({
                minutes: this.props.fightTime.minutes,
                seconds: this.props.fightTime.seconds,
                timer: "0" + this.props.fightTime.minutes + ":0" + this.props.fightTime.seconds
            });
        }
    }

    render() {
        let timerStyle = {
            position : "absolute",
            top : "10px",
            left : window.innerWidth/2*0.92+"px",
            padding : "10px",
            border : "1px solid #717171",
            backgroundColor:"#717171",
            color:"rgb(252, 222, 53)",
            width: "100px",
            textAlign : "center",
            fontSize : "20px",
            borderRadius: "15px",
        }

        return (
            <div style={timerStyle}>
                {this.state.timer}
            </div>
        );
    }
}

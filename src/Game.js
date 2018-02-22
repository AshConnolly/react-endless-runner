import React, { Component } from 'react';

let fps = 1/30;

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animating: true,
            distance: 0,
            score: 0,
            bgOffset: 0,
            bagOffset: 0,
        };
    
        // this.gamePause = this.gamePause.bind(this);
        this.gamePauseChanger = this.gamePauseChanger.bind(this);
        this.moveBackground = this.moveBackground.bind(this);
    }

    
    animateElements() {
 
    }

    // generate bags
    bagGenerator() {}

    gamePauseChanger(option){
        console.log('gamePauseChanger option:', option)
        if (option === 'stop') { this.setState({animating : false}) }
        if (option === 'start') { this.setState({animating : true}) }
    }

    componentDidMount(){
        this.moveBackground();
    }

    moveBackground() {
        if (this.state.animating === true) {
            setInterval(() => {
                if (this.state.animating === true) {
                let currentXpos = this.state.bgOffset;
                this.setState({ bgOffset: currentXpos + 1 })
                }
            }, fps);
        }
    }

    render() {
        let bgStyles = {
            transform: 'translateX(-' + this.state.bgOffset + 'px) translateY(-100%)'
        }

        return (
            <div className="l-game-wrapper">
                <div className="c-ui-buttons">
                    <button onClick={() => this.gamePauseChanger('stop')}>stop</button>
                    <button onClick={() => this.gamePauseChanger('start')}>start</button>
                </div>

                <div className="c-data">
                    <p>a: {this.state.animating}</p>
                    <p>d: {this.state.distance}</p>
                    <p>s: {this.state.score}</p>
                    <p>bg: {this.state.bgOffset}</p>
                    <p>bag: {this.state.bagOffset}</p>
                </div>

                <div className="c-player"></div>
                <div className="c-bag"></div>
                <div className="c-floor"></div>
                <div className="c-bg" style={bgStyles}>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                </div>

            </div>
        );
    }
}

export default Game;

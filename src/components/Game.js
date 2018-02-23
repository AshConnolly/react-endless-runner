import React, { Component } from 'react';

let fps = 1/60;

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            distance: 0,
            score: 0,
            bgOffset: 0,
            itemOffset: 0,
        };
    
        this.pauseGame = this.pauseGame.bind(this);
        this.animateElements = this.animateElements.bind(this);
    }

    // itemGenerator() {}

    pauseGame(option){
        // make into toggle
        if (this.state.isPlaying === false ) { this.setState({isPlaying : true}) } 
        else if (this.state.isPlaying === true) { this.setState({isPlaying : false}) }
        // if (this.state.isPlaying === false) { this.setState({isPlaying : true}) }
        // if (this.state.isPlaying === true) { this.setState({isPlaying : false}) }
    }

    animateElements() {
        let animationTimer = setInterval(() => {
            if (this.state.isPlaying === true) {
                if (this.state.bgOffset >= 130 ) {
                    this.setState({ bgOffset: 0 }) 
                } else {
                    this.setState({ bgOffset: this.state.bgOffset + 1 })
                }
            } else {
                clearInterval(this.animationTimer);
            }
        }, fps);
    }

    componentDidMount() {
        this.animateElements();
    }

    render() {
        let bgStyles = {transform: 'translateX(-' + this.state.bgOffset + 'px)'}
    
        return (
            <div className="l-game-wrapper">
                <div className="c-ui-buttons">
                    <button onClick={this.pauseGame}>start/stop</button>
                </div>

                <div className="c-player"></div>
                <div className="c-item"></div>
                <div className="c-floor"></div>
                <div className="c-bg" style={bgStyles}>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                    <div className="c-bg__elem"></div>
                </div>

                <div className="c-data">
                    <p>a: {this.state.isPlaying === true ? 'true' : 'false'}</p>
                    <p>d: {this.state.distance}</p>
                    <p>s: {this.state.score}</p>
                    <p>bg: {this.state.bgOffset}</p>
                    <p>item: {this.state.itemOffset}</p>
                </div>


            </div>
        );
    }
}

export default Game;

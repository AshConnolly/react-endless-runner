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
    
        this.pause = this.pause.bind(this);
        this.animateElements = this.animateElements.bind(this);
    }

    // generate items
    itemGenerator() {}

    pause(){
        if (this.state.isPlaying === true) { this.setState({isPlaying : false}) }
        if (this.state.isPlaying === false) { this.setState({isPlaying : true}) }
        this.animateElements();
    }

    animateElements() {
        // if (this.state.isPlaying === true) {
        //     let currentXpos = this.state.bgOffset;
        //     this.setState({ bgOffset: currentXpos + 100 })
        // } 
        let animationTimer = setInterval(() => {
            if (this.state.isPlaying === true) {
                let currentXpos = this.state.bgOffset;
                this.setState({ bgOffset: currentXpos + 1 })
            }
        }, fps);
        if (this.state.isPlaying === true) {
            animationTimer;
        } else {
            clearInterval(animationTimer);
        }
    }


    render() {
        let bgStyles = {transform: 'translateX(-' + this.state.bgOffset + 'px)'}
    
        return (
            <div className="l-game-wrapper">
                <div className="c-ui-buttons">
                    <button onClick={this.pause}>stop/start</button>
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

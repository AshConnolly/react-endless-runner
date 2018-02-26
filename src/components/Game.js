import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let fps = 1/60;
let animationFrameStatus;

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

    getBounds(ref) {
        return ReactDOM.findDOMNode(ref).getBoundingClientRect();
    }


   pauseGame(option){
        if (this.state.isPlaying === false ) { this.setState({isPlaying : true}) } 
        else { this.setState({isPlaying : false}) }
        ReactDOM.findDOMNode(this.refs.player).getBoundingClientRect();

    }

    animateElements() {

        function detectCollision(a, b) {
            console.log()
            return !(
                ((a.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width))
            );
        }

        let animationTimer = setInterval(() => {
            if (this.state.isPlaying === true) {
                if (this.state.bgOffset >= 130 ) {
                    this.setState({ bgOffset: 0 }) 
                } else {
                    this.setState({ bgOffset: this.state.bgOffset + 0.5 })
                }
                
                // console.log('player', this.getBounds(this.refs.player)); 
                // console.log('item', this.getBounds(this.refs.item)); 

                var test = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.refs.item));
                console.log(test);

                this.setState({ itemOffset: this.state.itemOffset + 0.7 })
                this.setState({ distance: this.state.distance + 0.01 })
                
            } else {
                clearInterval(this.animationTimer);
            }
        }, fps);
    }

    componentDidMount() {
        this.animateElements();
        console.log('player', this.getBounds(this.refs.player)); 
        console.log('item', this.getBounds(this.refs.item)); 
    }
    

    // pauseGame(option){
    //     if (this.state.isPlaying === false ) { 
    //         this.setState({isPlaying : true}) 
    //         this.animationFrameStatus = requestAnimationFrame(this.animateElements)
    //     } else { 
    //         this.setState({isPlaying : false}) 
    //         this.animationFrameStatus = cancelAnimationFrame(this.animateElements)
    //     }
    // }


    // animateElements() {
    //     if (this.state.isPlaying === true) {
    //         if (this.state.bgOffset >= 130 ) {
    //             this.setState({ bgOffset: 0 }) 
    //         } else {
    //             this.setState({ bgOffset: this.state.bgOffset + 0.5 })
    //         }
    //         this.setState({ itemOffset: this.state.itemOffset + 0.7 })
    //         this.setState({ distance: this.state.distance + 0.01 })
    //     }

    //     animationFrameStatus = requestAnimationFrame(this.animateElements);
    // }

    // componentDidMount() {
    // }

    render() {
        let bgStyles = {transform: 'translateX(-' + this.state.bgOffset + 'px)'}
        let itemStyles = {transform: 'translateX(-' + this.state.itemOffset + 'px)'}
    
        return (
            <div className="l-game-wrapper">
                <div className="c-ui-buttons">
                    <button onClick={this.pauseGame}>start/stop</button>
                </div>

                <div className="c-player" ref="player"></div>
                <div className="c-item" ref="item" style={itemStyles}></div>
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

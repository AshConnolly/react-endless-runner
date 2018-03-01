import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let fps = 1/60;
let animationFrameStatus;
let jumpDuration = 1000;

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            isJumping: false,
            gameSpeed: 5,
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


   // pauseGame(option){
   //      if (this.state.isPlaying === false ) { this.setState({isPlaying : true}) } 
   //      else { this.setState({isPlaying : false}) }
   //      ReactDOM.findDOMNode(this.refs.player).getBoundingClientRect();

   //  }

   //  animateElements() {

   //      function detectCollision(a, b) {
   //          console.log()
   //          return !(
   //              ((a.y + a.height) < (b.y)) ||
   //              (a.y > (b.y + b.height)) ||
   //              ((a.x + a.width) < b.x) ||
   //              (a.x > (b.x + b.width))
   //          );
   //      }

   //      let animationTimer = setInterval(() => {
   //          if (this.state.isPlaying === true) {
   //              if (this.state.bgOffset >= 130 ) {
   //                  this.setState({ bgOffset: 0 }) 
   //              } else {
   //                  this.setState({ bgOffset: this.state.bgOffset + 0.5 })
   //              }
                
   //              this.setState({ itemOffset: this.state.itemOffset + 0.7 })
   //              this.setState({ distance: this.state.distance + 0.01 })
                
   //              // collision detection
   //              console.log(this.getBounds(this.refs.item));
   //              let item = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.refs.item));
   //              let what = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.refs.what));
   //              var hi = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.refs.hi));
   //              if (item === true || what === true || hi === true) {
   //              // if (item === true) {
   //                  this.setState({ score: this.state.score + 1 })                    
   //              }

                
   //          } else {
   //              clearInterval(this.animationTimer);
   //          }
   //      }, fps);
   //  }

   //  componentDidMount() {
   //      this.animateElements();
   //      console.log('player', this.getBounds(this.refs.player)); 
   //      console.log('item', this.getBounds(this.refs.item)); 
   //  }
    

    pauseGame(){
        // if(e) e.preventDefault();
        if (this.state.isPlaying === false ) { 
            this.setState({isPlaying : true}) 
            animationFrameStatus = requestAnimationFrame(this.animateElements)
        } else { 
            this.setState({isPlaying : false}) 
            animationFrameStatus = cancelAnimationFrame(this.animateElements)
        }
    }


    animateElements() {
        let gameSpeed = this.state.gameSpeed;
        function detectCollision(a, b) {
            console.log()
            return !(
                ((a.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width))
            );
        }

        // increase speed
        this.setState({gameSpeed: (this.state.distance / 5) + 5 });

        if (this.state.isPlaying === true) {
            if (this.state.bgOffset >= 130 ) {
                this.setState({ bgOffset: 0 }) 
            } else {
                this.setState({ bgOffset: this.state.bgOffset + (0.5 * gameSpeed) })
            }
            this.setState({ itemOffset: this.state.itemOffset + (0.7 * gameSpeed) })
            this.setState({ distance: this.state.distance + 0.01  })


           // collision detection
            console.log(this.getBounds(this.refs.item));
            let item = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.refs.item));
            let what = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.refs.what));
            var hi = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.refs.hi));
            if (item === true || what === true || hi === true) {
            // if (item === true) {
                this.setState({ score: this.state.score + 1 })                    
            }
        }

        animationFrameStatus = requestAnimationFrame(this.animateElements);
    }

    componentDidMount() {
        // Todo speed based on distance loop or division
        // setInterval(() => {
        //     let currentGameSpeed = this.state.gameSpeed;
        //     this.setState({gameSpeed: currentGameSpeed + .5})
        // },500);

        document.addEventListener('keypress', (event) => {
            if(event.keyCode === 32 && this.state.isJumping === false && this.state.isPlaying === true) {
                console.log('1');
                (event).preventDefault();
                this.state.isJumping === false ? this.setState({ isJumping: true }) : this.setState({ isJumping: false }) ;
                setTimeout( ()=> {
                    this.state.isJumping === true ? this.setState({ isJumping: false }) : '' ;
                }, jumpDuration + 50);
            }
        });
    }

    render() {
        let bgStyles = {transform: 'translate3d(-' + this.state.bgOffset + 'px, 0, 0)'}
        let itemStyles = {transform: 'translate3d(-' + this.state.itemOffset + 'px, 0, 0)'}

        return (
            <div className="l-game-wrapper">
                <div className="c-ui-buttons">
                    <button onClick={() => this.pauseGame()}>start/stop</button>
                </div>
                
                <div className={'c-player ' + (this.state.isJumping === true ? 'is-jumping' : '') } ref="player"
                style={{animationDuration: (jumpDuration / 1000) + 's'}}></div>
                <div className="c-item" ref="item" style={{...itemStyles, bottom: '20px', left: '100px'}}></div>
                <div className="c-item" ref="what" style={{...itemStyles, bottom: '20px', left: '200px'}}></div>
                <div className="c-item" ref="hi" style={{...itemStyles, bottom: '20px', left: '300px'}}></div>
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
                    <p>sp: {this.state.gameSpeed}</p>
                    <p>sc: {this.state.score}</p>
                    <p>bg: {this.state.bgOffset}</p>
                    <p>item: {this.state.itemOffset}</p>
                </div>

            </div>
        );
    }
}

export default Game;

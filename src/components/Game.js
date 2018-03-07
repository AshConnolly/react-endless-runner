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
            items: {
                item1: {bottom: 20, left: 100, touched: false},
                item2: {bottom: 20, left: 200, touched: false},
                item3: {bottom: 40, left: 300, touched: false},
                item4: {bottom: 20, left: 400, touched: false},
                item5: {bottom: 50, left: 500, touched: false},
                item6: {bottom: 30, left: 600, touched: false}
            }
        };

        this.domRefs = {}; // to store dom refs    
        this.pauseGame = this.pauseGame.bind(this); 
        this.animateElements = this.animateElements.bind(this);
        this.refTest = this.refTest.bind(this);
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
    //    document.addEventListener('keypress', (event) => {
    //     if(event.keyCode === 32 && this.state.isJumping === false && this.state.isPlaying === true) {
    //         console.log('1');
    //         (event).preventDefault();
    //         this.state.isJumping === false ? this.setState({ isJumping: true }) : this.setState({ isJumping: false }) ;
    //         setTimeout( ()=> {
    //             this.state.isJumping === true ? this.setState({ isJumping: false }) : '' ;
    //         }, jumpDuration + 50);
    //     }
// });
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
            // TODO bg jerky due to 2 lines down (* gameSpeed)
            if (this.state.bgOffset >= 90 + 40 ) { 
                this.setState({ bgOffset: 0 }) 
            } else {
                this.setState({ bgOffset: this.state.bgOffset + (0.5 * gameSpeed) })
            }
            this.setState({ itemOffset: this.state.itemOffset + (0.7 * gameSpeed) })
            this.setState({ distance: this.state.distance + 0.01  })


           // collision detection
            /* TODO loop thourgh all children in state object and create hit detection for refs 
             eg - https://stackoverflow.com/questions/35601904/react-get-all-children-refs
             */

            // for each element in the state.items 
            // collision detection
            // add class to it as touched

            let collisionObject = {};
            Object.keys(this.state.items).forEach((item) => {
                console.log(item + 'wtf')
                // console.log('this.refs[item]', this.domRefs[item])
                // console.log('this.refs.player', this.refs.player)
                var isCollide = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.domRefs[item]))
                if (isCollide === true) {
                    // here - updating state object based on 

                    // get existing state

                    // set target to 
                    // let newState = {
                    //     items : {
                    //         [item] : { touched : true }
                    //     }
                    // }
                    let currentState = this.state;
                    let newState = currentState.items[item].touched = true
                    console.log('newState', newState)
                    // this.setState({ items : [...this.state.items, newState] })
                    //HERE SETSTATE TO TOUCHED
                    this.setState({ newState })
                    console.log(`${item} true`)
                }
                    
                    collisionObject[item] = isCollide;
            })

            // check if element is off left of page.

            console.log('collisionObject', collisionObject)

        // let obj = this.state.items;
        // for (var property in obj) {
        //     if (obj.hasOwnProperty(property)) {
        //         console.log(property)
        //     }
        // }
            
            // also add in a class addition to prevent scores increasing several times for each hit 
            // let item1 = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.domRrefs.item1));
            // let item2 = detectCollision(this.getBounds(this.refs.player), this.getBounds(this.domRefs.item2));
            // var item3= detectCollision(this.getBounds(this.refs.player), this.getBounds(this.domRefs.item3));
            // if (item1 === true || item2 === true || item3 === true) {
                // this.setState({ score: this.state.score + 1 })                    
            // }
        }

        animationFrameStatus = requestAnimationFrame(this.animateElements);
    }

    itemRender(key) {
        // console.log('this.state.items[item1]', this.state); 
        let test = key;
        let thisItem = this.state.items[key];
        let styles = {
            transform: 'translate3d(-' + this.state.itemOffset + 'px, 0, 0)', 
            bottom: thisItem.bottom, 
            left: thisItem.left,
        }
        return ( 
            <div 
            className={'c-item ' + (this.state.items[key].touched === true ? 'is-touched' : '')} 
            key={key} 
            ref={(ref) => {this.domRefs[key] = ref}} 
            style={styles}></div> )
    }

    refTest(passed) {
        let target = 'item' + passed;
        console.log('target', target)
        // console.log('this.domRrefs.item1', this.domRrefs.item1)
        console.log('refTest', this.domRefs[target]);
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
{/*                <div className="c-item" ref="item" style={{...itemStyles, bottom: '20px', left: '100px'}}></div>
                <div className="c-item" ref="what" style={{...itemStyles, bottom: '20px', left: '200px'}}></div>
                <div className="c-item" ref="hi" style={{...itemStyles, bottom: '20px', left: '300px'}}></div>*/}
{/*                {Object.keys(this.state.items).map(key => <div className="c-ite " key={key}> test {this.state.items[key].bottom} </div>)}*/}
                
                {Object.keys(this.state.items).map(key => this.itemRender(key))}

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
                    <p>items:
{/*                    {this.state.items.item1.touched === true ? 'true' : 'false'}, 
                    {this.state.items.item2.touched === true ? 'true' : 'false'}, 
                    {this.state.items.item3.touched === true ? 'true' : 'false'}, 
                    {this.state.items.item4.touched === true ? 'true' : 'false'}, 
                    {this.state.items.item5.touched === true ? 'true' : 'false'}, 
                    {this.state.items.item6.touched === true ? 'true' : 'false'}*/}

                    </p>
                    <button onClick={() => this.refTest('1')}>item 1</button><br/>
                    <button onClick={() => this.refTest('2')}>item 2</button><br/>
                    <button onClick={() => this.refTest('3')}>item 3</button><br/>
                    <button onClick={() => this.refTest('4')}>item 4</button><br/>
                    <button onClick={() => this.refTest('5')}>item 5</button><br/>
                    <button onClick={() => this.refTest('6')}>item 6</button><br/>
                    <button onClick={() => console.log(this.domRefs)}>domRefs</button>
                    <button onClick={() => console.log(this.domRefs.item1)}>domRefs</button>
                    
                </div>

            </div>
        );
    }
}

export default Game;

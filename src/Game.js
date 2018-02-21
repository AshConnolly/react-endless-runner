import React, { Component } from 'react';

class Game extends Component {
  constructor(props) {
        super(props);

        this.state = {
            name: '',
            nameError: '',
            email: '',
            emailError: ''
        };
       
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.onBlur = this.onBlur.bind(this);
    }
    
    // handleInputChange = e => {
    //     console.log('e', e.target.getAttribute('data-validation-type'))
    //     console.log('e.target.value', e.target.value)
    //     this.setState({ 
    //         ...this.state, [e.target.name] : e.target.value 
    //     });
    //     validateInput(e.target);
    // }
   
  render() {
    return (
      <div className="Game">
        <p className="Game-intro">
        wut
        </p>
        
        <div className="c-player">p</div>
        <div className="c-floor">f</div>
        <div className="c-bg">bg</div>
      </div>
    );
  }
}

export default Game;

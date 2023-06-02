import React, { Component } from 'react';

class PhoneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: 9999999999,
      dice: [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ],
      showGif: false,
      message: '',
    };

    this.rollDice = this.rollDice.bind(this);
    this.resetNumber = this.resetNumber.bind(this);
    this.submitNumber = this.submitNumber.bind(this);
    this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
    this.subtractRoll = this.subtractRoll.bind(this);
    this.divideRoll = this.divideRoll.bind(this);
  }

  rollDice() {
    const dice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];

    this.setState({ showGif: true, dice:dice }, () => {
      setTimeout(() => {
        this.setState(prevState => ({
          phoneNumber: prevState.phoneNumber,
          showGif: false,
        }));
      }, 2000);
    });
  }

  subtractRoll() {
    const newMessage = ['You are doing really well!', 
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
      "You are capable of more than you know. Keep pushing forward, and you'll surprise yourself.",
      "Don't be afraid to take risks and step out of your comfort zone. That's where true growth happens.",
      "Every small step you take is progress. Celebrate your victories, no matter how small they may seem.",
      "Remember that setbacks are just opportunities for comebacks. Keep going, and you'll come out stronger.",
      "You have the power to create the life you want. Believe in yourself and your dreams."
    ];

    const randomMessage = Math.floor(Math.random() * newMessage.length);

    this.setState(prevState => ({
        phoneNumber: prevState.phoneNumber - (prevState.dice[0] + prevState.dice[1]),
        dice: prevState.dice,
        showGif: false,
        message: newMessage[randomMessage],
      }));
  }

  divideRoll(){
    this.setState(prevState => ({
        phoneNumber: Math.floor(prevState.phoneNumber / (prevState.dice[0] + prevState.dice[1])),
        dice: prevState.dice,
        showGif: false,
      }));
  }

  resetNumber() {
    this.setState({ 
      phoneNumber: 9999999999, 
      dice: [1, 1],
      newMessage: '',
    });

  }

  submitNumber() {
    if (this.state.phoneNumber < 0) {
      alert('Phone number can not be negative!');
    } else {
      alert(`Submitting phone number: ${this.state.phoneNumber}`);
    }
  }

  formatPhoneNumber(phoneNumber) {
    let cleaned = ('' + phoneNumber).replace(/\D/g, '');
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.state.showGif && <img src="../public/dice.gif" alt="Dice gif"/>}
        {!this.state.showGif && <>
        <h3>{this.state.message}</h3>
        <h1>Your Phone Number: {this.formatPhoneNumber(this.state.phoneNumber)}</h1>
        <button onClick={this.rollDice}>Roll Dice</button>
        <button onClick={this.subtractRoll}>Subtract by roll</button>
        <button onClick={this.divideRoll}>Divide by roll</button>
        <h2>
          Dice rolled: {this.state.dice[0]} and {this.state.dice[1]}
        </h2>
        <button onClick={this.resetNumber}>Reset Number</button>
        <button onClick={this.submitNumber}>Submit Number</button>
        
        </>}

      </div>
    );
  }
}

export default PhoneForm;

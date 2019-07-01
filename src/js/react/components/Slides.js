import React, { Component } from 'react';
import update from 'immutability-helper';


class Slides extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slide: 0
    }
  }

  changeSlide() {
    this.setState((prevState) => update(prevState, {
      slide: {
        $set: (prevState.slide === 2 ? 0 : prevState.slide += 1)
      }
    }))
  }

  render() {
    const slides = [
      <div className="slides__red"/>,
      <div className="slides__green"/>,
      <div className="slides__blue"/>
    ];

    return (
      <main>
        <div className="slides" onClick={() => this.changeSlide()}>
          {slides[this.state.slide]}
        </div>
      </main>
    );
  }
}


export default Slides;

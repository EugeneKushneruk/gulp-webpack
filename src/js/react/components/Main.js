import React, { Component } from 'react';
import { CSSTransitionGroup } from "react-transition-group";
import update from 'immutability-helper';


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slide: 0
        }
    }

    changeSlide() {
        console.log("CLICK");
        this.setState((prevState) => {
            return update(prevState, {
                slide: { $set: (prevState.slide === 2 ? 0 : prevState.slide += 1) }
            })
        })
    }

    render() {
        const boxAnimation = {
            component: "div",
            transitionName: "animation-simple",
            transitionEnterTimeout: 400,
            transitionLeaveTimeout: 400
        };
        const slides = [
            <div className="slides__red"/>,
            <div className="slides__green"/>,
            <div className="slides__blue"/>
        ];

        return (
            <main>
                <div className="slides" onClick={() => this.changeSlide()}>
                    <CSSTransitionGroup {...boxAnimation}>
                        {slides[this.state.slide]}
                    </CSSTransitionGroup>
                </div>
            </main>
        );
    }
}


export default Main;
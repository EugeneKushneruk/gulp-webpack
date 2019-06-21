import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { store } from "../redux/store.config";
import { testAction } from "../redux/actions/actionsList";
import Header from "./components/Header";
import Main from "./components/Main";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const textList = [
      "Simple",
      "React",
      "App"
    ];

    return (
      <div>
        <Header
          title="Hello World"
          list={textList}
        />
        <Main/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    sample: state.sample,
    testReducer: state.testReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    testAction: (str) => dispatch(testAction(str)),
  }
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>,
  document.getElementById("app")
);

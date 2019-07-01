import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { store } from "../redux/store-config";
import { testAction } from "../redux/actions/ac-list";
import fetchData from "../utils/fetch-api";
import update from 'immutability-helper';
import Header from "./components/Header";
import Slides from "./components/Slides";
import Gallery from "./components/Gallery";

const FloatingMenu = ({ handler }) => {
  return (
    <div className="f-menu">
      <button className="f-menu__btn" onClick={handler}>Show More Items</button>
    </div>
  )
};

const Warning = ({ txt }) => {
  return (
    <div className="warning">
      <p className="warning__red">{txt}</p>
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      galleryArr: [],
      isLoading: false,
      maxShownItems: 100
    };

    this.fetchNewImages = this.fetchNewImages.bind(this);
    this.showMoreItems = this.showMoreItems.bind(this);
  }

  componentDidMount() {
    console.log("LOADED!")
  }

  showMoreItems() {
    if (this.state.maxShownItems < this.state.galleryArr.length) {
      this.setState((prevState) => update(prevState, {
        maxShownItems: {
          $set: prevState.maxShownItems + 100
        }
      }))
    }
  }

  fetchNewImages() {
    this.setState((prevState) => update(prevState, {
      galleryArr: {
        $set: []
      },
      isLoading: {
        $set: true
      },
      maxShownItems: {
        $set: 100
      }
    }), fetchData(
      "https://jsonplaceholder.typicode.com/photos",
      null,
      (result) => this.setState((prevState) => update(prevState, {
        galleryArr: {
          $set: result
        },
        isLoading: {
          $set: false
        }
      }))))
  }

  render() {
    const { galleryArr, isLoading, maxShownItems } = this.state;

    return (
      <div>
        <Header
          title="Click To Get Photos!"
          handler={this.fetchNewImages}
        />

        {isLoading
          ? <Warning txt="Loading" />
          : galleryArr.length
            ? <>
                <Gallery data={galleryArr.slice(0, maxShownItems)} />
                <FloatingMenu handler={this.showMoreItems} />
              </>
            : <Warning txt="Empty content" />
        }
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

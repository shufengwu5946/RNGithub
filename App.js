/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import AppContainer from "./src/routes/containers/AppContainer";
import { connect } from "react-redux";
import { setScreenHeight as setScreenH } from "./src/actions/Login";
import NavigationService from "./src/routes/containers/NavigationService";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  screenHeight: state.screenHeight
});

const mapDispatchToProps = dispatch => ({
  setScreenHeight: screenHeight => {
    dispatch(setScreenH(screenHeight));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

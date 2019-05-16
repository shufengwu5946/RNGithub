/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, Text, ProgressBarAndroid } from "react-native";
import AppContainer from "./src/routes/containers/AppContainer";
import { connect } from "react-redux";
import { setScreenHeight as setScreenH } from "./src/actions/Login";
import NavigationService from "./src/routes/containers/NavigationService";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { scaleSize } from "./src/utils/ScreenUtils";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        <Dialog visible={this.props.loadingDialog}>
          <DialogContent>
            <View
              style={{
                flexDirection: "column",
                width: scaleSize(400),
                alignItems: "center",
                paddingTop: scaleSize(30)
              }}
            >
              <ProgressBarAndroid />
              <Text style={{ fontSize: scaleSize(30) }}>Loading...</Text>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  screenHeight: state.screenHeight,
  loadingDialog: state.loadingDialog
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

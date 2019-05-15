import React from "react";
import { View, StatusBar } from "react-native";
import User from "./User/components/User";
import styles from "./MainStyles";

export default class Main extends React.Component {
  static navigationOptions = {
    // title: "我的",
    header: null
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <User />
      </View>
    );
  }
}

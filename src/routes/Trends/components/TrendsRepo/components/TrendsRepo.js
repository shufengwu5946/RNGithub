import React from "react";
import {
  Text,
  View,
  StatusBar
} from "react-native";
import styles from "./TrendsRepoStyles";

export default class TrendsRepo extends React.Component {
  static navigationOptions = {
    title: "趋势版本库"
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Text>趋势版本库</Text>
      </View>
    );
  }
}


import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./ListEmptyStyles";

class ListEmpty extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.listNull}>列表为空</Text>
        <Text style={styles.refresh} onPress={this.props._onPress}>
          重新加载
        </Text>
      </View>
    );
  }
}

export default ListEmpty;

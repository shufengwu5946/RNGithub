import React, { Component } from "react";
import { View, Text,Alert } from "react-native";
import FileExplorer from "../../../../../../FileExplorer";

export default class File extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {
    // Alert.alert("componentDidUpdate");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FileExplorer owner={this.props.author} repo={this.props.title} />
      </View>
    );
  }
}

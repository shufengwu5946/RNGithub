import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import utc2beijing from "~/utils/TimeUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import styles from "./UserBarStyles";
import FastImage from "react-native-fast-image";

export default class UserBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.avatar}
          source={{ uri: this.props.avatarUrl }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{this.props.login}</Text>
          <Text style={styles.userJoinDate}>{`加入时间 ${utc2beijing(
            this.props.createdAt
          )}`}</Text>
        </View>
      </View>
    );
  }
}

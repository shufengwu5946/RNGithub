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
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  render() {
    const { avatarUrl, login, createdAt } = this.props;
    return (
      <View style={styles.container}>
        <FastImage style={styles.avatar} source={{ uri: avatarUrl }} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userJoinDate}>{`加入时间 ${utc2beijing(
            createdAt
          )}`}</Text>
        </View>
      </View>
    );
  }
}

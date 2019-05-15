import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import getEvent from "./EventComponent";
import FastImage from "react-native-fast-image";
import CardView from "~/components/RNCardView.android";
import utc2beijing from "../utils/TimeUtils";

export default class ActivityListItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <CardView
        style={{
          marginTop: scaleSize(10),
          marginLeft: scaleSize(10),
          marginRight: scaleSize(10),
          marginBottom: scaleSize(10)
        }}
        cardElevation={scaleSize(5)}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.imageUrl}
              source={{ uri: item.actor.avatar_url }}
              resizeMode={FastImage.resizeMode.contain}
              defaultSource={require("../assets/img/defaultImg.png")}
            />
            <Text style={styles.userName}>{item.actor.login}</Text>
            <Text style={styles.time}>{utc2beijing(item.created_at)}</Text>
          </View>
          <View style={styles.event}>
            {getEvent(
              item.actor.login,
              item.type,
              item.repo.name,
              item.payload.ref_type,
              item.payload.ref,
              item.payload.release ? item.payload.release.tag_name : "",
              item.payload.action
            )}
          </View>
        </View>
      </CardView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderWidth: scaleSize(1),
    borderColor: "white"
  },
  imageContainer: {
    marginLeft: scaleSize(20),
    marginRight: scaleSize(20),
    marginTop: scaleSize(20),
    marginBottom: scaleSize(20),
    flexDirection: "row",
    alignItems: "center"
  },
  imageUrl: {
    height: scaleSize(60),
    width: scaleSize(60),
    borderRadius: scaleSize(30),
    backgroundColor: "#EEEEEE"
  },
  userName: {
    fontSize: scaleSize(28),
    color: "green",
    marginLeft: scaleSize(20),
    width: scaleSize(580)
  },
  time: {
    top: scaleSize(0),
    right: scaleSize(0),
    fontSize: scaleSize(22),
    borderColor: "gray",
    position: "absolute"
  },
  event: {
    marginLeft: scaleSize(20),
    marginRight: scaleSize(20),
    marginBottom: scaleSize(20)
  }
});

import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import Icon from "react-native-vector-icons/AntDesign";
import NavigationService from "~/routes/containers/NavigationService";
import FastImage from "react-native-fast-image";
import CardView from "~/components/RNCardView.android";

export default class FollowerListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { imageUrl, author } = this.props;
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
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.container}>
            <FastImage
              style={styles.imageUrl}
              source={{ uri: imageUrl }}
              resizeMode={FastImage.resizeMode.contain}
              defaultSource={require("../assets/img/defaultImg.png")}
            />
            <View>
              <View style={styles.contentTitle}>
                <Text style={styles.author}>{author}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </CardView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: scaleSize(1),
    borderColor: "white"
  },
  imageUrl: {
    height: scaleSize(80),
    width: scaleSize(80),
    marginLeft: scaleSize(15),
    marginTop: scaleSize(15),
    marginBottom: scaleSize(15),
    borderRadius: scaleSize(50),
    backgroundColor: "#EEEEEE"
  },
  contentTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  author: {
    width: scaleSize(550),
    fontSize: scaleSize(32),
    color: "black",
    paddingLeft: scaleSize(15),
    paddingTop: scaleSize(15),
    paddingBottom: scaleSize(15),
    flexWrap: "wrap"
  }
});

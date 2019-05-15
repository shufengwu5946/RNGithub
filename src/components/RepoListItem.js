import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import Icon from "react-native-vector-icons/AntDesign";
import NavigationService from "~/routes/containers/NavigationService";
import FastImage from "react-native-fast-image";
import CardView from "~/components/RNCardView.android";

export default class RepoListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      imageUrl,
      title,
      language,
      description,
      starNumber,
      forkNumber,
      author,
      size,
      htmlUrl,
      defaultBranch
    } = this.props;
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
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate("RepoDetail", {
              title: title,
              author: author,
              size: size,
              description: description,
              htmlUrl:htmlUrl,
              defaultBranch:defaultBranch
            });
          }}
        >
          <View style={styles.container}>
            <FastImage
              style={styles.imageUrl}
              source={{ uri: imageUrl }}
              resizeMode={FastImage.resizeMode.contain}
              defaultSource={require("../assets/img/defaultImg.png")}
            />
            <View>
              <View style={styles.contentTitle}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.language}>{language}</Text>
              </View>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.contentAuthor}>
                <View style={styles.starForkNumberContainer}>
                  <Icon name="star" size={scaleSize(24)} color={"gray"} />
                  <Text style={styles.starNumber}>{starNumber}</Text>
                </View>
                <View style={styles.starForkNumberContainer}>
                  <Icon name="fork" size={scaleSize(24)} color={"gray"} />
                  <Text style={styles.forkNumber}>{forkNumber}</Text>
                </View>
                <View style={styles.authorContainer}>
                  <Icon name="user" size={scaleSize(24)} color={"gray"} />
                  <Text style={styles.author}>{author}</Text>
                </View>
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
    flexDirection: "row",
    borderWidth: scaleSize(1),
    borderColor: "white"
  },
  imageUrl: {
    height: scaleSize(100),
    width: scaleSize(100),
    marginLeft: scaleSize(10),
    marginTop: scaleSize(10),
    borderRadius: scaleSize(50),
    backgroundColor: "#EEEEEE"
  },
  contentTitle: {
    flexDirection: "row"
  },
  title: {
    width: scaleSize(410),
    fontSize: scaleSize(32),
    color: "green",
    paddingLeft: scaleSize(20),
    paddingTop: scaleSize(10),
    flexWrap: "wrap"
  },
  language: {
    width: scaleSize(180),
    color: "gray",
    fontSize: scaleSize(24),
    paddingLeft: scaleSize(10),
    paddingTop: scaleSize(10),
    paddingRight: scaleSize(10),
    flexWrap: "wrap"
  },
  description: {
    width: scaleSize(590),
    color: "black",
    fontSize: scaleSize(24),
    paddingLeft: scaleSize(20),
    paddingTop: scaleSize(10),
    paddingRight: scaleSize(20),
    flexWrap: "wrap"
  },
  contentAuthor: {
    flexDirection: "row"
  },
  starForkNumberContainer: {
    flexDirection: "row",
    paddingLeft: scaleSize(20),
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    width: scaleSize(150)
  },
  starNumber: {
    paddingLeft: scaleSize(5),
    width: scaleSize(106),
    fontSize: scaleSize(24),
    color: "gray"
  },
  forkNumber: {
    paddingLeft: scaleSize(5),
    width: scaleSize(106),
    fontSize: scaleSize(24),
    color: "gray"
  },
  authorContainer: {
    width: scaleSize(290),
    flexDirection: "row",
    paddingLeft: scaleSize(20),
    paddingTop: scaleSize(10),
    paddingRight: scaleSize(20),
    paddingBottom: scaleSize(10)
  },
  author: {
    fontSize: scaleSize(24),
    color: "gray",
    paddingLeft: scaleSize(5),
    flexWrap: "wrap",
    width: scaleSize(226)
  }
});

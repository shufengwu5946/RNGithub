import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Alert
} from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import styles from "./InfoPageStyles";
import CardView from "~/components/RNCardView.android";
import NavigationService from "~/routes/containers/NavigationService";
import { myTypeArray } from "~/constants/User/Info/Repo";

export default class InfoPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  _onPress(itemText) {
    switch (itemText) {
      case "跟随者":
        NavigationService.navigate("FollowerListPage");
        break;
      case "跟随":
        Alert.alert("跟随");
        break;
      case "版本库":
        this.props.setRepoListType("全部");
        this.props.setRepoListSort("名称升序");
        this.props.setRepoListTypeItems(myTypeArray);
        NavigationService.navigate("RepoListPage");
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View>
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
            <Text style={styles.name}>{this.props.name}</Text>
            <View style={styles.list}>
              <ListItem
                itemCount={this.props.followersCount}
                itemText={"跟随者"}
                _onPress={this._onPress.bind(this, "跟随者")}
              />
              <ListItem
                itemCount={this.props.followingCount}
                itemText={"跟随"}
                _onPress={this._onPress.bind(this, "跟随")}
              />
              <ListItem
                itemCount={this.props.reposCount}
                itemText={"版本库"}
                _onPress={this._onPress.bind(this, "版本库")}
              />
            </View>
          </View>
        </CardView>
      </View>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={this.props._onPress}>
        <View style={styles.listItem}>
          <Text style={styles.listItemCount}>{this.props.itemCount}</Text>
          <Text style={styles.listItemText}>{this.props.itemText}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

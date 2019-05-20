import React, { Component } from "react";
import { View, Text, ScrollView, Alert, WebView } from "react-native";
import { README_URL } from "~/constants/Fetch";
import { fetchGet } from "~/fetch";
import styles from "./InfoStyles";

export default class Info extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getReadme, title, author, defaultBranch } = this.props;
    getReadme(title, author, defaultBranch);
  }

  render() {
    const {
      title,
      description,
      readme,
      dismissLoadingDialog,
      showLoadingDialog
    } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.border}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Readme
          readme={readme}
          dismissLoadingDialog={dismissLoadingDialog}
          showLoadingDialog={showLoadingDialog}
        />
      </ScrollView>
    );
  }
}

class Readme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }

  getHtmlHeight = `
  (function () {
      var height = null;
      function changeHeight() {
        if (document.body.scrollHeight != height) {
          height = document.body.scrollHeight;
          if (window.postMessage) {
            window.postMessage(JSON.stringify({
              type: 'setHeight',
              height: height,
            }))
          }
        }
      }
      setTimeout(changeHeight, 300);
  } ())
  `;

  onMessage = event => {
    try {
      const action = JSON.parse(event.nativeEvent.data);
      if (action.type === "setHeight" && action.height > 0) {
        this.setState({ height: action.height });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { readme, dismissLoadingDialog, showLoadingDialog } = this.props;
    return (
      <ScrollView nestedScrollEnabled={true}>
        <View style={{ height: this.state.height, ...styles.border }}>
          <WebView
            source={{ html: readme }}
            javaScriptEnabled={true}
            style={{
              height: this.state.height
            }}
            onMessage={event => this.onMessage(event)}
            injectedJavaScript={this.getHtmlHeight}
            onLoadStart={() => {
              showLoadingDialog();
            }}
            onLoad={() => {}}
            onLoadEnd={() => {
              dismissLoadingDialog();
            }}
            onError={() => {
              Alert.alert("README 加载失败！");
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

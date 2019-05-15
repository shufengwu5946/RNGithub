import React, { Component } from "react";
import { View, Text, ScrollView, WebView, Alert } from "react-native";
import { README_URL } from "~/constants/Fetch";
import { fetchGet } from "~/fetch";
import styles from "./InfoStyles";

export default class Info extends Component {
  constructor(props) {
    super(props);
    // const routes = [{ key: "info", title: "信息" }];

    this.state = {
      readme: ""
    };
  }

  componentDidMount() {
    // Alert.alert("hehe");
    fetchGet(
      README_URL(this.props.title, this.props.author),
      { Accept: "application/vnd.github.VERSION.html" },
      {}
    )
      .then(data => {
        this.setState({
          readme: data,
          title: this.props.title
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.border}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {this.props.title}
          </Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
        <Readme readme={this.state.readme} />
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
    return (
      <ScrollView nestedScrollEnabled={true}>
        <View style={{ height: this.state.height, ...styles.border }}>
          <WebView
            source={{ html: this.props.readme }}
            javaScriptEnabled={true}
            style={{
              height: this.state.height
            }}
            onMessage={event => this.onMessage(event)}
            injectedJavaScript={this.getHtmlHeight}
          />
        </View>
      </ScrollView>
    );
  }
}

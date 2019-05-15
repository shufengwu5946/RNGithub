import React, { Component } from "react";
import {
  StyleSheet
} from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";

const styles = StyleSheet.create({
  title: {
    marginLeft: scaleSize(30),
    marginRight: scaleSize(30),
    marginTop: scaleSize(20),
    color: "black",
    fontSize: scaleSize(43)
  },
  container: {
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    marginTop: scaleSize(10),
    marginBottom: scaleSize(10)
  },
  headerRight: {
    flexDirection: "row"
  },
  border: {
    borderWidth: scaleSize(1),
    borderColor: "black",
    marginTop: scaleSize(10),
    marginBottom: scaleSize(10)
  },
  description: {
    marginLeft: scaleSize(30),
    marginRight: scaleSize(30),
    marginTop: scaleSize(10),
    marginBottom: scaleSize(20),
    color: "black",
    fontSize: scaleSize(30)
  }
});

export default styles;
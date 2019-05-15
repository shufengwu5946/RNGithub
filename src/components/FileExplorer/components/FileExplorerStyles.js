import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";

const styles = StyleSheet.create({
  explorer: {
    flex: 1,
  },
  path: {
    height: scaleSize(101)
  },
  pathUnderLine: {
    height: scaleSize(1),
    backgroundColor: "#BBBBBB"
  },
  pathItem: {
    fontSize: scaleSize(32),
    color: "black",
    height: scaleSize(100),
    lineHeight: scaleSize(100)
  },
  fileList: {
    flex:1
  },
  fileListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: scaleSize(30),
    paddingBottom: scaleSize(30)
  },
  fileListItemIcon: {
    marginLeft: scaleSize(30),
    marginRight: scaleSize(30)
  },
  fileListItemText: {
    width: scaleSize(586),
    fontSize: scaleSize(32),
    color: "black"
  }
});

export default styles;

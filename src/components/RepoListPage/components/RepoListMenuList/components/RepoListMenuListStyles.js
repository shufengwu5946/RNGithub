import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
const styles = StyleSheet.create({
  item: {
    fontSize: scaleSize(29),
    paddingLeft: scaleSize(29),
    height: scaleSize(100),
    lineHeight: scaleSize(100),
  },
  sectionHeader: {
    fontSize: scaleSize(29),
    color: "gray",
    paddingLeft: scaleSize(29),
    height: scaleSize(100),
    lineHeight: scaleSize(100),
    backgroundColor: "white"
  },
  sectionLine: {
    backgroundColor: "gray",
    height: scaleSize(1)
  }
});

export default styles;

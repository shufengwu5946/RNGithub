import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
const styles = StyleSheet.create({
  container: {
    height: scaleSize(200),
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: scaleSize(20)
  },
  avatar: {
    width: scaleSize(160),
    height: scaleSize(160),
    backgroundColor: "#EEEEEE",
    borderRadius: scaleSize(80)
  },
  userInfo: {
    flex: 1,
    height: scaleSize(160),
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(20),
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  userName: {
    fontSize: scaleSize(40),
    color: "#333333"
  },
  userJoinDate: {
    fontSize: scaleSize(26),
    color: "#333333"
  }
});

export default styles;

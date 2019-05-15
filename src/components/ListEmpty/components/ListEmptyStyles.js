import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width:scaleSize(720)
  },
  listNull: {
    fontSize: scaleSize(30),
    color: "gray"
  },
  refresh: {
    fontSize: scaleSize(30),
    color: "green",
    marginTop: scaleSize(30)
  }
});

export default styles;

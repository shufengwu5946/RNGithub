import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    fontSize: scaleSize(34)
  },
  item: {
    width: scaleSize(220),
    flexDirection: "column",
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: scaleSize(1),
    paddingTop: scaleSize(20)
  },
  itemText: {
    fontSize: scaleSize(26),
    color: "gray",
    marginTop: scaleSize(10),
    marginBottom: scaleSize(20)
  }
});

export default styles;

import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderColor: "white",
    borderWidth: scaleSize(1)
  },
  name: {
    color: "black",
    fontSize: scaleSize(36),
    marginLeft: scaleSize(40),
    marginTop: scaleSize(40)
  },
  list: {
    flexDirection: "row",
    marginLeft: scaleSize(40),
    marginRight: scaleSize(40),
    marginTop: scaleSize(40),
    marginBottom: scaleSize(40)
  },
  listItem: {
    flexGrow: 1,
    alignItems: "stretch"
  },
  listItemText: {
    color: "gray",
    fontSize: scaleSize(24),
    textAlign: "center"
  },
  listItemCount: {
    color: "gray",
    fontSize: scaleSize(36),
    textAlign: "center"
  }
});

export default styles;

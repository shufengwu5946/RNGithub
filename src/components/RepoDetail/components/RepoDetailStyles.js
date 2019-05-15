import { StyleSheet } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtils";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  menu: {
    position: "absolute",
    top: scaleSize(810),
    left: scaleSize(400)
  },
  menuItem: {
    width: scaleSize(300),
    height: scaleSize(100)
  },
  branchModal: {
    flex: 1,
    backgroundColor: "white",
    padding: scaleSize(22),
    borderRadius: scaleSize(4),
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  branchModalTitle: {
    fontSize: scaleSize(30),
    color: "black",
    marginTop: scaleSize(10),
    marginLeft: scaleSize(10),
    marginBottom: scaleSize(20)
  },
  branchModalButton: {
    fontSize: scaleSize(30),
    color: "green",
    backgroundColor: "white",
    marginTop: scaleSize(20),
    marginBottom: scaleSize(20)
  }
});

export default styles;

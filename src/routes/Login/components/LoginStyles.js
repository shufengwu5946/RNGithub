import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50)
  },
  logo: {
    marginBottom: scaleSize(100)
  },
  inputItem: {
    fontSize: scaleSize(34),
    alignItems: "center",
    height: scaleSize(80)
  },
  inputItemLabel: {
    fontSize: scaleSize(34),
    alignItems: "center",
    lineHeight: scaleSize(80),
    height: scaleSize(80)
  },
  loginButton: {
    marginTop: scaleSize(50),
    height: scaleSize(80),
    width: scaleSize(300)
  }
});

export default styles;

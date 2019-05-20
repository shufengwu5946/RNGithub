import React from "react";
import { Text, View, StatusBar } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import { Button, InputItem } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./LoginStyles";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { loginSuccStatus, navigation } = this.props;
    if (loginSuccStatus) {
      navigation.navigate("MainStack");
    }
  }

  render() {
    const {
      userName,
      setUserName,
      password,
      setPassword,
      handlePress,
      loading
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Icon
          name="github"
          color="green"
          size={scaleSize(200)}
          style={styles.logo}
        />

        <InputItem
          style={styles.inputItem}
          clear
          editable={true}
          disabled={false}
          value={userName}
          onChange={value => {
            setUserName(value);
          }}
          placeholder="用户名"
        >
          <Text style={styles.inputItemLabel}>用户名</Text>
        </InputItem>
        <InputItem
          style={styles.inputItem}
          clear
          editable={true}
          disabled={false}
          value={password}
          onChange={value => {
            setPassword(value);
          }}
          placeholder="密码"
          type="password"
        >
          <Text style={styles.inputItemLabel}>密码</Text>
        </InputItem>
        <Button
          style={styles.loginButton}
          onPress={() => handlePress()}
          loading={loading}
          disabled={loading}
        >
          {loading ? "登录中..." : "登录"}
        </Button>
      </View>
    );
  }
}

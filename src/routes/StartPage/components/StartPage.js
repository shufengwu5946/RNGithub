import React from "react";
import { View } from "react-native";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import { retrieveData } from "~/utils/AsyncStorageUtils";

export default class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.getData();
  }

  getData = () => {
    const { setToken, setLogin, navigation } = this.props;
    retrieveData([LOGIN_DATA])
      .then(datas => {
        if (datas[0]) {
          setToken(JSON.parse(datas[0]).token);
          setLogin(JSON.parse(datas[0]).login);
          navigation.navigate("Main");
        } else {
          navigation.navigate("Login");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return <View />;
  }
}

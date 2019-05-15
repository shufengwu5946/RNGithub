import React, { Component } from "react";
import { View, FlatList, TouchableNativeFeedback } from "react-native";
import FollowerListItem from "~/components/FollowerListItem";
import { PASSWORD, LOGIN_DATA } from "~/constants/AsyncStorage";
import toast from "~/utils/ToastUtils";
import { scaleSize } from "~/utils/ScreenUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import { FOLLOWERS_URL } from "~/constants/Fetch";
import Icon from "react-native-vector-icons/AntDesign";

import withRefreshList from "~/hocs/withRefreshList";
import { fetchGet } from "../../../fetch";

const listItemFunc = ({ item }) => (
  <FollowerListItem imageUrl={item.avatar_url} author={item.login} />
);

const fetchFunc = aimPage =>
  retrieveData([LOGIN_DATA]).then(datas => {
    return fetchGet(
      FOLLOWERS_URL(JSON.parse(datas[0]).login),
      {},
      {
        page: aimPage
      }
    );
  });

const FollowerList = withRefreshList(listItemFunc, fetchFunc);

class FollowerListPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "跟随者"
    };
  };

  render() {
    return <FollowerList />;
  }
}

export default FollowerListPage;

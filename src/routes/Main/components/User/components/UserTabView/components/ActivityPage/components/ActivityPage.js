import React, { Component } from "react";
import { View, FlatList } from "react-native";
import ActivityListItem from "~/components/ActivityListItem";
import toast from "~/utils/ToastUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import { EVENTS_URL } from "~/constants/Fetch";
import { scaleSize } from "~/utils/ScreenUtils";
import withRefreshList from "~/hocs/withRefreshList";
import { fetchGet } from "~/fetch";

const listItemFunc = ({ item }) => <ActivityListItem item={item} />;

export default function ActivityPage(props) {
  const fetchFunc = aimPage =>
    fetchGet(
      EVENTS_URL(props.login),
      {
        Authorization: `token ${props.token}`
      },
      {
        page: aimPage
      }
    );
  const ActivityPage = withRefreshList(listItemFunc, fetchFunc);
  return <ActivityPage />;
}

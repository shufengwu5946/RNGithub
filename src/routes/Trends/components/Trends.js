import React from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity
} from "react-native";
import styles from "./TrendsStyles";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { scaleSize } from "../../../utils/ScreenUtils";
import CardView from "~/components/RNCardView.android";
import NavigationService from "~/routes/containers/NavigationService";

export default class Trends extends React.Component {
  static navigationOptions = {
    title: "动态"
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <TrendsList />
      </View>
    );
  }
}

const TrendsList = props => (
  <FlatList
    data={[
      { name: "搜索", iconName: "cloud-search", page: "" },
      { name: "足迹", iconName: "road-variant", page: "" },
      { name: "趋势版本库", iconName: "finance", page: "TrendsRepo" },
      { name: "版本库集合", iconName: "inbox-multiple", page: "" },
      { name: "精选主题", iconName: "theme-light-dark", page: "" },
      { name: "全球动态", iconName: "earth", page: "" }
    ]}
    renderItem={({ item }) => (
      <TrendsListItem iconName={item.iconName} page={item.page}>
        {item.name}
      </TrendsListItem>
    )}
    numColumns={3}
    keyExtractor={(item, index) => index}
  />
);

const TrendsListItem = props => (
  <TouchableOpacity
    onPress={() => {
      NavigationService.navigate(props.page);
    }}
  >
    <CardView
      style={{
        marginTop: scaleSize(10),
        marginLeft: scaleSize(10),
        marginRight: scaleSize(10),
        marginBottom: scaleSize(10)
      }}
      cardElevation={scaleSize(5)}
    >
      <View style={styles.item}>
        <MaterialCommunityIcon
          name={props.iconName}
          size={scaleSize(120)}
          color="green"
        />
        <Text style={styles.itemText}>{props.children}</Text>
      </View>
    </CardView>
  </TouchableOpacity>
);

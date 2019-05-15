import * as React from "react";
import { View, Dimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { scaleSize } from "~/utils/ScreenUtils";
import styles from "./UserTabViewStyles";

const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

export default class UserTabView extends React.Component {
  state = {
    index: 0,
    routes: this.props.routes
  };

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  render() {
    return (
      <TabView
        lazy
        navigationState={this.state}
        renderScene={SceneMap(this.props.scenes)}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "green" }}
            style={{ backgroundColor: "white" }}
            labelStyle={{
              textTransform: "capitalize",
              fontSize: scaleSize(30),
            }}
            activeColor="green"
            inactiveColor="gray"
            contentContainerStyle={{ height: scaleSize(100) }}
          />
        )}
        renderLazyPlaceholder={this._renderLazyPlaceholder}
      />
    );
  }
}



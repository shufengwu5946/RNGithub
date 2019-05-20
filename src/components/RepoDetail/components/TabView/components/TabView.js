import * as React from "react";
import { View, Dimensions, Text } from "react-native";
import { TabView as TV, SceneMap, TabBar } from "react-native-tab-view";
import { scaleSize } from "~/utils/ScreenUtils";
import styles from "./TabViewStyles";
import Info from "./Info/components/Info";
import File from "./File/components/File";
import Activity from "./Activity/components/Activity";
import Commit from "./Commit/components/Commit";

const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

export default class TabView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "info", title: "信息" },
      { key: "file", title: "文件" },
      { key: "commit", title: "提交" },
      { key: "activity", title: "活动" }
    ]
  };

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  render() {
    const {
      title,
      author,
      description,
      showLoadingDialog,
      dismissLoadingDialog,
      readme,
      getReadme,
      defaultBranch
    } = this.props;
    return (
      <TV
        lazy
        navigationState={this.state}
        renderScene={({ route, jumpTo }) => {
          switch (route.key) {
            case "info":
              return (
                <Info
                  jumpTo={jumpTo}
                  title={title}
                  author={author}
                  description={description}
                  showLoadingDialog={showLoadingDialog}
                  dismissLoadingDialog={dismissLoadingDialog}
                  readme={readme}
                  getReadme={getReadme}
                  defaultBranch={defaultBranch}
                />
              );
            case "file":
              return (
                <File
                  jumpTo={jumpTo}
                  title={title}
                  author={author}
                  description={description}
                />
              );
            case "activity":
              return (
                <Activity
                  jumpTo={jumpTo}
                  title={title}
                  author={author}
                  description={description}
                />
              );
            case "commit":
              return (
                <Commit
                  jumpTo={jumpTo}
                  title={title}
                  author={author}
                  description={description}
                />
              );
          }
        }}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "green" }}
            style={{ backgroundColor: "white" }}
            labelStyle={{
              fontSize: scaleSize(30)
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

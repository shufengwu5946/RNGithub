import React, { Component } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import styles from "../components/RepoListMenuListStyles";
import { typeArray, sortArray } from "~/constants/User/Info/Repo";

class RepoListMenuList extends Component {
  componentDidMount() {}

  render() {
    const { repoListTypeItems, repoListType, repoListSort } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          sections={[
            {
              title: "类型",
              data: repoListTypeItems
            },
            {
              title: "排序",
              data: sortArray
            }
          ]}
          renderItem={({ item }) => (
            <Text
              style={{
                backgroundColor:
                  [repoListType, repoListSort].indexOf(item) === -1
                    ? "white"
                    : "#DDDDDD",
                color:
                  [repoListType, repoListSort].indexOf(item) === -1
                    ? "black"
                    : "green",
                ...styles.item
              }}
            >
              {item}
            </Text>
          )}
          renderSectionHeader={({ section }) => (
            <View>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionHeader}>{section.title}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default RepoListMenuList;

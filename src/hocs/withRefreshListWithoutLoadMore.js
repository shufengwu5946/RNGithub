import React, { Component } from "react";
import { View, FlatList, Text, TouchableNativeFeedback } from "react-native";
import toast from "~/utils/ToastUtils";
import { scaleSize } from "~/utils/ScreenUtils";
import { StyleSheet } from "react-native";

class ListEmpty extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.refreshing ? (
          <View />
        ) : (
          <View>
            <Text style={styles.listNull}>列表为空</Text>
            <TouchableNativeFeedback onPress={this.props._onPress}>
              <Text style={styles.refresh}>点击重新加载</Text>
            </TouchableNativeFeedback>
          </View>
        )}
      </View>
    );
  }
}

export default function withRefreshListWithoutLoadMore(
  listItemFunc,
  fetchFunc,
  arrangeData
) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const data = [];
      this.state = {
        data: data,
        refreshing: false
      };
      this._onPress = this._onPress.bind(this);
    }

    componentDidMount() {
      this.setState({ refreshing: true }, () => {
        this.getList(true);
      });
    }

    handleRefresh() {
      this.setState({ refreshing: true }, () => {
        this.getList(true);
      });
    }

    _onPress() {
      this.setState({ refreshing: true }, () => {
        this.getList(true);
      });
    }

    arrange(data) {
      if (arrangeData) {
        return arrangeData(data);
      }
      return data;
    }

    render() {
      return (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.arrange(this.state.data)}
            renderItem={listItemFunc}
            onRefresh={() => this.handleRefresh()}
            refreshing={this.state.refreshing}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              return (
                <ListEmpty
                  _onPress={this._onPress}
                  refreshing={this.state.refreshing}
                />
              );
            }}
          />
        </View>
      );
    }

    getList(isRefresh) {
      fetchFunc()
        .then(data => {
          if (isRefresh) {
            this.setState({
              data: data,
              refreshing: false
            });
          }
        })
        .catch(error => {
          this.setState({ refreshing: false });
          console.error(error);
        });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listNull: {
    fontSize: scaleSize(30),
    color: "gray",
    marginTop: scaleSize(150)
  },
  refresh: {
    fontSize: scaleSize(30),
    color: "green",
    marginTop: scaleSize(10)
  }
});

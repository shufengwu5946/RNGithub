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

class ListFooterLoadMoreFinish extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.loadMoreFinish ? (
          <View style={styles.loadMoreFinishContainer}>
            <Text style={styles.loadMoreFinishContent}>没有更多数据了！</Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

export default function withRefreshList(listItemFunc, fetchFunc) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const data = [];
      this.state = {
        data: data,
        refreshing: false,
        page: 1,
        loadMoreFinish: false
      };
      this._onPress = this._onPress.bind(this);
    }

    componentDidMount() {
      this.setState(
        { page: 1, refreshing: true, loadMoreFinish: false },
        () => {
          this.getList(true);
        }
      );
    }

    handleRefresh() {
      console.log("handleRefresh");
      this.setState(
        { page: 1, refreshing: true, loadMoreFinish: false },
        () => {
          this.getList(true);
        }
      );
    }

    handleEndReached() {
      if (this.state.loadMoreFinish) {
        return;
      }
      this.setState(
        { page: this.state.page + 1, refreshing: true, loadMoreFinish: false },
        () => {
          this.getList(false);
        }
      );
    }

    _onPress() {
      this.setState(
        { page: 1, refreshing: true, loadMoreFinish: false },
        () => {
          this.getList(true);
        }
      );
    }

    render() {
      return (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            renderItem={listItemFunc}
            onRefresh={() => this.handleRefresh()}
            refreshing={this.state.refreshing}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => this.handleEndReached()}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={() => {
              return (
                <ListEmpty
                  _onPress={this._onPress}
                  refreshing={this.state.refreshing}
                />
              );
            }}
            ListFooterComponent={() => {
              return (
                <ListFooterLoadMoreFinish
                  loadMoreFinish={this.state.loadMoreFinish}
                />
              );
            }}
          />
        </View>
      );
    }

    getList(isRefresh) {
      fetchFunc(this.state.page)
        .then(data => {
          if (isRefresh) {
            console.log(data);
            this.setState({
              data: data,
              refreshing: false,
              loadMoreFinish: false
            });
          } else {
            if (data.length === 0) {
              this.setState({
                data: [...this.state.data, ...data],
                refreshing: false,
                page: this.state.page - 1,
                loadMoreFinish: true
              });
            } else {
              this.setState({
                data: [...this.state.data, ...data],
                refreshing: false,
                loadMoreFinish: false
              });
            }
          }
        })
        .catch(error => {
          this.setState({ refreshing: false, loadMoreFinish: false });
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
  },
  loadMoreFinishContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: scaleSize(100)
  },
  loadMoreFinishContent: {
    fontSize: scaleSize(30),
    color: "gray"
  }
});

import React, { Component } from "react";
import {
  View,
  TouchableNativeFeedback,
  Text,
  Clipboard,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from "./RepoDetailStyles";
import Info from "./TabView/components/Info";
import TabView from "./TabView/components/TabView";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { scaleSize } from "~/utils/ScreenUtils";
import ModalMenu from "../../ModalMenu";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import ShareAndroid from "~/components/ShareAndroid";
import BrowserOpenAndroid from "~/components/BrowserOpenAndroid";
import toast from "~/utils/ToastUtils";
import { fetchGet, fetchPut, fetchDelete } from "../../../fetch";
import { STAR_URL, BRANCHES_URL, TAGS_URL } from "../../../constants/Fetch";
import Modal from "react-native-modal";
import Button from "react-native-button";

export default class RepoDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title", "");
    const showMenu = navigation.getParam("showMenu");
    const star = navigation.getParam("star", false);
    const starRepo = navigation.getParam("starRepo");
    const unstarRepo = navigation.getParam("unstarRepo");
    const showBranchModal = navigation.getParam("showBranchModal");

    return {
      title: title.length > 14 ? title.substring(0, 14) + "..." : title,
      headerRight: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableNativeFeedback onPress={star ? unstarRepo : starRepo}>
            <MaterialCommunityIcon
              name={star ? "star" : "star-outline"}
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={showBranchModal}>
            <Icon
              name="fork"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={showMenu}>
            <Icon
              name="menu-fold"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableNativeFeedback>
        </View>
      )
    };
  };

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  showBranchModal = () => {
    if (this.state.branchList.length === 0) {
      this.getBranchesAndTags();
    } else {
      this.setState({ branchModalVisible: true });
    }
  };

  starRepo = () => {
    // this.setState({ star: true });
    this.props.navigation.setParams({
      star: true
    });
    fetchPut(
      STAR_URL(
        this.props.navigation.getParam("author", ""),
        this.props.navigation.getParam("title", "")
      ),
      {
        Authorization: `token ${this.props.token}`
      },
      {}
    )
      .then(data => {
        toast("星标成功！");
      })
      .catch(error => {
        console.log(error);
      });
  };

  unstarRepo = () => {
    // this.setState({ star: false });
    this.props.navigation.setParams({
      star: false
    });
    fetchDelete(
      STAR_URL(
        this.props.navigation.getParam("author", ""),
        this.props.navigation.getParam("title", "")
      ),
      {
        Authorization: `token ${this.props.token}`
      },
      {}
    )
      .then(data => {
        toast("取消星标成功！");
      })
      .catch(error => {
        console.error(error);
      });
  };

  getRepoStar = () => {
    fetchGet(
      STAR_URL(
        this.props.navigation.getParam("author", ""),
        this.props.navigation.getParam("title", "")
      ),
      {
        Authorization: `token ${this.props.token}`
      },
      {}
    )
      .then(data => {
        this.props.navigation.setParams({
          star: true
        });
      })
      .catch(error => {
        this.props.navigation.setParams({
          star: false
        });
        console.log(error);
      });
  };

  getBranchesAndTags = () => {
    this.props.showLoadingDialog();
    fetchGet(
      BRANCHES_URL(
        this.props.navigation.getParam("author", ""),
        this.props.navigation.getParam("title", "")
      ),
      {},
      {}
    )
      .then(branches => {
        fetchGet(
          TAGS_URL(
            this.props.navigation.getParam("author", ""),
            this.props.navigation.getParam("title", "")
          ),
          {},
          {}
        ).then(tags => {
          this.setState({
            branchList: branches,
            tagList: tags,
            branchModalVisible: true
          });
          this.props.dismissLoadingDialog();
        });
      })
      .catch(error => {
        this.props.dismissLoadingDialog();
        console.log(error);
      });
  };

  constructor(props) {
    super(props);
    console.log(props.navigation.getParam("defaultBranch", ""));

    this.state = {
      page: 0,
      modalMenuVisible: false,
      branchModalVisible: false,
      defaultBranch: props.navigation.getParam("defaultBranch", ""),
      branchList: [],
      tagList: []
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      showMenu: this.showMenu,
      starRepo: this.starRepo,
      unstarRepo: this.unstarRepo,
      showBranchModal: this.showBranchModal
    });
    this.getRepoStar();
  }

  handleChange(index, e) {
    this.setState({ page: index });
  }

  componentDidUpdate() {}

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const author = navigation.getParam("author", "");
    const description = navigation.getParam("description", "");
    const htmlUrl = navigation.getParam("htmlUrl", "");
    return (
      <View style={styles.container}>
        <View />
        <TabView
          title={title}
          author={author}
          description={description}
          showLoadingDialog={this.props.showLoadingDialog}
          dismissLoadingDialog={this.props.dismissLoadingDialog}
        />
        <Menu ref={this.setMenuRef} style={styles.menu}>
          <MenuItem
            onPress={() => {
              ShareAndroid.share(htmlUrl);
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            分享
          </MenuItem>
          <MenuItem
            onPress={() => {
              BrowserOpenAndroid.open(htmlUrl);
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            在浏览器中打开
          </MenuItem>
          <MenuItem
            onPress={() => {
              Clipboard.setString(htmlUrl);
              toast("复制成功！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            复制克隆链接
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            关注
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            创建版本库分支
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            已发布版本
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            下载源码(zip)
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            添加书签
          </MenuItem>
        </Menu>
        <Modal isVisible={this.state.branchModalVisible}>
          <View style={styles.branchModal}>
            <Text style={styles.branchModalTitle}>选择分支或标签</Text>
            <ScrollView>
              <FlatList
                data={this.state.branchList}
                renderItem={({ item }) => (
                  <BranchTagListItem
                    type={"branch"}
                    name={item.name}
                    checked={
                      item.name === this.state.defaultBranch ? true : false
                    }
                  />
                )}
                keyExtractor={(item, index) => index}
              />
              <FlatList
                data={this.state.tagList}
                renderItem={({ item }) => (
                  <BranchTagListItem type={"tag"} name={item.name} />
                )}
                keyExtractor={(item, index) => index}
              />
            </ScrollView>

            <Button
              style={styles.branchModalButton}
              onPress={() => this.setState({ branchModalVisible: false })}
            >
              取消
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const BranchTagListItem = props => (
  <TouchableOpacity>
    <View
      style={{
        ...styles.branchTagListItem,
        backgroundColor: props.checked ? "#DDDDDD" : "white"
      }}
    >
      {props.type === "branch" ? (
        <Icon
          name="fork"
          size={scaleSize(50)}
          color="green"
          style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
        />
      ) : (
        <MaterialCommunityIcon
          name="tag-outline"
          size={scaleSize(50)}
          color="green"
          style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
        />
      )}
      <Text style={styles.item}>{props.name}</Text>
    </View>
  </TouchableOpacity>
);

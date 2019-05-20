import React, { Component } from "react";
import {
  View,
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
    const star = navigation.getParam("star", true);
    const starRepo = navigation.getParam("starRepo");
    const unstarRepo = navigation.getParam("unstarRepo");
    const showBranchModal = navigation.getParam("showBranchModal");

    return {
      title: title.length > 14 ? title.substring(0, 14) + "..." : title,
      headerRight: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={star ? unstarRepo : starRepo}>
            <MaterialCommunityIcon
              name={star ? "star" : "star-outline"}
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showBranchModal()}>
            <Icon
              name="fork"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showMenu}>
            <Icon
              name="menu-fold"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableOpacity>
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

  setBranch = (branch)=>{
    this.setState({ branch: branch });
  }

  dismissBranchModal = () => {
    this.setState({ branchModalVisible: false });
  };

  starRepo = () => {
    const { navigation, token } = this.props;
    navigation.setParams({
      star: true
    });
    fetchPut(
      STAR_URL(
        navigation.getParam("author", ""),
        navigation.getParam("title", "")
      ),
      {
        Authorization: `token ${token}`
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
    const { navigation, token } = this.props;
    navigation.setParams({
      star: false
    });
    fetchDelete(
      STAR_URL(
        navigation.getParam("author", ""),
        navigation.getParam("title", "")
      ),
      {
        Authorization: `token ${token}`
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
    const { navigation, token } = this.props;
    fetchGet(
      STAR_URL(
        navigation.getParam("author", ""),
        navigation.getParam("title", "")
      ),
      {
        Authorization: `token ${token}`
      },
      {}
    )
      .then(data => {
        navigation.setParams({
          star: true
        });
      })
      .catch(error => {
        navigation.setParams({
          star: false
        });
        console.log(error);
      });
  };

  getBranchesAndTags = () => {
    const { showLoadingDialog, navigation, dismissLoadingDialog } = this.props;
    showLoadingDialog();
    fetchGet(
      BRANCHES_URL(
        navigation.getParam("author", ""),
        navigation.getParam("title", "")
      ),
      {},
      {}
    )
      .then(branches => {
        fetchGet(
          TAGS_URL(
            navigation.getParam("author", ""),
            navigation.getParam("title", "")
          ),
          {},
          {}
        ).then(tags => {
          this.setState({
            branchList: branches,
            tagList: tags,
            branchModalVisible: true
          });
          dismissLoadingDialog();
        });
      })
      .catch(error => {
        dismissLoadingDialog();
        console.log(error);
      });
  };

  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      page: 0,
      modalMenuVisible: false,
      branchModalVisible: false,
      branch: navigation.getParam("defaultBranch", ""),
      branchList: [],
      tagList: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
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
    const {
      navigation,
      showLoadingDialog,
      dismissLoadingDialog,
      getReadme,
      readme
    } = this.props;
    const { branchModalVisible, branchList } = this.state;
    const title = navigation.getParam("title", "");
    const author = navigation.getParam("author", "");
    const description = navigation.getParam("description", "");
    const htmlUrl = navigation.getParam("htmlUrl", "");
    const defaultBranch = navigation.getParam("defaultBranch", "");
    return (
      <View style={styles.container}>
        <View />
        <TabView
          title={title}
          author={author}
          description={description}
          showLoadingDialog={showLoadingDialog}
          dismissLoadingDialog={dismissLoadingDialog}
          readme={readme}
          getReadme={getReadme}
          defaultBranch={defaultBranch}
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
        <Modal isVisible={branchModalVisible}>
          <View style={styles.branchModal}>
            <Text style={styles.branchModalTitle}>选择分支或标签</Text>
            <ScrollView>
              <FlatList
                data={branchList}
                renderItem={({ item }) => (
                  <BranchTagListItem
                    type={"branch"}
                    name={item.name}
                    title={title}
                    author={author}
                    checked={item.name === this.state.branch ? true : false}
                    getReadme={getReadme}
                    dismissBranchModal={() => this.dismissBranchModal()}
                    setBranch={this.setBranch}
                  />
                )}
                keyExtractor={(item, index) => index}
              />
              <FlatList
                data={this.state.tagList}
                renderItem={({ item }) => (
                  <BranchTagListItem
                    type={"tag"}
                    name={item.name}
                    title={title}
                    author={author}
                    checked={item.name === this.state.branch ? true : false}
                    getReadme={getReadme}
                    dismissBranchModal={() => this.dismissBranchModal()}
                    setBranch={this.setBranch}
                  />
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

const BranchTagListItem = props => {
  const {
    checked,
    type,
    name,
    getReadme,
    title,
    author,
    dismissBranchModal,
    setBranch
  } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        getReadme(title, author, name);
        setBranch(name);
        dismissBranchModal();
      }}
    >
      <View
        style={{
          ...styles.branchTagListItem,
          backgroundColor: checked ? "#DDDDDD" : "white"
        }}
      >
        {type === "branch" ? (
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
        <Text style={styles.item}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

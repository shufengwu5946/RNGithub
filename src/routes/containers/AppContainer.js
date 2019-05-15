import React from "react";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Login from "../Login";
import Main from "../Main";
import StartPage from "../StartPage";
import Icon from "react-native-vector-icons/AntDesign";
import { scaleSize } from "~/utils/ScreenUtils";
import RepoDetail from "~/components/RepoDetail";
import Trends from "../Trends";
import RepoListPage from "../../components/RepoListPage/components/RepoListPage";
import FollowerListPage from "../../components/FollowerListPage/components/FollowerListPage";
import RepoListMenuList from "../../components/RepoListPage/components/RepoListMenuList";
import { View, TouchableOpacity, Alert } from "react-native";
import { HeaderBackButton } from "react-navigation";
import TrendsRepo from "../Trends/components/TrendsRepo/components/TrendsRepo";

const UserStack = createStackNavigator(
  {
    Main: Main
  },
  {
    initialRouteName: "Main"
  }
);

const TrendsStack = createStackNavigator(
  {
    Trends: Trends
  },
  {
    initialRouteName: "Trends"
  }
);

const MainStack = createBottomTabNavigator(
  {
    TrendsStack: {
      screen: TrendsStack,
      navigationOptions: {
        tabBarLabel: "动态"
      }
    },
    UserStack: {
      screen: UserStack,
      navigationOptions: {
        tabBarLabel: "我的"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === "UserStack") {
          iconName = "user";
        } else if (routeName === "TrendsStack") {
          iconName = "home";
        }
        return (
          <IconComponent
            name={iconName}
            size={scaleSize(46)}
            color={focused ? "green" : "gray"}
          />
        );
      }
    }),
    tabBarOptions: {
      style: { height: scaleSize(100), paddingBottom: scaleSize(10) },
      activeTintColor: "green",
      inactiveTintColor: "gray",
      labelStyle: {
        fontSize: scaleSize(22)
      }
    }
  }
);

const LoginSwitch = createSwitchNavigator(
  {
    Start: StartPage,
    Login: Login,
    MainStack: MainStack
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

// const RepoListPageStack = createStackNavigator(
//   {
//     RepoListPageStack: {
//       screen: RepoListPage
//     }
//   }
// );

const RepoListPageDrawer = createDrawerNavigator(
  {
    RepoListPageDrawer: {
      screen: RepoListPage
    }
  },
  {
    initialRouteName: "RepoListPageDrawer",
    drawerLockMode: "locked-closed",
    drawerWidth: scaleSize(500),
    drawerPosition: "right",
    useNativeAnimations: false,
    contentComponent: () => <RepoListMenuList />,
    navigationOptions: ({ navigation }) => ({
      title: "版本库",
      headerRight: (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              {
                navigation.toggleDrawer();
              }
            }}
          >
            <Icon
              name="menu-fold"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableOpacity>
        </View>
      )
    })
  }
);

const StartStatck = createStackNavigator(
  {
    LoginSwitch: LoginSwitch,
    RepoListPage: RepoListPageDrawer,
    FollowerListPage: FollowerListPage,
    RepoDetail: RepoDetail,
    TrendsRepo: TrendsRepo
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(StartStatck);

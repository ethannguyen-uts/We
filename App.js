import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([""]);

import React, { Component } from "react";
import { View, Text, Button, LogBox } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import FeedScreen from "./src/screens/FeedScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import PersonalPostsScreen from "./src/screens/PersonalPostsScreen";
import AddScreen from "./src/screens/AddScreen";
import LandingScreen from "./src/screens/LandingScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SaveScreen from "./src/screens/SaveScreen";
import SearchScreen from "./src/screens/SearchScreen";
import UserScreen from "./src/screens/UserScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as FeedProvider } from "./src/context/FeedContext";
import { setNavigator } from "./src/navigationRef";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import * as firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7KrLLtbc5m5SL_kegwxhSYqjNumNxtbE",
  authDomain: "wematch-c1147.firebaseapp.com",
  projectId: "wematch-c1147",
  storageBucket: "wematch-c1147.appspot.com",
  messagingSenderId: "268169388324",
  appId: "1:268169388324:web:f1642389a6c08e140153b1",
  measurementId: "G-CSVGSKW4CH",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

//Navigation options

ProfileScreen.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="ios-person-circle-outline" color={tintColor} size={25} />
  ),
};

AccountScreen.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="settings-outline" color={tintColor} size={25} />
  ),
};

FeedScreen.navigationOptions = {
  tabBarLabel: "Feed",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="ios-newspaper-outline" color={tintColor} size={25} />
  ),
};
//

const HomeNavigator = createStackNavigator({
  Landing: {
    screen: LandingScreen,
  },
});

HomeNavigator.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="home-outline" color={tintColor} size={25} />
  ),
};

const SearchNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen,
  },
  User: {
    screen: UserScreen,
  },
});

SearchNavigator.navigationOptions = {
  tabBarLabel: "Search",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="search-outline" color={tintColor} size={25} />
  ),
};

const PostNavigator = createStackNavigator({
  Add: {
    screen: AddScreen,
  },
  Save: SaveScreen,
});

PostNavigator.navigationOptions = {
  tabBarLabel: "Post",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="add-circle-outline" color={tintColor} size={25} />
  ),
};

const PersonalNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
  PersonalPosts: PersonalPostsScreen,
});

PersonalNavigator.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ tintColor }) => (
    <Ionicons name="person-circle-outline" color={tintColor} size={25} />
  ),
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    Home: {
      screen: HomeNavigator,
    },
    Search: {
      screen: SearchNavigator,
    },
    Feed: {
      screen: FeedScreen,
    },

    Post: {
      screen: PostNavigator,
    },

    Personal: {
      screen: PersonalNavigator,
    },
    Account: {
      screen: AccountScreen,
    },
  }),
});

/*
export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false
    }
  }
componentDidMount(){
  firebase.auth().onAuthStateChanged((user)=>{
    if (!user) {
      this.setState({
        loggedIn: false,
        loaded: true
      });

    } else {
      this.setState({
        loggedIn: true,
        loaded: true
      });

    }
  })
}
  render(){
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      return (
        <View>
          <Text>
            Loading
          </Text>
        </View>
      )
    }


  }
}
export default App;
*/
const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <AuthProvider>
      <FeedProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </FeedProvider>
    </AuthProvider>
  );
};

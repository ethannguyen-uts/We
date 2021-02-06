import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as FeedContext } from "../context/FeedContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Gallery from "../components/Gallery";
import firebase from "firebase";

const ProfileScreen = (props) => {
  const {
    state: { currentUser },
    fetchUser,
  } = useContext(AuthContext);
  const {
    state: { posts, followings },
    fetchUserPosts,
    fetchUserFollowing,
  } = useContext(FeedContext);

  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  console.log("Rendering Profile Screen");

  useEffect(() => {
    fetchUser();
    setUser(currentUser);
    fetchUserFollowing();
    console.log("start===========================================");

    const listener = props.navigation.addListener("didFocus", () => {
      console.log("START LISTERNER!!!!!!!!!!!!!!!!!!!!!!");
      setUser(currentUser);
      fetchUserPosts(firebase.auth().currentUser.uid);

      console.log("END LISTERNER!!!!!!!!!!!!!!!!!!!!!!");
      return () => {
        listener.remove();
      };
    });
    console.log("end===========================================");
  }, []);

  useEffect(() => {
    console.log("When navigation params or posts change");
    console.log(props.navigation.state.params);
    const b = props.navigation.state.params;
    if (b && b.hasOwnProperty("uid")) {
      if (b.uid === firebase.auth().currentUser.uid) {
        setUser(currentUser);
        fetchUserPosts(firebase.auth().currentUser.uid);
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(b.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setUser(snapshot.data());
              fetchUserPosts(b.uid);
            }
          });
      }
    } else {
      setUser(currentUser);
      fetchUserPosts(firebase.auth().currentUser.uid);
    }
  }, [props.navigation.state.params]);
  /*
  useEffect(() => {
    const b = props.navigation.state.params;
    if (b && followings.indexOf(b.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [followings]);
*/

  console.log("+++++++++++++++++++++++++++++++++++++++++++");

  if (!user) {
    return (
      <View>
        <Text></Text>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.accountStyle}>{user.name}</Text>
          <TouchableOpacity>
            <Ionicons name="add-outline" style={styles.iconStyle}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="menu-outline" style={styles.iconStyle}></Ionicons>
          </TouchableOpacity>
        </View>

        <Gallery posts={posts} />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;

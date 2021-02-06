import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as FeedContext } from "../context/FeedContext";
import firebase from "firebase";

const LandingScreen = ({ navigation }) => {
  const { state, fetchUser } = useContext(AuthContext);
  //const { fetchUserPosts } = useContext(FeedContext);

  useEffect(() => {
    console.log("Inside landing screen");
    firebase.auth().onAuthStateChanged((user) => {
      fetchUser();
    });
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 48, color: "red" }}>
        Welcome to Landing Page, {state.currentUser.name}
      </Text>
      <Text></Text>
      <NavLink text="Go back to Login Page" routeName="Signin" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LandingScreen;

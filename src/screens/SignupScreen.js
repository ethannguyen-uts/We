import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
//import {Text, Input, Button} from 'react-native-element';
import Spacer from "../components/Spacer";
import { Context } from "../context/AuthContext";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onDidBlur={() => {
          clearErrorMessage();
        }}
      />
      <AuthForm
        headerText="Sign Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={({ email, password, name }) =>
          signup({ email, password, name })
        }
      />
      <NavLink
        text="Already have an account? Sign In"
        routeName="Signin"
      ></NavLink>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    //borderWidth: 10,
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SignupScreen;

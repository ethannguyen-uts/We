import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  return (
    <View style={styles.container}>
      <NavigationEvents
        onDidBlur={() => {
          clearErrorMessage();
        }}
      />
      <AuthForm
        headerText="Sign In"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={({ email, password, name }) =>
          signin({ email, password, name })
        }
      />

      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;

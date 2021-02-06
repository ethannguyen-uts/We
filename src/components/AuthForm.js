import React, { useState } from "react";
import { Text, Button, TextInput, StyleSheet, View } from "react-native";
import Spacer from "../components/Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View styles={styles.container}>
      <Spacer>
        <Text style={styles.h3}>{headerText}</Text>
      </Spacer>
      {headerText === "Sign Up" ? (
        <TextInput
          value={name}
          onChangeText={(name) => setName(name)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Account Name"
          style={styles.inputElement}
          label="Account Name"
        />
      ) : null}
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email"
        style={styles.inputElement}
        label="Email"
      />
      <TextInput
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        style={styles.inputElement}
        label="Password"
      />
      {errorMessage ? (
        <Text style={{ color: "red", marginLeft: 15, marginTop: 15 }}>
          {errorMessage}
        </Text>
      ) : null}
      <Button
        title={submitButtonText}
        onPress={() => onSubmit({ email, password, name })}
      ></Button>
    </View>
  );
};
const styles = StyleSheet.create({
  errorMessage: {},
  link: {
    color: "blue",
  },
  h3: {
    fontSize: 30,
    justifyContent: "center",
  },
  container: {
    // borderColor: 'red',
    //borderWidth: 10,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
  inputElement: {
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",

    height: 30,
  },
});

export default AuthForm;

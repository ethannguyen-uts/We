import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";
import firebase from "firebase";

const USER_STATE_CHANGE = "USER_STATE_CHANGE";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", currentUser: action.payload };
    case USER_STATE_CHANGE:
      return { currentUser: action.payload };
    case "clearErrorMessage":
      return { ...state, errorMessage: "" };
    case "signout":
      return { currentUser: null, errorMessage: "" };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password, name }) => {
  //make api request to signup with email and password
  try {
    //const response = await trackerApi.post('/signup', {email, password});
    //await AsyncStorage.setItem('token', response.data.token);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });

        dispatch({ type: "signup", payload: "" });
        //await AsyncStorage.getItem('token');
        //console.log(response.data);
        navigate("Landing");
      })
      .catch((error) => {
        console.log(error.toString());
      });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
  //if sign up modified the state

  //if signup fail
};

const signin = (dispatch) => async ({ email, password, name }) => {
  try {
    const debug = "1";
    if (debug === "1") {
      email = "allen@gmail.com";
      password = "123456";
    }
    //const response = await trackerApi.post('/signin', {email, password});
    //await AsyncStorage.setItem('token', response.data.token);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({ type: "signin", payload: "" });
        //await AsyncStorage.getItem('token');
        //console.log(response.data);
        navigate("Landing");
      })
      .catch((error) => {
        dispatch({
          type: "add_error",
          payload: error.toString(),
        });
      });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: error.toString(),
    });
  }
};

const signout = (dispatch) => {
  return () => {
    console.log("Signing out");
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigate("Signin");
        dispatch({ type: "signout", payload: "" });
      })
      .catch((error) => {
        // An error happened.
        console.log("Error Signing out!");
      });
  };
};
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const fetchUser = (dispatch) => async () => {
  var user = await firebase.auth().currentUser;
  if (user) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data() });
        }
      });
  } else {
    console.log("No user loged in");
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  var user = await firebase.auth().currentUser;
  console.log("Inside tryLocalSignIn function");
  if (user) {
    // User is signed in.
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: "signin", payload: snapshot.data() });
          navigate("Landing");
        } else {
          console.log("No user is signed in and no information.");
          navigate("Signin");
        }
      });
  } else {
    console.log("No user is signed in.");
    navigate("Signin");
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, fetchUser, clearErrorMessage, tryLocalSignIn },
  { currentUser: null, errorMessage: "" }
);

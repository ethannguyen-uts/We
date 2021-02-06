import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { NavigationEvents } from "react-navigation";

const AddScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();

    const listener = navigation.addListener("didFocus", async () => {
      await setTimeout(() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      }, 100);

      return () => {
        listener.remove();
      };
    });
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      console.log(image);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera and gallery</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      {image && <Image style={styles.imageStyle} source={{ uri: image }} />}
      <Button
        title="Flip"
        style={styles.buttonStyle}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button
        style={styles.buttonStyle}
        title="Take Picture"
        onPress={() => {
          takePicture();
        }}
      ></Button>
      <Button
        style={styles.buttonStyle}
        title="Pick Image from Gallery"
        onPress={() => {
          pickImage();
        }}
      ></Button>
      <Button
        style={styles.buttonStyle}
        title="Save"
        onPress={() => {
          navigation.navigate("Save", { image });
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonStyle: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
  },
});

export default AddScreen;

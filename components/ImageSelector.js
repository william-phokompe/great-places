import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const ImageSelector = () => {
  const [pickedImageUri, setPickedImageUri] = useState();

  const cameraPermission = async (_) => {
    const res = await Permissions.askAsync(Permissions.CAMERA);

    if (res.status !== "granted") {
      Alert.alert("Please grant camera permissions", [{ text: "Okay" }]);
      return false;
    }
    return true;
  };

  const takeImageHandler = async (_) => {
    const hasCameraPermission = await cameraPermission();

    if (!hasCameraPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImageUri(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImageUri ? (
          <Text>No Image Picked</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImageUri }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageSelector;

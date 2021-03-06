import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const pickedLocationOnMap = props.navigation.getParam('pickedLocation');
  const {onLocationPicked} = props;

  useEffect(_ => {
    if (pickedLocationOnMap) {
      setPickedLocation(pickedLocationOnMap)
      onLocationPicked(pickedLocationOnMap)
    }
  }, [pickedLocationOnMap, onLocationPicked])

  const locationPermission = async (_) => {
    const res = await Permissions.askAsync(Permissions.LOCATION);

    if (res.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions!",
        "Please grant location permissions",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async (_) => {
    const hasPermissions = await locationPermission();

    if (!hasPermissions) return;

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 10000,
      });

      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      props.onLocationPicked({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    } catch (error) {
      Alert.alert(
        "Could not fetch location",
        "Please try a location on the map",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const selectOnMapHandler = _ => {
    props.navigation.navigate("Map")
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} onTouch={selectOnMapHandler}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No Location Selected</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Select On Map"
          color={Colors.primary}
          onPress={selectOnMapHandler}
        />
        <Button
          title="Set Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;

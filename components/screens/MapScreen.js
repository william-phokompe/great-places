import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import Colors from "../../constants/Colors";

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readonly = props.navigation.getParam("readonly");

  const [selectedLocation, setSelectedLocation] = useState();

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const mapRegion = {
    latitude: initialLocation ? initialLocation.latitude : -26.204550776810912,
    longitude: initialLocation ? initialLocation.longitude : 28.052283595484475,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  console.log("MAP REGION:", mapRegion);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  } else {
    markerCoordinates = initialLocation;
  }

  const saveLocationHandler = useCallback(
    (_) => {
      if (!selectedLocation) {
        Alert.alert(
          "Location missing",
          "Please select a location before proceeding",
          [{ text: "Okay" }]
        );
        return;
      }
      props.navigation.navigate("NewPlace", {
        pickedLocation: selectedLocation,
      });
    },
    [selectedLocation]
  );

  useEffect(
    (_) => {
      props.navigation.setParams({ saveLocation: saveLocationHandler });
    },
    [saveLocationHandler]
  );

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navigationData) => {
  const saveFunction = navigationData.navigation.getParam("saveLocation");
  const readonly = navigationData.navigation.getParam("readonly");

  if (readonly) return {};

  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFunction}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButtonText: {
    fontSize: 16,
  },
  headerButton: {
    marginHorizontal: 20,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});

export default MapScreen;

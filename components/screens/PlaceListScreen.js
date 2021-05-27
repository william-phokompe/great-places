import React from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../HeaderButton";
import PlaceItem from "../PlaceItem";

const PlaceListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          onSelect={(_) => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
          image={null}
          title={itemData.item.title}
          address={null}
        />
      )}
    />
  );
};

PlaceListScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navigationData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default PlaceListScreen;

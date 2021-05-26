import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import PlaceListScreen from "../components/screens/PlaceListScreen";
import PlaceDetailsScreen from "../components/screens/PlaceDetailsScreen";
import NewPlaceScreen from "../components/screens/NewPlaceScreen";
import MapScreen from "../components/screens/MapScreen";

import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator(
  {
    Place: PlaceListScreen,
    PlaceDetail: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    },
  }
);

export default createAppContainer(PlacesNavigator)
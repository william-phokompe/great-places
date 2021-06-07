import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";

import Place from "../../models/Place";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        location.latitude
      },${location.longitude}&key=${ENV().googleApiKey}`
    );

    // ADD CUSTOM ERROR HANDLING
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json();
    const address = responseData.results[0].formatted_address;

    const newfileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + newfileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbRes = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbRes.insertId,
          title: title,
          image: newPath,
          address,
          coords: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setPlaces = () => {
  return async (dispatch) => {
    try {
      const dbRes = await fetchPlaces();

      dispatch({
        type: SET_PLACES,
        places: dbRes.rows._array.map(
          (place) => new Place(place.id, place.title, place.imageUri, place.address, place.latitude, place.longitude)
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

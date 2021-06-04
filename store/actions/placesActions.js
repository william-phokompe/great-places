import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import Place from "../../models/Place";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES"

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const newfileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + newfileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbRes = await insertPlace(title, newPath, "MY ADDRESS", 15.6, 12.3);
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbRes.insertId, title: title, image: newPath },
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
        places: dbRes.rows._array.map(place => new Place(place.id, place.title, place.imageUri)),
      });
    } catch (error) {
      console.log(error)
    }
  }
}

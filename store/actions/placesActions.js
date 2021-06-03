import * as FileSystem from "expo-file-system";
import { insertPlace } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";

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

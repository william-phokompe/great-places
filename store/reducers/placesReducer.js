import Place from "../../models/Place";
import { ADD_PLACE } from "../actions/placesActions";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      );

      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};

import Place from "../../models/Place";
import { ADD_PLACE, SET_PLACES } from "../actions/placesActions";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.latitude,
        action.placeData.coords.longitude
      );

      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: action.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.image,
              place.address,
              place.latitude,
              place.longitude
            )
        ),
      };
    default:
      return state;
  }
};

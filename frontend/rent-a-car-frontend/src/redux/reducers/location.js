import { ADD_LOCATION, GET_LOCATION, EDIT_LOCATION, DELETE_LOCATION, VEHICLE_NAMES } from "../types/locationType";

const initialState = {
  locations: [],
  vehicleNames: []
};

const adminLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      console.log("AP", action.payload)
      return {
        ...state,
        locations: action.payload.locations
      };

    case GET_LOCATION:
      console.log("AP", action.payload)
      return {
        ...state,
        locations: action.payload.locations
      };

    case EDIT_LOCATION:
      console.log("AP", action.payload)
      return {
        ...state,
        locations: action.payload
      };

    case DELETE_LOCATION:
      if (action.payload.message) {
        alert(action.payload.message)
      }
      else {
        console.log("AP", action.payload)
        return {
          ...state,
          locations: action.payload
        }
      };

    case VEHICLE_NAMES:
      console.log("AP", action.payload)
      return {
        ...state,
        vehicleNames: action.payload
      };
    default:
      return state;
  }
};

export default adminLocationReducer;

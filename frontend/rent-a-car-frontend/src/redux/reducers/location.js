import { ADD_LOCATION, GET_LOCATION, EDIT_LOCATION, DELETE_LOCATION, VEHICLE_NAMES } from "../types/locationType";

const initialState = {
  data: [],
  vehicleNames: []
};

const adminLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case GET_LOCATION:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case EDIT_LOCATION:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case DELETE_LOCATION:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
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

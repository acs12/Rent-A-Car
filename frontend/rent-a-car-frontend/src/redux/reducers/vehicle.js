import { ADD_VEHICLE, GET_VEHICLE, EDIT_VEHICLE, DELETE_VEHICLE } from "../types/vehicle";

const initialState = {
  data: []
};

const adminVehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VEHICLE:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case GET_VEHICLE:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case EDIT_VEHICLE:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case DELETE_VEHICLE:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default adminVehicleReducer;

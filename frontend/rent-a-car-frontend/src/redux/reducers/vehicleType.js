import { ADD_VEHICLE_TYPE, GET_VEHICLE_TYPE, EDIT_VEHICLE_TYPE, DELETE_VEHICLE_TYPE } from "../types/vehicleType";

const initialState = {
  data: []
};

const vehicleTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VEHICLE_TYPE:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case GET_VEHICLE_TYPE:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case EDIT_VEHICLE_TYPE:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };

    case DELETE_VEHICLE_TYPE:
      console.log("AP", action.payload)
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default vehicleTypeReducer;

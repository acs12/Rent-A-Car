import { ADD_VEHICLE, GET_VEHICLE, EDIT_VEHICLE, DELETE_VEHICLE } from "../types/vehicle";

const initialState = {
  vehicles: []
};

const adminVehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VEHICLE:
      console.log("AP", action.payload)
      return {
        ...state,
        vehicles: action.payload.vehicles
      };

    case GET_VEHICLE:
      console.log("Get Vehicle AP", action.payload)
      return {
        ...state,
        vehicles: action.payload.vehicles
        // vehicles : action.payload
      };

    case EDIT_VEHICLE:
      console.log("Edit Vehicle AP", action.payload)
      return {
        ...state,
        vehicles: action.payload
      };

    case DELETE_VEHICLE:
      if (action.payload.message) {
        alert(action.payload.message)
      }
      else {
        console.log("AP", action.payload)
        return {
          ...state,
          vehicles: action.payload
        }
      };
    default:
      return state;
  }
};

export default adminVehicleReducer;

import { SELECTCURRENTVEHICLE, SELECTLOCATION } from "../types/typeSelect";

export function setCurrentVehicle(vehicle) {
    return dispatch => {
      dispatch({
        type: SELECTCURRENTVEHICLE,
        payload: vehicle
      });
    };
  }

  export function setCurrentLocation(location) {
    return dispatch => {
      dispatch({
        type: SELECTLOCATION,
        payload: location
      });
    };
  }
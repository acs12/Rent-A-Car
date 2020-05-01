import { SEARCHVEHICLES } from "../types/typeSearch";
import { SEARCHLOCATIONS } from "../types/typeSearch";

export function setVehicleSearchText(text) {
  return dispatch => {
    dispatch({
      type: SEARCHVEHICLES,
      payload: text
    });
  };
}

export function setLocationSearchText(text) {
  return dispatch => {
    dispatch({
      type: SEARCHLOCATIONS,
      payload: text
    });
  };
}

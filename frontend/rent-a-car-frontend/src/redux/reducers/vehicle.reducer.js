import { FETCHVEHICLES } from "../types/typeFetch";
import { SEARCHVEHICLES } from "../types/typeSearch";

const initialState = {
  data: [],
  searchText: ''
};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHVEHICLES:
      return {
        ...state,
        data: action.payload
      };
    case SEARCHVEHICLES:
      return {
        ...state,
        searchText: action.payload
      };
    default:
      return state;
  }
};

export default vehicleReducer;

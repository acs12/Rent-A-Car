import { FETCHLOCATIONS } from "../types/typeFetch";
import { SEARCHLOCATIONS } from "../types/typeSearch";
import { SELECTLOCATION } from "../types/typeSelect";

const initialState = {
  data: [],
  searchText: "", 
  selectedLocation : {}
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHLOCATIONS:
      return {
        ...state,
        data: action.payload
      };
      case SEARCHLOCATIONS:
      return {
        ...state,
        searchText: action.payload
      };
      case SELECTLOCATION:
      return {
        ...state,
        selectedLocation: action.payload
      };

    default:
      return state;
  }
};

export default locationReducer;

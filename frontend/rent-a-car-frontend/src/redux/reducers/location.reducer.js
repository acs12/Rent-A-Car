import { FETCHLOCATIONS } from "../types/typeFetch";
import { SEARCHLOCATIONS } from "../types/typeSearch";
import { SELECTLOCATION } from "../types/typeSelect";

const initialState = {
  data: [],
  searchText: "", 
  total : 0,
  selectedLocation : {name : 'Select Location'}
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHLOCATIONS:
      return {
        ...state,
        data: action.payload.locations,
        total : action.payload.total,
      };
      case SEARCHLOCATIONS:
      return {
        ...state,
        searchText: action.payload
      };
      case SELECTLOCATION:
      let selectedLocation = state.data.filter((l) => l._id === action.payload)
      if (selectedLocation.length === 0) {
        selectedLocation = state.selectedLocation;
      }
      return {
        ...state,
        selectedLocation: selectedLocation[0]
      };

    default:
      return state;
  }
};

export default locationReducer;

import { FETCHLOCATIONS } from "../types/typeFetch";
import { SEARCHLOCATIONS } from "../types/typeSearch";

const initialState = {
  data: [],
  searchText: ""
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

    default:
      return state;
  }
};

export default locationReducer;

import { FETCHVEHICLES, FETCHCURRENTVEHICLE, FETCHLOCATIONVEHICLES } from "../types/typeFetch";
import { SEARCHVEHICLES } from "../types/typeSearch";
import { SELECTCURRENTVEHICLE} from '../types/typeSelect'
const initialState = {
  data: [],
  searchText: '',
  selectedVehicle : {}
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
      case FETCHCURRENTVEHICLE:
      case SELECTCURRENTVEHICLE:
        return {
          ...state,
          selectedVehicle: action.payload
        };
        case FETCHLOCATIONVEHICLES:
        return {
          ...state,
          data: action.payload.vehicles
        };
    default:
      return state;
  }
};

export default vehicleReducer;

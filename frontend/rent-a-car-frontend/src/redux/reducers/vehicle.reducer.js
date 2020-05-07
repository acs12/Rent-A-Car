import { FETCHVEHICLES, FETCHCURRENTVEHICLE, FETCHLOCATIONVEHICLES } from "../types/typeFetch";
import { SEARCHVEHICLES } from "../types/typeSearch";
import { SELECTCURRENTVEHICLE, CONFIRMBOOKING} from '../types/typeSelect'
const initialState = {
  data: [],
  total: 0,
  searchText: '',
  selectedVehicle : {
    ratings: []
  }, 
};

const vehicleReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case FETCHVEHICLES:
      return {
        ...state,
        data: action.payload.vehicles,
        total : action.payload.total
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
          selectedVehicle: action.payload,
          data : []
        };
        case FETCHLOCATIONVEHICLES:
        return {
          ...state,
          data: action.payload.vehicles,
          total : action.payload.total
        };
        case CONFIRMBOOKING:
          if(action.payload.vehicles === undefined) {
            return {
              ...state,
            };
          }else {
            return {
              ...state,
              data: action.payload.vehicles
            };
          }
    default:
      return state;
  }
};

export default vehicleReducer;

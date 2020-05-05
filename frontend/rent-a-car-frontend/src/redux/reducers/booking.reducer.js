import { FETCHBOOKINGS } from "../types/typeFetch";
import { SUBMITCAR } from "../types/typeSelect";

const initialState = {
  reservation: {},
  reservationHistory: [],
  searchText: "",
  total: 0
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHBOOKINGS:
      return {
        ...state,
        reservation:
          action.payload.reservation !== null ? action.payload.reservation : {},
        reservationHistory: action.payload.reservationHistory
      };
      case SUBMITCAR: 
      return {
        ...state, 
        reservation : {},
        reservationHistory: state.reservationHistory.concat(action.payload.reservation)
      }

    default:
      return state;
  }
};

export default bookingReducer;

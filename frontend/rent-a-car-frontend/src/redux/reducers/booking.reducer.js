import { FETCHBOOKINGS } from "../types/typeFetch";

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
    default:
      return state;
  }
};

export default bookingReducer;

import { CONFIRMBOOKING, CANCELBOOKING, SUBMITCAR } from "../types/typeSelect";
import axios from "axios";
import URL from "../../constants";

export function book(values, callback) {
  axios.defaults.withCredentials = true;
  // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  const request = axios.post(`${URL}/reservations`, values);

  return dispatch => {
    request.then(res => {
      dispatch({
        type: CONFIRMBOOKING,
        payload: res.data
      });
      callback(res);
    });
    request.catch(res => {
      callback(res);
    });
  };
}

export function cancelBooking(id, callback) {
  axios.defaults.withCredentials = true;
  // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  const request = axios.put(`${URL}/reservations/cancelReservation/${id}`);

  return dispatch => {
    request.then(res => {
      dispatch({
        type: CANCELBOOKING,
        payload: res.data
      });
      callback(res);
    });
    request.catch(res => {
      callback(res);
    });
  };
}

export function returnCar(id, values, callback) {
  axios.defaults.withCredentials = true;
  // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  const request = axios.patch(`${URL}/reservations/${id}`, values);

  return dispatch => {
    request.then(res => {
      dispatch({
        type: SUBMITCAR,
        payload: res.data
      });
      callback(null, res);
    });
    request.catch(res => {
      callback(res, null);
    });
  };
}

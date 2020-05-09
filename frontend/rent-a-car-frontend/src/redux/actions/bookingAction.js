import { CONFIRMBOOKING, CANCELBOOKING, SUBMITCAR } from "../types/typeSelect";
import axios from "axios";
import {URL, headers} from "../../constants";

export function book(values, callback) {
  axios.defaults.withCredentials = true;
  // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  const request = axios.post(`${URL}/reservations`, values, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

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
  const request = axios.put(`${URL}/reservations/cancelReservation/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return dispatch => {
    request.then(res => {
      dispatch({
        type: SUBMITCAR,
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
  const request = axios.patch(`${URL}/reservations/${id}`, values, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

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

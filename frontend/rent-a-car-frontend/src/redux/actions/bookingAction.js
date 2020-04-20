import { CONFIRMBOOKING } from "../types/typeSelect";
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

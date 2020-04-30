import { SELECTCURRENTVEHICLE, SELECTLOCATION } from "../types/typeSelect";
import {UPDATEUSER} from '../types/typeSignin'

import axios from 'axios';
import URL from '../../constants';

export function setCurrentVehicle(vehicle) {
    return dispatch => {
      dispatch({
        type: SELECTCURRENTVEHICLE,
        payload: vehicle
      });
    };
  }

  export function setCurrentLocation(location) {
    return dispatch => {
      dispatch({
        type: SELECTLOCATION,
        payload: location
      });
    };
  }

  export function updateUser(user, callback) {
    axios.defaults.withCredentials = true;
    let userURL = `${URL}/users/${user.userId}`

    console.log(user, userURL)

    const request = axios
        .patch(userURL, user);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: UPDATEUSER,
                payload: res.data
            });
            callback(res)
        })
        request.catch((error) => {
            callback(error)
        })
    }
  }
import { ADD_VEHICLE_TYPE, DELETE_VEHICLE_TYPE, EDIT_VEHICLE_TYPE, GET_VEHICLE_TYPE } from '../types/vehicleType';
import axios from 'axios';
import {URL, headers} from '../../constants';



export function addVehicleType(values, callback) {
    console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/vehicleType`, values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });

    return (dispatch) => {
        request.then((res) => {

            dispatch({
                type: ADD_VEHICLE_TYPE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}

export function getVehicleType(callback) {
    // console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${URL}/vehicleType`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });

    return (dispatch) => {
        request.then((res) => {

            dispatch({
                type: GET_VEHICLE_TYPE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}



export function updateVehicleType(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/vehicleType/update`, values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: EDIT_VEHICLE_TYPE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}

export function deleteType(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/vehicleType/delete`,values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: DELETE_VEHICLE_TYPE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}
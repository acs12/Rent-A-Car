import { ADD_VEHICLE, DELETE_VEHICLE, EDIT_VEHICLE, GET_VEHICLE } from '../types/vehicle';
import axios from 'axios';
import URL from '../../constants';



export function addVehicle(values, callback) {
    console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/vehicles`, values);

    return (dispatch) => {
        request.then((res) => {

            dispatch({
                type: ADD_VEHICLE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}

export function getVehicle(callback) {
    // console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${URL}/vehicles`);

    return (dispatch) => {
        request.then((res) => {

            dispatch({
                type: GET_VEHICLE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}



export function updateVehicle(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/vehicles/update`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: EDIT_VEHICLE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}

export function deleteVehicle(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/vehicles/delete`,values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: DELETE_VEHICLE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}
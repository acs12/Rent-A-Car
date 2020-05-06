import { ADD_LOCATION, DELETE_LOCATION, EDIT_LOCATION, GET_LOCATION ,VEHICLE_NAMES} from '../types/locationType';
import axios from 'axios';
import {URL, headers} from '../../constants';



export function addLocation(values, callback) {
    console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/rentalLocations`, values);

    return (dispatch) => {
        request.then((res) => {

            dispatch({
                type: ADD_LOCATION,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}

export function getLocation(callback) {
    // console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${URL}/rentalLocations`);

    return (dispatch) => {
        request.then((res) => {

            dispatch({
                type: GET_LOCATION,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}



export function updateLocation(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/rentalLocations/update`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: EDIT_LOCATION,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}

export function deleteLocation(values, callback) {
    console.log(values);

    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/rentalLocations/delete`,values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: DELETE_LOCATION,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}

export function vehicleNames(values, callback) {
    console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/vehicles/allVehicles/IDs`, values);

    return (dispatch) => {
        request.then((res) => {

            dispatch({
                type: vehicleNames,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}
import { FETCHVEHICLES, FETCHLOCATIONS, FETCHCURRENTVEHICLE, FETCHLOCATIONVEHICLES, FETCHUSER } from '../types/typeFetch';
import axios from 'axios';
import URL from '../../constants';

export function fetchVehicles(pageNum, callback) {
    axios.defaults.withCredentials = true;
    const request = axios
        .get(`${URL}/vehicles?pageNum=${pageNum}`);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: FETCHVEHICLES,
                payload: res.data
            });
            callback(res)
        })
        request.catch((error) => {
            callback(error)
        })
    }
}

export function fetchVehicle(vid, callback) {
    axios.defaults.withCredentials = true;
    const request = axios
        .get(`${URL}/vehicles/${vid}`);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: FETCHCURRENTVEHICLE,
                payload: res.data
            });
            callback(res)
        })
        request.catch((error) => {
            callback(error)
        })
    }
}

export function fetchLocations(searchText, pageNum, callback) {
    axios.defaults.withCredentials = true;
    let locationURL = `${URL}/rentalLocations`
    if (searchText.length > 0) {
        locationURL += `?searchText=${searchText}&pageNum=${pageNum}`
    }else {
        locationURL += `?pageNum=${pageNum}`
    }
    const request = axios
        .get(locationURL);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: FETCHLOCATIONS,
                payload: res.data
            });
            if (callback){
                callback(res)
            }
        })
        request.catch((error) => {
            if (callback){
                callback(error)
            }
        })
    }
}

export function fetchVehicleForLocationWithID(id, callback) {
    axios.defaults.withCredentials = true;
    let locationURL = `${URL}/rentalLocations/${id}`
    const request = axios
        .get(locationURL);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: FETCHLOCATIONVEHICLES,
                payload: res.data
            });
            callback(res)
        })
        request.catch((error) => {
            callback(error)
        })
    }
}

export function fetchUser(id, callback) {
    axios.defaults.withCredentials = true;
    let locationURL = `${URL}/users/${id}`
    const request = axios
        .get(locationURL);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: FETCHUSER,
                payload: res.data
            });
            callback(res)
        })
        request.catch((error) => {
            callback(error)
        })
    }
}
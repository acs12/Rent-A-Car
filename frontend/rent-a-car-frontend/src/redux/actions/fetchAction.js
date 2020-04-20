import { FETCHVEHICLES, FETCHLOCATIONS } from '../types/typeFetch';
import axios from 'axios';
import URL from '../../constants';

export function fetchVehicles(callback) {
    axios.defaults.withCredentials = true;
    const request = axios
        .get(`${URL}/vehicles`);

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

export function fetchLocations(callback) {
    axios.defaults.withCredentials = true;
    const request = axios
        .get(`${URL}/rentalLocations`);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: FETCHLOCATIONS,
                payload: res.data
            });
            callback(res)
        })
        request.catch((error) => {
            callback(error)
        })
    }
}
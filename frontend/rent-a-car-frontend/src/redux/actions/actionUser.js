import { DELETE_USER, GET_USER} from '../types/adminUser';
import axios from 'axios';
import URL from '../../constants';



export function getUser(callback) {
    // console.log(values);
    console.log("Inside Get User")
    axios.defaults.withCredentials = true;

    const request = axios
        .get(`${URL}/users`);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}

export function deleteUser(values, callback) {
    console.log(values);
    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/users/isValid`, values);

    return (dispatch) => {
        request.then((res) => {

            dispatch({
                type: DELETE_USER,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}
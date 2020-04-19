import { LOGIN, SIGNUP } from '../types/typeSignin';
import axios from 'axios';
import URL from '../../constants';



export function signup(values, callback) {
    console.log(values);
    axios.defaults.withCredentials = true;
    if (values.admin === false && values.manager === false) {
        const formData = new FormData();
        formData.append('admin', values.admin);
        formData.append('manager', values.manager);
        formData.append('name', values.name);
        formData.append("emailAddress", values.emailAddress);
        formData.append("password", values.password);
        formData.append('drivingLicense', values.drivingLicense);
        formData.append('residenceAddress', values.residenceAddress);
        formData.append('creditCardInfo', values.creditCardInfo);
        formData.append('phoneNumber', values.phoneNumber);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log("form data", formData)

        const request = axios
            .post(`${URL}/users`, formData,config);

        return (dispatch) => {
            request.then((res) => {
                dispatch({
                    type: SIGNUP,
                    payload: res.data
                });
                callback(res)

            })
        }
    }
    else {
        const request = axios
            .post(`${URL}/users`, values);

        return (dispatch) => {
            request.then((res) => {
                dispatch({
                    type: SIGNUP,
                    payload: res.data
                });
                callback(res)

            })
        }

    }



}



export function login(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .post(`${URL}/login`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: LOGIN,
                payload: res.data
            });
            callback(res)
        })
        request.catch((res) => {
            callback(res)
        })
    }

}
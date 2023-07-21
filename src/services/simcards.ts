
import axios from 'axios';
import * as c from '../utils/constants';
import { FieldValues } from 'react-hook-form';

const getData = async () => {
    try {
        const user = await localStorage.getItem('user')
        if (user !== null) {
            // value previously stored
            let token = JSON.parse(user);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
            axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
        }
    } catch (e) {
        // error reading value
        console.log(e);
    }
}
getData();

axios.interceptors.response.use(
    response => {
        return response
    },
    function (error) {
        if (error?.response?.status === 401) {
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export async function login(data: FieldValues) {
    try {
        let res = await axios.post(c.LOGIN, data);
        const storeData = async () => {
            try {
                const jsonValue = JSON.stringify(res.data)
                await localStorage.setItem('user', jsonValue)
            } catch (e) {
                throw handler(e);
            }
        }
        storeData();
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function forgotPassword(email: string) {
    try {
        let res = await axios.get(c.FORGOT_PASSWORD + email);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function changePassword(data: any) {
    try {
        let res = await axios.post(c.CHANGE_PASSWORD, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export function handler(err: any) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}

export async function getConferences() {
    try {
        let res = await axios.get(c.CONFERENCES);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getBookings(data: { page: number; }) {
    try {
        let res = await axios.get(c.SIMCARDS + "?page=" + data.page);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}
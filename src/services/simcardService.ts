
import axios from 'axios';
import * as c from '../utils/constants';

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

export async function getBookings(data: any) {
  try {
    let res = await axios.get(c.SIMCARDS);
    return res.data;
  } catch (e) {
    throw handler(e);
  }
}

export async function deleteBooking(userId: any) {
  try {
      let res = await axios.delete(c.SIMCARDS + "/" + userId);
      return res.data;
  } catch (e) {
      throw handler(e);
  }
}

export async function updateBooking(bookingId: string, updatedData: any) {
  try {
    const res = await axios.put(c.SIMCARDS + "/" + bookingId, updatedData);
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
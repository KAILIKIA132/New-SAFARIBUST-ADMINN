
import axios from 'axios';
import * as c from '../utils/constants';
import { FieldValues } from 'react-hook-form';

export const getData = async () => {
    try {
        const user = await localStorage.getItem('user')
        if (user !== null) {
            // value previously stored
            let token = JSON.parse(user);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
            axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
            return JSON.parse(user);
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




export async function getUserData() {
    try {
      // Get user data from local storage
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user;
      } else {
        throw new Error("User data not found");
      }
    } catch (e) {
      throw handler(e);
    }
  }




export async function getRoles() {
    try {
        let res = await axios.get(c.ROLES);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function createRole(data: FieldValues) {
    try {
      let res = await axios.post(c.ROLES, data);
      return res.data;
    } catch (e) {
      throw handler(e);
    }
  }

export async function deleteRole(id: any) {
    try {
      let res = await axios.delete(c.ROLES + "/" + id);
      return res.data;
    } catch (e) {
      throw handler(e);
    }
  }
export async function signup(data: FieldValues) {
    try {
        let res = await axios.post(c.REGISTER, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function forgotPassword(email: string) {
    try {
        let res = await axios.post(c.FORGOT_PASSWORD + email);
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

export async function getDashboard() {
    try {
        let res = await axios.get(c.DASHBOARD);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getConferences() {
    try {
        let res = await axios.get(c.CONFERENCES);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getThemes(data: { page: number; }) {
    try {
        let res = await axios.get(c.THEMES + "?page=" + data.page);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getEvents(data: { page: any; }) {
    try {
        let res = await axios.get(c.EVENTS + "?page=" + data.page);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getUsers(data: { page: number; }) {
    try {
        let res = await axios.get(c.USERS + "?page=" + data.page);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function addMake(data: FieldValues) {
    try {
        console.log(data);
        let res = await axios.post(c.MAKES, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}


export async function getMakes(data: { page: number; }) {
    try {
        let res = await axios.get(c.MAKES + "?page=" + data.page);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function deleteMakes(makeId: any) {
    try {
        let res = await axios.delete(c.MAKES + "/" + makeId);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}



export async function getModel(makeId: any) {
    try {
        console.log(makeId);
        let res = await axios.get(c.Models+ "/"+ makeId);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}






export async function addFinanciers(data: FieldValues) {
    try {
        console.log(data);
        let res = await axios.post(c.FINANCIERS, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}



export async function getFinancier(data: { page: number; }) {
    try {
        let res = await axios.get(c.FINANCIERS + "?page=" + data.page);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}


export async function deleteFinancier(financierId: any) {
    try {
        let res = await axios.delete(c.FINANCIERS + "/" + financierId);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}



export async function getValuers(data: { page: number; }) {
    try {
        let res = await axios.get(c.VALUERS + "?page=" + data.page);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}




export async function deleteValuer(valuerId: any) {
    try {

        let res = await axios.delete(c.VALUERS + "/" + valuerId);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}



export async function addValuers(data: FieldValues) {
    try {
        console.log(data);
        let res = await axios.post(c.VALUERS, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }

}

export async function addSecurity(data: FieldValues) {
    try {
        console.log(data);
        let res = await axios.post(c.SECURITY_FEATURES, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getSecurity(data: { page: number; }) {
    try {
        let res = await axios.get(c.SECURITY_FEATURES + "?page=" + data.page);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function deleteSecurity(securityId: any) {
    try {
        let res = await axios.delete(c.SECURITY_FEATURES + "/" + securityId);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function deleteUser(userId: any) {
    try {
        let res = await axios.delete(c.USERS + "/" + userId);
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
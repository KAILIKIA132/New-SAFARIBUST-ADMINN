
import axios from 'axios';
import * as c from '../utils/constants';
import { FieldValues } from 'react-hook-form';

//Users
export const createUser = async (username:any, phone:any, password:any, roleId:any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const graphql = JSON.stringify({
    query: "mutation createAdmin ($userInput: AdminUserInput) {\n    createAdmin (userInput: $userInput) {\n        userId\n        token\n        type\n        username\n        online\n        phone\n        dataToken\n        tokenExpiration\n        otp\n    }\n}",
    variables: {"userInput":{"username":username,"phone":phone,"password":password,"roleId":roleId}}
  })
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow' as RequestRedirect
  };

  
  try {
    const response = await fetch(c.BASE_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)
    return data; 
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; 
  }
}
  
 
    
  

  //fetchusers
  export const getUsers = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const graphqlQuery = {
        query: `
          query admins {
            admins {
              _id
              phone
              password
              username
              createdAt
              updatedAt
            }
          }
        `,
        variables: {}
      };
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(graphqlQuery),
        redirect: 'follow' as RequestRedirect
      };
  
      const response = await fetch(c.BASE_URL, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      return result.data.admins;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };
  
  

  
//Roles
export  const createRole = async (name:any,permissions:any)  => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const graphql = JSON.stringify({
      query: `mutation createRole($roleInput: CreateRoleInput) {
        createRole(roleInput: $roleInput) {
          _id
          name
          permissions {
            _id
            entity_name
            action_name
            description
          }
        }
      }`,
      variables: {
        "roleInput": {
          "name": name,
          "permissions": permissions
        }
      }
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow' as RequestRedirect
    };
  
    try {
      const response = await fetch(c.BASE_URL, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  

  
//getRoles
export const getRoles = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = {
    query: `query roles {
      roles {
        _id
        name
        permissions {
          _id
          entity_name
          action_name
          description
        }
      }
    }`,
    variables: {}
  };
 
  
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(graphql),
    redirect: 'follow' as RequestRedirect
  };

  try {
    const response = await fetch(c.BASE_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    
    if (result.data && result.data.roles) {
      return result.data.roles;
    } else {
      throw new Error('Failed to fetch roles');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; 
  }
}


  
  //permissions
  //getpermissions
  export const fetchPermissions = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const graphql = JSON.stringify({
      query: `query permissions {
        permissions {
          _id
          entity_name
          action_name
          description
        }
      }`,
      variables: {}
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow' as RequestRedirect
    };
  
    try {
      const response = await fetch(c.BASE_URL, requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  

  //logs
  //createlogs
export const createLogs = async (ip:any, description:any, round:any, userId:any, point:any, at:any, crush:any)  => {
    const query = `
      mutation createLogs($logsInput: LogsInput) {
        createLogs(logsInput: $logsInput) {
          _id
          ip
          description
          transactionId
          user {
            _id
            phone
            type
            active
            online
            password
            dataToken
            username
            label
            firstDeposit
            createdAt
            updatedAt
          }
          round
          point
          at
          crush
          balance
          won
          createdAt
          updatedAt
        }
      }
    `;
  
    const variables = {
      "logsInput": {
        "ip": ip,
        "description": description,
        "round": round,
        "userId": userId,
        "point": point,
        "at": at,
        "crush": crush
      }
    };
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        query: query,
        variables: variables
      }),
      redirect: 'follow' as RequestRedirect
    };
  
    try {
      const response = await fetch(c.BASE_URL, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('error', error);
    }
  }
  
  //fetchSystemLogs
 export const getAccessLogs = async() =>  {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const graphql = JSON.stringify({
    query: "query systemLogs {\n    systemLogs {\n        _id\n        ip\n        description\n        user {\n            _id\n            phone\n         \n            \n            online\n            password\n         \n            username\n            label\n            firstDeposit\n            createdAt\n            updatedAt\n        }\n        round\n        point\n        at\n        crush\n        won\n        createdAt\n        updatedAt\n    }\n}",
    variables: {}
  })
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow' as RequestRedirect
  };
  
  try {
    const response = await fetch(c.BASE_URL, requestOptions);
    const res = await response.json();
    return res.data.systemLogs;
  } catch (error) {
    console.log('error', error);
  }
  }
  

//PLAYERS
//getplayers
export const getAllPlayers = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: `
      query getAllPlayers {
        getAllPlayers {
          _id
          phone
          type
          active
          online
          password
          dataToken
          username
          otp
          label
          firstDeposit
          createdAt
          updatedAt
          bets {
            _id
            betAmount
            point
            userId {
              _id
              phone
              type
              active
              online
              password
              dataToken
              username
              otp
              label
              firstDeposit
              createdAt
              updatedAt
            }
            round
            possibleWin
            win
            createdAt
            updatedAt
          }
        }
      }
    `,
    variables: {},
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow' as RequestRedirect,
  };

  try {
    const response = await fetch(c.BASE_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result.data.getAllPlayers; 

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}


//bets
export const fetchBets = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: `
      query allBets {
        allBets {
          _id
          betAmount
          point
          round
          win
          userId {
            _id
            phone
            type
            active
            online
            password
            dataToken
            username
            label
            firstDeposit
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
    `,
    variables: {}
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: graphql,
    redirect: 'follow' as RequestRedirect
  };
  try {
    const response = await fetch(c.BASE_URL, requestOptions);
    const data = await response.json();
    console.log(data.data.allBets);
    return data.data.allBets;
  } catch (error) {
    console.log('Error:', error);
    throw error; 
  }
}


  //Fetchaccounts
  export const getAllAccounts = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const graphql = JSON.stringify({
      query: `
        query accounts {
          accounts {
            _id
            balance
            active
            user {
              _id
              phone
              type
              active
              online
              password
              dataToken
              username
              otp
              label
              firstDeposit
              createdAt
              updatedAt
              bets {
                _id
                betAmount
                point
                userId {
                  _id
                  phone
                  type
                  active
                  online
                  password
                  dataToken
                  username
                  otp
                  label
                  firstDeposit
                  createdAt
                  updatedAt
                }
                round
                possibleWin
                win
                createdAt
                updatedAt
              }
            }
            phone
            createdAt
            updatedAt
          }
        }
      `,
      variables: {}
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow' as RequestRedirect
    };
  
    try {
      const response = await fetch(c.BASE_URL, requestOptions);
      const accounts = await response.json();
      console.log(accounts);
      // return accounts;
    } catch (error) {
      console.log('Error:', error);
      throw error; // Rethrow the error to handle it at a higher level if needed.
    }
  };

  //allTransactions
  export const getAllTransactions = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const graphql = JSON.stringify({
      query: `
        query allTransactions {
          allTransactions {
            _id
            type
            amount
            user {
              _id
              phone
              type
              active
              online
              password
              dataToken
              username
              label
              firstDeposit
              createdAt
              updatedAt
            }
            transactionId
            trans_id
            bill_ref_number
            trans_time
            balance
            MerchantRequestID
            CheckoutRequestID
            mpesaReceiptNumber
            username
            createdAt
            updatedAt
          }
        }
      `,
      variables: {}
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow' as RequestRedirect
    };
  
    try {
      const response = await fetch(c.BASE_URL, requestOptions);
      const transactions = await response.json();
      return transactions.data.allTransactions;
    } catch (error) {
      console.log('Error:', error);
      throw error; // Rethrow the error to handle it at a higher level if needed.
    }
  };

  //logs for players
export const getLogs= async () => {
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const graphql = JSON.stringify({
  query: `
    query logs {
      logs {
        _id
        ip
        description
        transactionId
        user {
          _id
          phone
          type
          active
          online
          password
          dataToken
          username
          label
          firstDeposit
          createdAt
          updatedAt
        }
        round
        point
        at
        crush
        balance
        won
        createdAt
        updatedAt
      }
    }
  `,
  variables: {}
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow' as RequestRedirect
};
try {
  const response = await fetch(c.BASE_URL, requestOptions);
  const res = await response.json();
  console.log(res)
  // return data
} catch (error) {
  console.log('Error:', error);
  throw error;
}
  }

  //login
 export const handleLogin = async (username:any, password:any) => {
    const url = "https://sb-backend-test.onrender.com/graphql";
  
    const data = {
      query: `
        query adminLogin($loginInput: LoginInput) {
          adminLogin(loginInput: $loginInput) {
            userId
            token
            type
            username
            online
            phone
            dataToken
            tokenExpiration
            otp
          }
        }
      `,
      variables: {
        loginInput: {
          username: username,
          password: password,
        },
      },
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result.data.adminLogin);
      return result.data.adminLogin;
    } catch (error) {
      throw new Error(`HTTP error! `);
    }
  };
  

  

  
  









































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


export async function getPolicy() {
    try {
      let res = await axios.get(c.POLICY);
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

// export async function getUsers(data: { page: number; }) {
//     try {
//         let res = await axios.get(c.USERS + "?page=" + data.page);
//         return res.data;
//     } catch (e) {
//         throw handler(e);
//     }
// }






    export async function addEmailOTP(data: FieldValues) {
    try {
        console.log(data);
 let res = await axios.post(c.REGISTER + "/otp", data);
 const storeData = async () => {
    try {
        const jsonValue = JSON.stringify(res.data)
        await localStorage.setItem('otp', jsonValue)
    } catch (e) {
        throw handler(e);
    }
}
storeData();
 
        return res.data;

    } catch (e) {
        throw handler(e);
    }
}

export async function verifyEmailOTP(data: FieldValues) {
    try {
        console.log(data);
 let res = await axios.post(c.REGISTER + "/verify", data);
 
        return res.data;

    } catch (e) {
        throw handler(e);
    }
}

export async function passwordReset(data: FieldValues) {
    try {
        console.log(data);
 let res = await axios.post(c.REGISTER + "/password", data);
 
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



export async function getModel(selectedMakeId: any) {
    try {
        console.log(selectedMakeId);
        let res = await axios.get(c.Models+ "/"+ selectedMakeId);
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



export async function exportValuers() {
    try {
      let res = await axios.get(c.VALUERS);
      return res.data;
    } catch (e) {
      throw handler(e);
    }
  };




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
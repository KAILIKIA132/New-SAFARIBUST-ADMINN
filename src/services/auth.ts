
import axios from 'axios';
import * as c from '../utils/constants';

const getData = async () => {
    try {
        const user = await localStorage.getItem('user')
        if (user !== null) {
            // value previously stored
            let token = JSON.parse(user);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
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

export async function register(data) {
    try {
        let res = await axios.post(c.REGISTER, data);
        return res.data;
    } catch (e) {
        throw handler(e)
    }
}

export async function login(data) {
    try {
        let res = await axios.post(c.LOGIN, data);
        const storeData = async () => {
            try {
                const credentials = JSON.stringify(data)
                const jsonValue = JSON.stringify(res.data.data)
                await AsyncStorage.setItem('credentials', credentials)
                await AsyncStorage.setItem('user', jsonValue)
            } catch (e) {
                throw handler(e);
            }
        }
        storeData();
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.data.access_token}`;
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function forgotPassword(email) {
    try {
        let res = await axios.get(c.FORGOT_PASSWORD + email);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function changePassword(data) {
    try {
        let res = await axios.post(c.CHANGE_PASSWORD, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function biometricAuthentication(data) {
    try {
        let res = await axios.post(c.BIOMETRIC_AUTHENTICATION, data);
        const storeData = async () => {
            try {
                const credentials = JSON.stringify(data)
                const jsonValue = JSON.stringify(res.data.data)
                await AsyncStorage.setItem('credentials', credentials)
                await AsyncStorage.setItem('user', jsonValue)
            } catch (e) {
                throw handler(e);
            }
        }
        storeData();
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.data.access_token}`;
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getEmployees() {
    try {
        let res = await axios.post(c.EMPLOYEES);
        return res.data.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getDepartments() {
    try {
        let res = await axios.post(c.DEPARTMENTS);
        return res.data.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getNotifications() {
    try {
        let res = await axios.get(c.NOTIFICATIONS);
        return res.data.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function readNotification(data) {
    try {
        data.status = 1;
        let res = await axios.put(c.NOTIFICATIONS + '/' + data.id, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function clearNotifications() {
    try {
        let res = await axios.post(c.NOTIFICATIONS + '/delete', {});
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function deleteNotification(data) {
    try {
        let res = await axios.delete(c.NOTIFICATIONS + '/' + data.id);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function deleteCategory(data) {
    try {
        let res = await axios.delete(c.EXPENSE_CATEGORY + '/' + data.id);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getExpenseCategories() {
    try {
        let res = await axios.post(c.EXPENSE_CATEGORIES);
        return res.data.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getExpenses(data) {
    try {
        var size = data.size ? '&size=' + data.size : "";
        let res = await axios.post(c.EXPENSES + "?page=" + data.page + size, data);
        return res;
    } catch (e) {
        throw handler(e);
    }
}

export async function updateExpense(data) {
    try {
        let res = await axios.put(c.EXPENSE + "/" + data.id, data);
        return res;
    } catch (e) {
        throw handler(e);
    }
}

export async function uploadExpenseReceipt(data) {
    try {
        let res = await axios.post(c.UPLOAD_RECEIPT + data.id, data);
        return res;
    } catch (e) {
        throw handler(e);
    }
}

export async function getMonthlyExpenses(data) {
    try {
        let res = await axios.post(c.MONTHLY_EXPENSES, data);
        return res.data.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function createBudget(data) {
    try {
        let res = await axios.post(c.BUDGETS, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getBudgets(data) {
    try {
        var size = data.size ? '&size=' + data.size : "";
        let res = await axios.get(c.BUDGETS + "?page=" + data.page + size);
        return res;
    } catch (e) {
        throw handler(e);
    }
}

export async function getPaymentApprovalRequests(data) {
    try {
        var size = data.size ? '&size=' + data.size : "";
        let res = await axios.post(c.PAYMENT_APPROVAL_REQUEST + "?page=" + data.page + size);
        return res;
    } catch (e) {
        throw handler(e);
    }
}

export async function getPaymentApprovalDetails(data) {
    try {
        let res = await axios.get(c.PAYMENT_APPROVAL_DETAILS + data.id);
        return res;
    } catch (e) {
        throw handler(e);
    }
}
export async function approveRejectPayment(data) {
    try {
        let res = await axios.put(c.PAYMENT_APPROVAL_DETAILS + data.id, data);
        return res;
    } catch (e) {
        throw handler(e);
    }
}

export async function getBalance() {
    try {
        let res = await axios.post(c.ACCOUNT_BALANCE);
        return res.data.data.balance;
    } catch (e) {
        throw handler(e);
    }
}

export async function getProfile(id) {
    try {
        let res = await axios.get(c.PROFILE + id);
        return res;
    } catch (e) {
        throw handler(e);
    }
}

export async function getAccountStatement(data) {
    try {
        var size = data.size ? '&size=' + data.size : "";
        let res = await axios.post(c.ACCOUNT_STATEMENT + "?page=" + data.page + size, { start_date: data.start_date, end_date: data.end_date });
        return res;
    } catch (e) {
        throw handler(e);
    }
}

export async function walletTransaction(data) {
    try {
        let res = await axios.post(c.WALLET_TRANSACTION, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function walletDeposit(data) {
    try {
        let res = await axios.post(c.WALLET_DEPOSIT, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function walletTransfer(data) {
    try {
        let res = await axios.post(c.WALLET_TRANSFER, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getMoneyRequests(data) {
    try {
        let res = await axios.post(c.MONEY_REQUESTS, data);
        return res.data.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function requestMoney(data) {
    try {
        let res = await axios.post(c.REQUEST_MONEY, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function acceptRejectMoneyRequests(data) {
    try {
        let res = await axios.post(c.ACCEPT_REJECT_MONEY_REQUEST, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function stripeCharge(data) {
    try {
        let res = await axios.post(c.STRIPE_CHARGE, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function stkPushStatus(data) {
    try {
        let res = await axios.post(c.STK_PUSH_STATUS, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function buyAirtime(data) {
    try {
        let res = await axios.post(c.BUY_AIRTIME, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getBanks() {
    try {
        let res = await axios.post(c.BANKS);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function saveSettings(data) {
    try {
        let res = await axios.post(c.SETTINGS, data);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function getSettings() {
    try {
        let res = await axios.get(c.SETTINGS);
        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}
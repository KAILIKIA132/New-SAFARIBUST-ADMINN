
//API URL
export const BASE_URLS = 'http://localhost:8000/';

export const BASE_URL = 'https://palla.techsavanna.technology/palla-api/api/';

//API Endpoints
export const LOGIN = `${BASE_URLS}auth-service/auth/login`;
export const REGISTER = `${BASE_URLS}auth-service/auth/users/add`;
export const FORGOT_PASSWORD = `${BASE_URLS}send-password/`;
export const CHANGE_PASSWORD = `${BASE_URLS}change-password`;
export const ROLES = `${BASE_URLS}auth-service/auth/roles`;
export const CONFERENCES = `${BASE_URLS}events-service/conference`;
export const THEMES = `${BASE_URLS}events-service/theme`;
export const EVENTS = `${BASE_URLS}events-service/event`;
export const DASHBOARD = `${BASE_URLS}events-service/event/dashboard`;
export const USERS = `${BASE_URL}completed`;
//Simcards Endpoints
export const SIMCARDS = `${BASE_URLS}simcard-service/simcards`;


//Payments Endpoints
export const WALLETS = `${BASE_URLS}payments-service/wallets`;
export const TRANSACTIONS = `${BASE_URLS}payments-service/transactions`; 

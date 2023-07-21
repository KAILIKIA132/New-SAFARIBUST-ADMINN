
//API URL
// export const BASE_URL = 'https://www.staging-acs-mobile.bayesconsultants.com/api/';
export const BASE_URL = 'http://localhost:8000/';

//API End Points
export const LOGIN = `${BASE_URL}auth-service/auth/login`;
export const FORGOT_PASSWORD = `${BASE_URL}send-password/`;
export const CHANGE_PASSWORD = `${BASE_URL}change-password`;
export const CONFERENCES = `${BASE_URL}events-service/conference`;
export const THEMES = `${BASE_URL}events-service/theme`;
export const EVENTS = `${BASE_URL}events-service/event`;
export const USERS = `${BASE_URL}auth-service/auth/users`;

export const SIMCARDS = `${BASE_URL}simcard-service/bookings`;
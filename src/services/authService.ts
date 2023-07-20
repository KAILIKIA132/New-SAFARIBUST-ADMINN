export type AuthData = {
  user: object;
};
const signIn = (data): Promise<AuthData> => {
  // this is a mock of an API call, in a real app
  // will be need connect with some real API,
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: data,
      });
    }, 1000);
  });
};

export const authService = {
  signIn,
};

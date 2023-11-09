import axios from "axios";
import { store } from "../config/configRedux";
import _socket from "../config/socket";
import { showToastNotification } from "../reducers/alertReducer";
import { logoutReady, updateUserToken } from "../reducers/userReducer";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export const PROMOTION_API = axios.create({
  baseURL: process.env.REACT_APP_PROMOTION_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + localStorage.getItem("token"),
    authorization: "Bearer " + localStorage.getItem("token"),
    "x-access-refactor-token": localStorage.getItem("token"),
    'x-time-zone': - new Date().getTimezoneOffset()/60
  },
});

(function () {
  let authToken = localStorage.getItem("token");
  if (authToken === "null" || authToken === null) {
    axios.defaults.headers.common.Authorization = null;
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
})();

PROMOTION_API.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (er) {
    if (axios.isAxiosError(er)) {
      if (er.response) {
        if (er.response.status === 401 || er.response.status === 403) {
        }

        if (er.response.status === 410) {
          const res = await PROMOTION_API.post(
            "/api/authenticate/refresh-token",
            {
              refreshToken: localStorage.getItem("refreshToken"),
            },
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-refresh-token": localStorage.getItem("refreshToken"),
              },
            }
          );
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
          store.dispatch(updateUserToken(res.data.data.token))
          _socket.emit("loginSocial", {
            token: res.data.data.token
          });
          store.dispatch(showToastNotification({
            type: 'success',
            message: "Please do again!"
          }))
        }

        if (er.response.status === 411) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          store.dispatch(logoutReady())
        }
      }
    }

    return Promise.reject(er.response.data);
  }
);

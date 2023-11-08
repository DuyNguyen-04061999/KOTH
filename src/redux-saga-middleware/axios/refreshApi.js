import axios from "axios";
import { store } from "../config/configRedux";
import { showToastNotification } from "../reducers/alertReducer";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export const REFRESH_API = axios.create({
  baseURL: process.env.REACT_APP_PROMOTION_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + localStorage.getItem("testToken"),
    authorization: "Bearer " + localStorage.getItem("testToken"),
    "x-access-refactor-token": localStorage.getItem("testToken"),
    "x-time-zone": -new Date().getTimezoneOffset() / 60,
  },
});

(function () {
  let authToken = localStorage.getItem("testToken");
  if (authToken === "null" || authToken === null) {
    axios.defaults.headers.common.Authorization = null;
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
})();

REFRESH_API.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (er) {
    if (axios.isAxiosError(er)) {
      if (er.response) {
        if (er.response.status === 401 || er.response.status === 403) {
        }

        if (er.response.status === 410) {
          store.dispatch(showToastNotification());

          const res = await REFRESH_API.post(
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
          localStorage.setItem("testToken", res.data.data.token);
          localStorage.setItem("refreshToken", res.data.data.refreshToken);
        }

        if (er.response.status === 411) {
          localStorage.removeItem("testToken");
          localStorage.removeItem("refreshToken");
        }
      }
    }

    return Promise.reject(er.response.data);
  }
);

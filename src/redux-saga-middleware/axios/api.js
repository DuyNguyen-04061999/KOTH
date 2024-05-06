import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export const API = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + (localStorage.getItem("token") || localStorage.getItem("token_guest")) ,
    "x-access-token": (localStorage.getItem("token") || localStorage.getItem("token_guest")),
    "x-access-refactor-token": (localStorage.getItem("token") || localStorage.getItem("token_guest")),
    "x-time-zone": -new Date().getTimezoneOffset() / 60,
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

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (er) {
    if (axios.isAxiosError(er)) {
      if (er.response) {
        if (er.response.status === 401 || er.response.status === 403) {
        }
      }
    }

    return Promise.reject(er.response.data);
  }
);

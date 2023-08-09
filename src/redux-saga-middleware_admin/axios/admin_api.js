import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export const ADMIN_API = axios.create({
  baseURL: process.env.REACT_APP_END_POINT,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + localStorage.getItem("token_admin"),
  },
});

(function () {
  let authToken = localStorage.getItem("token_admin");
  if (authToken === "null" || authToken === null) {
    axios.defaults.headers.common.Authorization = null;
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
})();

ADMIN_API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (er) {
    if (axios.isAxiosError(er)) {
      if (er.response) {
        if (er.response.status === 401 || er.response.status === 403) {
          localStorage.removeItem("token_admin");
        }
      }
    }

    return Promise.reject(er.response.data);
  }
);

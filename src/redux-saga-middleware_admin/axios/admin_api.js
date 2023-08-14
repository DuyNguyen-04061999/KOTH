import axiosAdmin from "axios";

axiosAdmin.defaults.withCredentials = true;
axiosAdmin.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export const ADMIN_API = axiosAdmin.create({
  baseURL: process.env.REACT_APP_API_ADMIN_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer " + localStorage.getItem("token_admin"),
    "x-access-token": localStorage.getItem("token_admin"),
  },
});

(function () {
  let authToken = localStorage.getItem("token_admin");
  if (authToken === "null" || authToken === null) {
    axiosAdmin.defaults.headers.common.Authorization = null;
  } else {
    axiosAdmin.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
})();

ADMIN_API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (er) {
    if (axiosAdmin.isAxiosError(er)) {
      if (er.response) {
        if (er.response.status === 401) {
          localStorage.removeItem("token_admin");
        }

        if(er.response.status === 403) {
          
        }
        return Promise.reject(er.response.data);
      }
      
    }
    return Promise.reject(er.response.data);
  }
);

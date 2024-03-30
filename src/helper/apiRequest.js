import axios from 'axios'
import momentTimezone from 'moment-timezone'
// import modalNotification from "../utils/notifications";
// import {
//   removeLocalStorageToken,
//   removeSessionStorageToken,
//   // getSessionStorageToken,
//   getLocalStorageToken,
//   // getLocalStorageLanguage,
// } from "../utils/common.util";

// import config from "../config";
// import logger from "../utils/logger";
// import { loadPermission } from "../redux/permissions/permission.slice";
// import store from "../redux/store";
// import { logout } from "../redux/AuthSlice/index.slice";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const APIrequest = async ({
  method,
  url,
  baseURL,
  queryParams,
  bodyData,
  cancelFunction,
  formHeaders,
  removeHeaders,
  fileData,
  token = ''
}) => {
  // const apiToken = token !== "" ? token : getLocalStorageToken();
  const apiToken = localStorage.getItem('auth')

  // const language = getLocalStorageLanguage();
  try {
    const axiosConfig = {
      method: method || 'GET',
      // baseURL: config.BASE_URL,
      url: url,
      data: bodyData,
      headers: {
        // "Content-Type": "multipart/form-data",
        'X-Frame-Options': 'sameorigin',
        timezone: momentTimezone.tz.guess(true)
        // language,
      }
    }

    if (formHeaders) {
      axiosConfig.headers = { ...axiosConfig.headers, ...formHeaders }
    }

    if (baseURL) {
      axiosConfig.baseURL = baseURL
    }

    if (url) {
      axiosConfig.url = url
    }

    if (queryParams) {
      const queryParamsPayload = {}
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key]
          if (typeof element === 'string') {
            element = element.trim()
          }
          if (!['', null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element
          }
        }
      }
      axiosConfig.params = queryParamsPayload
    }

    if (bodyData) {
      const bodyPayload = {}
      for (const key in bodyData) {
        if (Object.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData[key]
          if (typeof element === 'string') {
            element = element.trim()
          }
          if (![null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element
          }
        }
      }
      axiosConfig.data = bodyPayload
    }

    if (fileData) {
      axiosConfig.headers['Content-Type'] = 'multipart/form-data';
      axiosConfig.data = fileData;
    }

    if (cancelFunction) {
      axiosConfig.cancelToken = new axios.CancelToken((cancel) => {
        cancelFunction(cancel)
      })
    }

    if (removeHeaders) {
      delete axiosConfig.headers
    }

    if (apiToken){
      axiosConfig.headers = {
        ...axiosConfig.headers,
        authorization: `Bearer ${apiToken}`
      }
    }

    const res = await axios(axiosConfig)
    return res?.data
  } catch (error) {
    // alert(error?.response?.data?.message)
    //   if (axios.isCancel(error)) {
    //     // logger("API canceled", error);
    //     throw new Error(error);
    //   } else {
    //     const errorRes = error.response;
    //     // logger("Error in the api request", errorRes);
    //     if (errorRes && errorRes.status && errorRes.status === 403) {
    //       /** *Update permission***** */
    //       // store.dispatch(loadPermission({}, true));
    //     }
    //     if (errorRes.data.message) {
    //       // modalNotification({
    //       //   type: "warning",
    //       //   message: errorRes.data.message,
    //       // });
    //       if ([401].includes(errorRes.status)) {
    //         // removeLocalStorageToken();
    //         // removeSessionStorageToken();
    //         let path =
    //           window.location.pathname.search("admin") > 0 ? "/admin" : "/";
    //         window.location.replace(path);
    //         // store.dispatch(logout());
    //       }
    //     } else {
    //       // modalNotification({
    //       //   type: "warning",
    //       //   message: errorRes?.data?.error[0]?.message || "Not Found",
    //       // });
    //     }
    //     if (
    //       "error" in errorRes.data &&
    //       Object.keys(errorRes.data.error).length &&
    //       [401].includes(errorRes.data.error.status)
    //     ) {
    //       // removeSessionStorageToken();
    //       // removeLocalStorageToken();
    //       let path =
    //         window.location.pathname.search("admin") > 0 ? "/admin" : "/";
    //       window.location.replace(path);
    //     }
    //     if (errorRes?.data?.message) {
    //       modalNotification({
    //         type: "error",
    //         message: errorRes?.data?.message,
    //       });
    //     }
    //     return null;
    //   }
    // }
  }
}
export default APIrequest

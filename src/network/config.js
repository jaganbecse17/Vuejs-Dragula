import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "@/utils/toast";
// baseUrl for all request
axios.defaults.baseURL = process.env.VUE_APP_DOMAIN;
// check req & res on every api call
axios.interceptors.response.use(
  (res) => {
    Alert_Error(res);
    return res;
  },
  (err) => {
    Capture_Error(err);
    return err;
  }
);

export default {
  Get_Api: async (path) => {
    return axios({
      url: path,
      method: "get",
    });
  },
  Post_Api: async (path, data) => {
    return axios({
      url: path,
      method: "post",
      data: data,
    });
  },
  Get_Api_Auth: async (path) => {
    return axios({
      url: path,
      method: "get",
      headers: {
        auth: "token",
        uuid: uuidv4(),
      },
    });
  },
  Post_Api_Auth: async (path, data) => {
    return axios({
      url: path,
      method: "get",
      data: data,
      headers: {
        auth: "token",
      },
    });
  },
};

function Alert_Error(res) {
  console.log("axios res", res);
  if (res.data.Error === "error" && res.data.Error_Description) {
    // alert(res.data.Error_Description);
    Toast(res.config.url, res.data.Error_Description, "danger");
  }
}

function Capture_Error(err) {
  console.log("axios err", err);
  if (err.code && err.message) {
    Toast("Api Call", err.message, "danger");
  }
}

import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;

export function listQualityApi() {
  return axios.get(`${baseURL}/report/dataQuality`, {

  });
}


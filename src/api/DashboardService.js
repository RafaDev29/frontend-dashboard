import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;

export function listDashboardApi() {
  return axios.get(`${baseURL}/report`, {
    //     //         // headers: {
    //     //         //     Authorization: `Bearer ${token}`,
    //     //         // },
  });
}

//import data from '@/api/data.json';

//export function listDashboardApi() {
//  console.log(data)
//return data;
//}

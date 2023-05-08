import axios from "axios";

export const get = (url: string, header?: any) => {
  return axios.get(url).catch((err) => console.log(err));
};

export const post = (url: string, data: any, header?: any) => {
  return axios.post(url, data);
};

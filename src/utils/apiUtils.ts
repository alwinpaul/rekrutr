import axios from "axios";
import { string } from "yup";

export const get = (url: string, header?: any) => {
  const config = {
    headers: {
      "x-access-token": '',
      ...header
    }
  };

  let accessTkn = localStorage.getItem('_aut-tt');
  if (accessTkn) {
    config.headers['x-access-token'] = accessTkn
  }

  return axios.get(url, config).catch((err) => console.log(err));
};

export const post = (url: string, data: any, header: any = {}) => {

  const config = {
    headers: {
      "x-access-token": '',
      ...header
    }
  };

  let accessTkn = localStorage.getItem('_aut-tt');
  if (accessTkn) {
    config.headers['x-access-token'] = accessTkn
  }
  return axios.post(url, data, config);
};

import Axios from 'axios';
import {url} from '../api/api';

export const axiosGet = async (path, headers) => {
  const request = await Axios.get(`${url}/${path}`, headers).then(
    (res) => res.data,
  );
  return request;
};

export const axiosPost = async (path, data, headers) => {
  const request = await Axios.post(`${url}/${path}`, data, headers).then(
    (res) => res.data,
  );
  return request;
};

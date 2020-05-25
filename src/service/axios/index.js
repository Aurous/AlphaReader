import axios from 'axios';
import AppConfig from '../../config/app';

export const initAxios = async () => {
  return axios.create({
    baseURL: `${AppConfig.apiRoot}`,
  });
};

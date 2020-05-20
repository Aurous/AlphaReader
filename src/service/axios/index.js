import axios from 'axios';

export const initAxios = async () => {
  return axios.create({
    baseURL: 'http://manga.ryanhill.com',
  });
};

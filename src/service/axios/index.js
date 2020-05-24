import axios from 'axios';

export const initAxios = async () => {
  return axios.create({
    baseURL: 'https://manga.ryanhill.com',
  });
};

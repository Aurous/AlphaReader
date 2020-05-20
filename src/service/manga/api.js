import { initAxios } from '../axios';

// hard code source
export const search = (source) => initAxios().then((axios) => axios.get(`/search/${source}`));
export const chapters = (source, title) => initAxios().then((axios) => axios.get(`/search/${source}/${title}`));
export const pages = (source, title, chapter) => initAxios().then((axios) => axios.get(`/search/${source}/${title}/${chapter}`));
export const page = (source, title, chapter, page) => initAxios().then((axios) => axios.get(`/search/${source}/${title}/${chapter}/${page}`));
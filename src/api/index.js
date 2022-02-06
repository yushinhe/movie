import requests from './request';

const apiKey = '1fe0172be2575807b324e88819e2df9d';
export const getMovieList = (data) => requests(
  `/discover/movie?page=${data.page}&release_date.lte=2022-01-05&language=zh-TW&&sort_by=${data.type}.${data.order}&with_genres=${data.filterArr}&with_keywords=${data.keyWordList}&api_key=${apiKey}`,
);
export const getMovieDDB = () => requests(
  `/genre/movie/list?api_key=${apiKey}&language=zh-TW`,
);
export const getKeywordList = (str) => requests(
  `/search/keyword?query=${str}&api_key=${apiKey}`,
);

export const getMovieDetail = (id) => requests(
  `/movie/${id}?language=zh-TW&api_key=${apiKey}`,
);
export const getMovieActors = (id) => requests(
  `/movie/${id}/credits?language=zh-TW&api_key=${apiKey}`,
);

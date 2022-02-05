import requests from "./request";
const api_key = "1fe0172be2575807b324e88819e2df9d";
export const getMovieList = (data) => {
  return requests(
    `/discover/movie?page=${data.page}&release_date.lte=2022-01-05&language=zh-TW&&sort_by=${data.type}.${data.order}&with_genres=${data.filterArr}&with_keywords=${data.keyWordList}&api_key=${api_key}`
  );
};
export const getMovieDDB = () => {
  return requests(
    `/genre/movie/list?api_key=${api_key}&language=zh-TW`
  );
};
export const getKeywordList = (str) => {
  return requests(
    `/search/keyword?query=${str}&api_key=${api_key}`
  );
};

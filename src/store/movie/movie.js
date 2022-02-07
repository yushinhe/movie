/* eslint-disable no-shadow */
import { getMovieDDB } from '../../api';

const state = {
  movieDDB: null,
  actors: null,
  recommendationsMovie: null,
  favoriteMovie: [],
};
const getters = {};
const mutations = {
  setMovieDDB(state, data) {
    state.movieDDB = data;
  },
  setActors(state, data) {
    state.actors = data;
  },
  setRecommendationsMovie(state, data) {
    state.recommendationsMovie = data;
  },
  setFavoriteMovie(state, data) {
    state.favoriteMovie = data;
  },
};
const actions = {
  async setMovieDDB(context) {
    await getMovieDDB({}).then((res) => {
      context.commit('setMovieDDB', res.data.genres);
    });
  },
  setActors(context, data) {
    context.commit('setActors', data);
  },
  setRecommendationsMovie(context, data) {
    context.commit('setRecommendationsMovie', data);
  },
  setFavoriteMovie(context, data) {
    context.commit('setFavoriteMovie', data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

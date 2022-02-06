/* eslint-disable no-shadow */
import { getMovieDDB } from '../../api';

const state = {
  movieDDB: null,
};
const getters = {};
const mutations = {
  setMovieDDB(state, data) {
    state.movieDDB = data;
  },
};
const actions = {
  async setMovieDDB(context) {
    await getMovieDDB({}).then((res) => {
      context.commit('setMovieDDB', res.data.genres);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

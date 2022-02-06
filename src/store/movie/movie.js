/* eslint-disable no-shadow */
import { getMovieDDB } from '../../api';

const state = {
  movieDDB: null,
  actors: null,
};
const getters = {};
const mutations = {
  setMovieDDB(state, data) {
    state.movieDDB = data;
  },
  setActors(state, data) {
    state.actors = data;
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

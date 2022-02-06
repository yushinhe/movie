import Vue from 'vue';
import Vuex from 'vuex';
import movie from './movie/movie';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    movie,
  },
});

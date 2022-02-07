<template>
  <div class="main">
    <ul class="flex">
      <li
        v-for="item in recommendationsMovie"
        :key='item.id'
        class="mr-2 ml-2"
      >
        <el-image
          class="movie-img"
          :src='`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`'
        ></el-image>
        <div class="flex space-between">
          <router-link
            class="link black-word cursor-pointer"
            :to="{ name: 'movieDetail', params: { id: item.id }}"
          >
            <h4>{{item.title}}</h4>
          </router-link>
          <h4>{{parseInt(item.vote_average * 10)}}%</h4>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'RecommendationsMovies',
  data() {
    return {

    };
  },
  computed: {
    recommendationsMovie: {
      get() {
        return this.$store.state.movie.recommendationsMovie;
      },
    },
  },

  created() {

  },
  methods: {

  },
  watch: {},
};
</script>
<style lang="scss" scoped >
.movie-img {
  width: 250px;
}
.main {
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: lightgrey;
  }
}
</style>

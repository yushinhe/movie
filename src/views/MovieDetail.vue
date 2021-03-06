<template>
  <div>
    <div
      class="bg"
      :style="{background:getBg(movieData)}"
    >
      <div class="banner"></div>
      <div class="container intro">
        <div> <template v-if="movieData.poster_path">
            <img
              class="poster"
              :src="`https://image.tmdb.org/t/p/w1280/${movieData.poster_path}`"
              alt=""
            />
          </template>
          <template v-else>
            <el-image class="poster no-image">
              <div
                slot="error"
                class="image-slot"
              >
                <i
                  style="font-size:100px"
                  class="el-icon-picture-outline"
                ></i>
              </div>
            </el-image>
          </template>
        </div>
        <div class="item-group mt-5">
          <h2 class="mb-2">{{movieData.title}}({{movieData.release_date.slice(0,4)}})</h2>
          <ul class="flex mb-2">
            <li
              v-for="item in movieData.genres"
              :key="item.id"
            ><span class="mr-2">{{item.name}}</span> </li>
          </ul>
          <to-rating @rate='rate'></to-rating>
          <div class="circle-progress flex mb-2">
            <el-progress
              :width='50'
              type="circle"
              :percentage="movieData.vote_average * 10"
              :format="format"
            ></el-progress>
            <h3
              class="ml-2"
              style="line-height:50px"
            >平均評分 :{{movieData.vote_average}}</h3>
          </div>
          <template v-if="movieData.tagline.length>0">
            <h3 class="italic">{{movieData.tagline}}</h3>
          </template>
          <div class="description mt-2">
            <h3>概要:</h3>
            <p> {{movieData.overview}}</p>
          </div>
          <h3 class="mt-2">拍攝公司:</h3>
          <ul class="flex mt-2">
            <li
              class="mr-2"
              v-for="item in movieData.production_companies"
              :key='item.id'
            >
              <h4> {{item.name}} </h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <h3 class="text-left mt-5 mb-2 ml-3">主要演員</h3>
      <div class="actor-carousal-list ">
        <div style="overflow-x:hidden">
          <ActorCarousel></ActorCarousel>
        </div>
        <div class="info-card text-left">
          <div
            class="info mb-3"
            v-for="(item,index) in originState"
            :key='index'
          >
            <h3>{{item.label}}:</h3>
            <p>{{movieData[item.value]}}</p>
          </div>
        </div>
      </div>
      <h3 class="text-left mt-5 mb-2 ml-3">相關推薦電影</h3>
      <div style="overflow-x:hidden" class="mb-5">

        <recommendations-movies></recommendations-movies>
      </div>
    </div>

  </div>
</template>
<script>
import {
  getMovieDetail, getMovieActors, getRecommendationsMovie,
} from '../api/index';
import ActorCarousel from '../components/ActorCarousel.vue';
import RecommendationsMovies from '../components/RecommendationsMovies.vue';
import ToRating from '../components/ToRating.vue';

export default {
  name: 'movieDetail',
  data() {
    return {
      movieData: null,
      originState: [{ label: '原始標題', value: 'original_title' }, { label: '狀態', value: 'status' }, { label: '原始語言', value: 'original_language' }, { label: '電影成本', value: 'budget' }, { label: '收入', value: 'revenue' }],
    };
  },
  components: { ActorCarousel, RecommendationsMovies, ToRating },
  computed: {
    movieId: {
      get() {
        return this.$route.params.id;
      },
    },
    actors: {
      get() {
        return this.$store.state.movie.actors;
      },
      set(val) {
        this.$store.dispatch('movie/setActors', val);
      },
    },
    recommendationsMovie: {
      get() {
        return this.$store.state.movie.recommendationsMovie;
      },
      set(val) {
        this.$store.dispatch('movie/setRecommendationsMovie', val);
      },
    },
    favoriteMovie: {
      get() {
        return this.$store.state.movie.favoriteMovie;
      },
      set(val) {
        this.$store.commit('movie/setFavoriteMovie', val);
      },
    },
  },
  created() {

  },
  methods: {
    async getMovieDetail(val) {
      await getMovieDetail(val)
        .then((res) => {
          console.log(val);
          console.log(res.data);
          this.movieData = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMovieActor(val) {
      await getMovieActors(val)
        .then((res) => {
          this.actors = res.data.cast;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getRecommendationsMovie(val) {
      await getRecommendationsMovie(val)
        .then((res) => {
          this.recommendationsMovie = res.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBg(data) {
      if (data) {
        return data.backdrop_path ? `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})` : '';
      }
      return '';
    },
    format(percentage) {
      return `${percentage}%`;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    rate(value) {
      const queryData = {
        rating: value,
        title: this.movieData.title,
        id: this.movieData.id,
        img: `https://image.tmdb.org/t/p/w1280/${this.movieData.poster_path}`,
        overview: this.movieData.overview,
        vote_average: this.movieData.vote_average,
        release_date: this.movieData.release_date,
      };
      if (this.favoriteMovie.length > 0) {
        this.favoriteMovie = this.favoriteMovie.filter((item) => item.id !== queryData.id);
      }
      this.favoriteMovie.push(queryData);
      this.$message({
        message: '評分成功',
        type: 'success',
      });
      this.$router.push({ name: 'RatingList' });
    },
  },
  watch: {
    movieId: {
      immediate: true,
      handler(newVal, oldVal) {
        this.getMovieDetail(newVal);
        this.getMovieActor(newVal);
        this.getRecommendationsMovie(newVal);
        this.scrollToTop();
      },
    },
  },
};
</script>
<style lang="scss" scoped >
.bg {
  padding: 30px;
  position: relative;
  .banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.6);
  }
  .intro {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 30px;
    @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
    }
    .poster {
   width: 100%;
      border-radius: 5px;
      &.no-image {
        background: lightgray;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .item-group {
      color: white;
      h2,
      h3 {
        text-align: left;
      }
      .description {
        text-align: left;
        font-weight: bold;
      }
    }
  }
}
.actor-carousal-list {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;
     @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
    }
  .info-card {
    padding: 20px 40px;
    background: lightgrey;
    border-radius: 10px;
    p {
      font-weight: thin;
      font-size: 20px;
    }
  }
}
</style>

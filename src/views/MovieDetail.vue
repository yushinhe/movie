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
        <div class="item-group">
          <h2 class="mb-2">{{movieData.title}}({{movieData.release_date.slice(0,4)}})</h2>
          <ul class="flex mb-2">
            <li
              v-for="item in movieData.genres"
              :key="item.id"
            ><span class="mr-2">{{item.name}}</span> </li>
          </ul>
          <div class="circle-progress flex mb-2">
            <el-progress
              :width='50'
              type="circle"
              :percentage="movieData.vote_average * 10"
              :format="format"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMovieDetail } from '../api/index';

export default {
  name: 'movieDetail',
  data() {
    return {
      movieData: null,
    };
  },
  computed: {
    movieId: {
      get() {
        return this.$route.params.id;
      },
    },
  },
  created() {
    this.getMovieDetail();
  },
  methods: {
    async getMovieDetail() {
      await getMovieDetail(this.movieId)
        .then((res) => {
          console.log(res.data);
          this.movieData = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBg(data) {
      if (data) {
        console.log(data ? `https://image.tmdb.org/t/p/w1280/${data.backdrop_path}` : '');
        return data.backdrop_path ? `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})` : '';
      }
      return '';
    },
    format(percentage) {
      return `${percentage}%`;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped >
.bg {
  padding: 30px;
  position: relative;
  z-index: -2;
  .banner {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.8);
  }
  .intro {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 30px;
    .poster {
      width: 300px;
      height: 450px;
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
      h2 {
        text-align: left;
      }
    }
  }
}
</style>

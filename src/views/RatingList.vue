  <template>
  <div class="container">
    <template v-if='favoriteMovie.length===0'>
      <h2 class="mt-5">目前無評分</h2>
    </template>

    <template v-else>
      <h2 class="mt-5 text-left ml-5">我的評分</h2>
      <div
        v-for="item in favoriteMovie"
        :key='item.id'
        class="flex  card"
      >
        <div class=" mr-5">
          <img :src="item.img">
        </div>
        <div class="pt-2 pb-2">
          <div class="flex">
            <el-progress
              :width='50'
              type="circle"
              :percentage="item.vote_average * 10"
              :format="format"
              class="mr-2 ml-2"
            ></el-progress>
            <div>
                 <router-link
                      class="link black-word cursor-pointer mb-1"
                      :to="{ name: 'movieDetail', params: { id: item.id }}"
                    >
                      <h3>{{item.title}}</h3>
                    </router-link>
              <p class="text-left">{{item.release_date}}</p>
            </div>
          </div>
          <div>
            <p class="mt-3 text-left pr-2">
              {{item.overview.length>120?`${item.overview.slice(0,115)}......`:item.overview}}
            </p>
          </div>
          <div class="flex mt-2">
            <p class="mr-2 rating-title">你的評分:</p>
            <div class="circle green-bg white-word mr-3"><span>{{item.rating}}</span></div>
            <el-button
              type="danger"
              round
              @click="removeRating(item.id)"
            >移除</el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    favoriteMovie: {
      get() {
        return this.$store.state.movie.favoriteMovie;
      },
      set(val) {
        this.$store.commit('movie/setFavoriteMovie', val);
      },
    },
  },
  methods: {
    removeRating(id) {
      this.favoriteMovie = this.favoriteMovie.filter((item) => item.id !== id);
      this.$message({
        message: '移除成功',
        type: 'success',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  border: 1px lightgray solid;
  border-radius: 20px;
  overflow: hidden;
  width: 1200px;
  margin: 2rem auto;
  img {
    width: 130px;
  }
  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    span {
      line-height: 40px;
    }
  }
  .rating-title {
    line-height: 40px;
  }
}
</style>

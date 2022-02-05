<template>
  <div class="container">

    <input
      type="text"
      v-model="search"
      @keyup.enter="searchMovie"
    />
    <el-row
      type="flex"
      :gutter="20"
    >
      <el-col
        :xs="8"
        :sm="6"
        :md="4"
      >
        <el-card
          class="box-card"
          :body-style="{ padding: '0px' }"
        >
          <div
            slot="header"
            class="clearfix sort-item"
          >
            <span class="sort-title">排序</span>
            <i
              :class="canSort?'el-icon-arrow-down cursor-pointer':'el-icon-arrow-right cursor-pointer'"
              @click="canSort = !canSort"
            ></i>
          </div>
          <div
            v-if="canSort"
            class="sort-body"
          >
            <el-select v-model="sortType">
              <el-option
                v-for="item in sortObject"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </el-card>
        <el-card
          class="box-card"
          :body-style="{ padding: '0px' }"
        >
          <div
            slot="header"
            class="clearfix sort-item"
          >
            <span class="sort-title">篩選</span>
            <i
              :class="canFilter?'el-icon-arrow-down cursor-pointer':'el-icon-arrow-right cursor-pointer'"
              @click="canFilter = !canFilter"
            ></i>
          </div>
          <div
            v-if="canFilter"
            class="sort-body"
          >
            <ul class="flex flex-wrap">
              <li
                v-for="item in movieDDB"
                :key='item.id'
                class="ml-1 mr-1 mb-3"
              > <span
                  :class="item.active?'active filter-btn':'filter-btn'"
                  @click="toggleFilter(item)"
                >{{item.name}}</span></li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="16"
        :sm="18"
        :md="20"
      >
        <ul class="card-group">
          <li
            v-for="item in movieList"
            :key="item.id"
          >
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix"
                style="position:relative"
              >
                <template v-if="item.backdrop_path">
                  <img
                    :src="`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`"
                    alt=""
                  />
                </template>
                <template v-else>
                  <div class="no-img-item">
                    <p>目前無海報</p>
                  </div>
                </template>
                <div class="circle-progress">
                  <el-progress
                    :width='50'
                    type="circle"
                    :percentage="item.vote_average * 10"
                    :format="format"
                  ></el-progress>
                </div>
              </div>

              <div class="info">
                <h3>{{item.title}}</h3>
                <p>上映日期:{{item.release_date}}</p>
              </div>
            </el-card>
          </li>
        </ul>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="current_change"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getMovieList, getSearchMovie } from '../api/index';
export default {
  name: 'about',
  data: function () {
    return {
      search: '',
      movieList: null,
      page: 1,
      totalPage: 500,
      canSort: false,
      canFilter: false,
      sortType: 1,
      filterArr: [],
      sortObject: [
        { id: 1, label: '按人氣降序' },
        { id: 2, label: '按人氣升序' },
        { id: 3, label: '按評價降序' },
        { id: 4, label: '按評價升序' },
        { id: 5, label: '按上映日期降序' },
        { id: 6, label: '按上映日期升序' },
        { id: 7, label: '按片名(A-Z)' },
        { id: 8, label: '按片名(Z-A)' },
      ],
    };
  },
  computed: {
    movieDDB: {
      get() {
        let obj = this.$store.state.movie.movieDDB;
        obj.map((item) => {
          item.active = false;
        });
        return obj;
      },
      set() {
        this.$store.commit('movie/setMovieDDB');
      },
    },
  },
  created() {
    this.$store.dispatch('movie/setMovieDDB');
  },
  methods: {
    current_change(currentPage) {
      this.page = currentPage;
    },
    async getMealData(page, type) {
      const queryData = { page: page };
      switch (type) {
        case 1:
          queryData.order = 'desc';
          queryData.type = 'popularity';
          break;
        case 2:
          queryData.order = 'asc';
          queryData.type = 'popularity';
          break;
        case 3:
          queryData.order = 'desc';
          queryData.type = 'vote_average';
          break;
        case 4:
          queryData.order = 'asc';
          queryData.type = 'vote_average';
          break;
        case 5:
          queryData.order = 'desc';
          queryData.type = 'primary_release_date';
          break;
        case 6:
          queryData.order = 'asc';
          queryData.type = 'primary_release_date';
          break;
        case 7:
          queryData.order = 'asc';
          queryData.type = 'title';
          break;
        case 8:
          queryData.order = 'desc';
          queryData.type = 'title';
          break;
        default:
          break;
      }
      await getMovieList(queryData)
        .then((res) => {
          console.log(res);
          this.movieList = res.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async searchMovie() {
      await getSearchMovie(this.search)
        .then((res) => {
          console.log(res);
          this.movieList = res.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleFilter(data) {
      console.log(data.active);
      if (data.active) {
        data.active = false;
        this.filterArr = this.filterArr.filter((item) => item !== data.id);
        console.log(data.active);
      } else {
        data.active = true;
        this.filterArr.push(data.id);
        console.log(data.active);
      }
    },
    format(percentage){
      return `${percentage}%`
    }
  },
  watch: {
    page: {
      immediate: true,
      handler(val) {
        this.getMealData(val, this.sortType);
      },
    },
    sortType: {
      handler(val) {
        this.getMealData(this.page, val);
      },
    },
  },
};
</script>
<style lang="scss" scoped >
.card-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  img {
    width: 100%;
  }
}
.no-img-item {
  width: 100%;
  height: 0;
  padding-bottom: 56%;
  position: relative;
  background: lightgray;
  p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
  }
}
.el-card ::v-deep .el-card__header {
  padding: 0;
  border-bottom: 0px;
}
.circle-progress {
  position: absolute;
  top: 100%;
  left: 90%;
  transform: translate(-90%, -50%);
}
.info {
  margin-top: 10px;
}
.sort-item {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  .sort-title {
    font-weight: bold;
  }
}
.sort-body {
  padding: 20px;
  .filter-btn {
    border: 1px solid #9e9e9e;
    border-radius: 14px;
    padding: 4px 12px;
    font-size: 0.9em;
    margin-right: 6px;
    margin-top: 8px;
    cursor: pointer;
    &.active,
    &:hover {
      background: rgb(1, 180, 228);
      color: white;
    }
  }
}
.v-leave-active {
  transition: 0.5s;
}
.v-enter-active {
  transition: 0.5s;
}
</style>
<style lang="scss">
.el-progress-circle__track {
  fill: #000;
}
.el-progress__text {
  color: #fff;
}
</style>
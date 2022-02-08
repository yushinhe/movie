<template>
  <div class="mt-5">
    <div class="container">
      <el-row
        type="flex"
        :gutter="20"
        class="movie-list"
      >
        <el-col class="select-menu">
          <el-card
            class="box-card mb-2"
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
            class="box-card  mb-2"
            :body-style="{ padding: '0px' }"
          >
            <div
              slot="header"
              class="clearfix sort-item"
            >
              <span class="sort-title">類型篩選</span>
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
                  v-for="item in newMovieDDB"
                  :key='item.id'
                  class="ml-1 mr-1 mb-3"
                > <span
                    :class="item.active?'active filter-btn':'filter-btn'"
                    @click="toggleFilter(item)"
                  >{{item.name}}</span></li>
              </ul>
            </div>
          </el-card>
          <el-card
            class="box-card  mb-2"
            :body-style="{ padding: '0px' }"
          >
            <div
              slot="header"
              class="clearfix sort-item"
            >
              <span class="sort-title">搜尋</span>
              <i
                :class="canSearch?'el-icon-arrow-down cursor-pointer':'el-icon-arrow-right cursor-pointer'"
                @click="canSearch = !canSearch"
              ></i>
            </div>
            <div
              v-if="canSearch"
              class="sort-body"
            >
              <el-select
                v-model="search"
                filterable
                multiple
                remote
                :remote-method="getKeyWordList"
                placeholder="依關鍵字篩選"
              >
                <el-option
                  v-for="item in keyWordList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </el-card>
        </el-col>
        <el-col>
          <template v-if="Array.isArray(movieList)">
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
                      <el-image class=" no-img">
                        <div
                          slot="error"
                          class="image-slot"
                          style="margin-top:28%"
                        >
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
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
                    <router-link
                      class="link black-word cursor-pointer"
                      :to="{ name: 'movieDetail', params: { id: item.id }}"
                    >
                      <h3>{{item.title}}</h3>
                    </router-link>
                    <p>上映日期:{{item.release_date}}</p>
                  </div>
                </el-card>
              </li>
            </ul>
            <el-pagination
              small
              background
              layout="prev, pager, next"
              :page-count="totalPage"
              :current-page.sync="page"
              @current-change="current_change"
              class="mt-3 mb-3"
            >
            </el-pagination>
          </template>
          <template v-else>
            <h3>找不到你的查詢結果。</h3>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getMovieList, getKeywordList } from '../api/index';

export default {
  name: 'MovieList',
  data() {
    return {
      search: [],
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
      newMovieDDB: null,
      canSearch: false,
      keyWordList: [],
    };
  },

  computed: {
    movieDDB: {
      get() {
        return this.$store.state.movie.movieDDB;
      },
      set() {
        this.$store.commit('movie/setMovieDDB');
      },
    },
  },
  async created() {
    await this.$store.dispatch('movie/setMovieDDB');
    await this.setNewMovieDDB();
  },
  methods: {
    current_change(currentPage) {
      this.page = currentPage;
    },
    async getMealData(page, type, filterArr, keyWordList) {
      const newFilterArr = filterArr.length > 0 ? filterArr.join(',') : '';
      const newKeywordArr = keyWordList.length > 0 ? keyWordList.join(',') : '';
      const queryData = {
        page,
        filterArr: newFilterArr,
        keyWordList: newKeywordArr,
      };
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
          this.movieList = res.data.results.length > 0 ? res.data.results : null;
          this.totalPage = res.data.total_pages > 500 ? 500 : res.data.total_pages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getKeyWordList(query) {
      if (query.length === 0) return;
      await getKeywordList(query)
        .then((res) => {
          console.log(res);
          this.keyWordList = res.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleFilter(data) {
      const innerData = data;
      if (innerData.active) {
        innerData.active = false;
        this.filterArr = this.filterArr.filter((item) => item !== innerData.id);
        console.log(data.active);
      } else {
        innerData.active = true;
        this.filterArr.push(innerData.id);
        console.log(innerData.active);
      }
    },
    format(percentage) {
      return `${percentage}%`;
    },
    setNewMovieDDB() {
      this.newMovieDDB = this.movieDDB.map((item) => ({ active: false, name: item.name, id: item.id }));
    },
  },
  watch: {
    page: {
      immediate: true,
      handler(val) {
        this.getMealData(val, this.sortType, this.filterArr, this.search);
      },
    },
    sortType: {
      handler(val) {
        this.page = 1;
        this.getMealData(1, val, this.filterArr, this.search);
      },
    },
    filterArr: {
      handler(val) {
        this.page = 1;
        this.getMealData(1, this.sortType, val, this.search);
      },
    },
    search: {
      handler(val) {
        this.page = 1;
        this.getMealData(1, this.sortType, this.filterArr, val);
      },
    },
  },
};
</script>
<style lang="scss" scoped >
.movie-list {
  display: grid;
  grid-template-columns: 1fr 4fr;
  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
  .card-group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;

    @media screen and (max-width: 992px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 576px) {
      grid-template-columns: 1fr;
          margin: 3rem auto 0;
    width: 80%;
    }
    img {
      width: 100%;
    }
  }
  .no-img {
    width: 100%;
    height: 0;
    padding-bottom: 56%;
    background: lightgray;
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
  .select-menu {
    width: 100%;
    @media screen and (max-width: 576px) {
      margin: 0 auto;
      width: 80%;
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

      .sort-type-title {
        text-align: left;
      }
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

<template>
  <div class="main">
    <ul>
      <li
        v-for="item in actors"
        :key='item.id'
      >
        <el-card class="box-card card">
          <div
            slot="header"
            class="clearfix"
          >
            <el-image :src='`https://image.tmdb.org/t/p/w1280/${item.profile_path}`'></el-image>
          </div>
          <h4 class="medium">{{ item.name }}</h4>
          <p>/{{item.character}}</p>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ActorCarousel',
  data() {
    return {

    };
  },
  computed: {
    actors: {
      get() {
        const obj = this.$store.state.movie.actors;
        if (!obj) return;
        const result = obj.length > 8 ? obj.slice(0, 8) : obj;
        return result;
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

  ul {
    display: flex;
    width: 100%;

    .card {
      width: 140px;
      height: 300px;
      margin: 10px 10px 10px 4px;
      border: rgb(227, 227, 227) 1px solid;
      img {
        width: 100%;
      }
    }
  }
  .el-card ::v-deep .el-card__header {
    padding: 0;
    border-bottom: 0px;
  }
  .el-card ::v-deep .el-card__body {
    padding: 5px;
  }
}
</style>

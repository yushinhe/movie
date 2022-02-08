<template>
  <nav class="dark-blue-bg white-word">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link
          class="link white-word cursor-pointer"
          to="/ratingList"
        ><span>評分</span> </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link
          class="link white-word cursor-pointer"
          to="/"
        ><span>電影列表</span> </router-link>
      </el-menu-item>
    </el-menu>
  </nav>
</template>
<script>
export default {
  name: 'menuNav',
  data() {
    return {

    };
  },
  computed: {

  },

  created() {

  },
  methods: {
    data() {
      return {

      };
    },
    methods: {

    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped >
ul {
  padding: 5px 60px;
  @media screen and (max-width: 576px) {
    padding: 5px;
  }
}
.title {
  line-height: 30px;
}
</style>

<template>
  <nav class="dark-blue-bg white-word">
    <div class="container ">
      <ul class="flex space-between">
        <li class="title">movieTest</li>
        <li>
          <ul class="flex">
            <li class="mr-2">
              <router-link
                class="link white-word cursor-pointer"
                to="/ratingList"
              ><span>評分</span> </router-link>
            </li>
            <li>
              <router-link
                class="link white-word cursor-pointer"
                to="/"
              ><span>電影列表</span> </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
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

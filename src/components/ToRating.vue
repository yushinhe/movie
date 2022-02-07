<template>
  <div class="flex mb-2">
    <el-tooltip placement="right">
      <div slot="content">

        <div
          class="block"
          @click="test"
        >
          <el-rate
            v-model="rating"
            :max="10"
          ></el-rate>
        </div>
      </div>

      <el-button
        type="primary"
        size='mini'
        style="cursor:pointer"
      >評分</el-button>
    </el-tooltip>

  </div>
</template>
<script>
export default {
  name: 'ToRating',
  data() {
    return {
      rating: 0,
    };
  },
  computed: {

  },

  created() {

  },
  methods: {
    test() {
      this.$emit('rate', this.rating);
      this.rating = 0;
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped >
</style>

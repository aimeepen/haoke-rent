<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar route>
        <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/find" icon="search">找房</van-tabbar-item>
        <van-tabbar-item replace to="/consult" icon="home-o">咨询</van-tabbar-item>
        <van-tabbar-item replace to="/my" icon="home-o">我的</van-tabbar-item>
      </van-tabbar>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      active: 0
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

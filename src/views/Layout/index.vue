<template>
  <div>
    <router-view></router-view>
    <van-tabbar route active-color="#45b97a" inactive-color="#888">
      <van-tabbar-item replace to="/home"
        >首页
        <van-icon name="wap-home-o" slot="icon" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/find" icon="search">找房 </van-tabbar-item>
      <van-tabbar-item replace to="/consult" icon="home-o"
        >咨询 <van-icon name="newspaper-o" slot="icon"
      /></van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="home-o"
        >我的 <van-icon name="contact" slot="icon"
      /></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {

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

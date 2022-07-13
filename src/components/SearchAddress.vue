<template>
  <div>
    <van-search
      disabled
      v-model="value"
      placeholder="请输入小区或地址"
      @search="$router.back()"
    >
    </van-search>
    <div class="location" @click="goCity">
      {{ this.$store.state.name }}
      <img src="@/assets/under.png" />
    </div>

    <div class="circle" @click="$router.push('/map')">
      <van-icon name="location-o" />
    </div>
  </div>
</template>

<script>
import { getCityInfo } from '@/api/city'
export default {
  created () { },
  mounted () {
    this.getCityInfo()
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
  },
  methods: {
    async goCity (obj) {
      const res = await getCityInfo(this.$store.state.name)
      console.log(res)
      obj = res.data.body
      this.$router.push({
        path: '/city'
      })
    },
    async getCityInfo () {
      const res = await getCityInfo(this.$store.state.name)
      this.$store.commit('setId', res.data.body.value)
      this.$emit('getId', res.data.body.value)
    }
  },

  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-search__content {
  position: absolute;
  top: 25px;
  left: 20px;
  width: 290px;
  height: 25px;
  padding-bottom: 8px;
}
.location {
  position: absolute;
  top: 30px;
  left: 30px;
  text-align: center;
  padding: 0;
  font-size: 14px;
  padding-right: 10px;
  border-right: 1px solid #e5e5e5;
}
.van-cell {
  margin-left: 50px;
}
img {
  width: 12px;
  height: 12px;
}
/deep/ .van-field__left-icon {
  padding-left: 12px;

  color: #9c9fa1;
  font-size: 15px;
}
/deep/.van-field__control {
  color: #9c9fa1;
}
.van-icon {
  margin-left: 2px;
  padding-top: 2px;
}
.circle {
  position: absolute;
  top: 27px;
  right: 15px;
  width: 22px;
  height: 20px;
  line-height: 20px;
  border-radius: 25px;
  border: 2px solid #fff;
  .van-icon {
    font-size: 18px;
    color: #fff;
  }
}
</style>

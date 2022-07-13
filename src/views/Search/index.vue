<template>
  <div>
    <van-search
      @search="getCommunity"
      v-model="value"
      show-action
      placeholder="请输入小区或地址"
      background="#F5F6FA"
    >
      <template #action>
        <div @click="$router.back(-1)">取消</div>
      </template>
    </van-search>
    <van-cell-group v-show="isShow">
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.cmName"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getCommunity } from '@/api/house'
export default {
  created () { },
  mounted () {
  },
  data () {
    return {
      value: '',
      isShow: false,
      list: []
    }
  },
  methods: {
    // 不写破烂效果了
    // left () {
    //   document.querySelector('.van-field__control').setAttribute('style', 'margin-left: 20px')
    //   document.querySelector('.van-icon').setAttribute('style', 'margin-left: -70px')
    // },
    // right () {
    //   document.querySelector('.van-field__control').removeAttribute('style')
    //   document.querySelector('.van-icon').removeAttribute('style')
    // },
    enter () {
      console.log(111)
    },
    async getCommunity () {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      const res = await getCommunity({
        name: this.value,
        id: this.$store.state.id
      })
      console.log(res)
      const arr = res.data.body
      arr.forEach(item => {
        this.list.push({ cmName: item.communityName, cmId: item.community })
      })
      this.$toast.clear()
      this.isShow = true
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-icon {
  position: absolute;
  left: 100px;
  top: 5px;
  left: 75px;
  color: #bbbbbb;
}
/deep/.van-field__control {
  margin-left: 90px;
}
</style>

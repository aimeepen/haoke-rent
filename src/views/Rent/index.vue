<template>
  <div>
    <van-nav-bar title="房屋管理" left-arrow @click-left="$router.back()" />
    <van-empty v-if="isShow">
      <p>
        您还没有房源，<span @click="$router.push('/rent/add')">去发布房源</span
        >吧~
      </p>
    </van-empty>
    <room-item
      v-else
      :obj="item"
      v-for="(item, index) in list"
      :key="index"
    ></room-item>
  </div>
</template>

<script>
import { getUserHouses } from '@/api/user'
import RoomItem from '@/components/RoomItem.vue'

export default {
  created () {
    this.time()
  },
  beforeDestroy () {

  },
  data () {
    return {
      isShow: true,
      list: []
    }
  },
  methods: {
    async getUserHouses () {
      const res = await getUserHouses()
      console.log(res)
      this.list = res.data.body
    },
    time () {
      setTimeout(() => {
        this.isShow = false
        this.getUserHouses()
      }, 3000)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { RoomItem }
}
</script>

<style scoped lang='less'>
p {
  font-size: 14px;
  span {
    color: #21b97a;
  }
}
</style>

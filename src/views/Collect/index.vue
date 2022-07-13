<template>
  <div>
    <van-nav-bar
      title="收藏列表"
      left-arrow
      @click-left="$router.back()"
    />
    <room-item
      :obj="item"
      v-for="(item, index) in UserFavorites"
      :key="index"
    ></room-item>
  </div>
</template>

<script>
import RoomItem from '@/components/RoomItem.vue'
import { getUserFavorites } from '@/api/user'
export default {
  created () {
    this.getUserFavorites()
  },
  data () {
    return {
      UserFavorites: []
    }
  },
  methods: {
    async getUserFavorites () {
      try {
        // this.$toast.loading({ message: '加载中', duration: 2000 })
        const res = await getUserFavorites()
        console.log(res)
        this.UserFavorites = res.data.body
        console.log(this.UserFavorites)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    RoomItem

  }
}
</script>

<style scoped lang='less'>
</style>

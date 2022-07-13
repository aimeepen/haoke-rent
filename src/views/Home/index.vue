<template>
  <div>
    <div class="header">
      <van-swipe :autoplay="3000" indicator-color="#888">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <search-address @getId="getCityId"></search-address>
    </div>
    <div class="home-msg">
      <div class="whole-rent" @click="$router.push('/find')">
        <img src="@/assets/whole.png" alt="" />
        <h2>整租</h2>
      </div>
      <div class="joint-rent" @click="$router.push('/find')">
        <img src="@/assets/joint.png" alt="" />
        <h2>合租</h2>
      </div>
      <div class="find-home" @click="$router.push('map')">
        <img src="@/assets/find.png" alt="" />
        <h2>地图找房</h2>
      </div>
      <div class="rent-out" @click="publishRooms">
        <img src="@/assets/rent.png" alt="" />
        <h2>去出租</h2>
      </div>
    </div>
    <div class="group">
      <div class="group-title">
        <h3>租房小组</h3>
        <p class="more">更多</p>
      </div>
      <div class="group-bottom">
        <div class="room-info" v-for="item in RentGroup" :key="item.id">
          <div class="left">
            <van-image
              width="50"
              height="50"
              :src="'http://liufusong.top:8080' + item.imgSrc"
            />
          </div>
          <div class="right">
            <p>{{ item.desc }}</p>
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSwiper, getRentGroup } from '@/api/home'
import SearchAddress from '@/components/SearchAddress.vue'
import { mapState } from 'vuex'

export default {
  created () {
    this.Swiper()
    this.getCityId()
  },
  data () {
    return {
      images: [],
      arr: [],
      value: '',
      RentGroup: []
    }
  },
  methods: {
    async Swiper () {
      const res = await getSwiper()
      // console.log(res)
      this.arr.push(res.data.body)
      // console.log(this.arr)
      this.arr = this.arr[0].map(item => item.imgSrc
      )
      // console.log(this.newArr)
      this.arr.forEach(item => {
        item = `http://liufusong.top:8080${item}`
        this.images.push(item)
      })
      // console.log(this.images)
      // console.log(this.arr)
    },
    publishRooms () {
      if (this.user && this.user.token) {
        this.$router.push('/rent/add')
      } else {
        this.$router.push('/login')
      }
    },
    async getCityId (id) {
      console.log('id', id)
      const res1 = await getRentGroup(id)
      // console.log(res1)
      this.RentGroup = res1.data.body
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: { SearchAddress }
}
</script>

<style scoped lang="less">
.header {
  height: 212px;
  // background-color: pink;
  img {
    width: 100%;
    height: 212px;
  }
  /deep/.van-swipe__indicator {
    background-color: #ccc;
  }
}
.home-msg {
  display: flex;
  justify-content: space-between;
  height: 110px;
  background-color: #fff;
  padding: 10px;
  img {
    width: 60px;
    height: 60px;
  }
  h2 {
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    margin-top: 10px;
  }
}
.group {
  height: 187px;
  padding: 0 10px;
  background-color: #f6f5f6;
  .group-title {
    display: flex;
    justify-content: space-between;
    width: 345px;
    height: 47px;
    h3 {
      font-size: 15px;
    }
    .more {
      font-size: 14px;
      color: #787d82;
    }
  }
  .group-bottom {
    display: flex;
    flex-wrap: wrap;
    .room-info {
      display: flex;
      width: 172px;
      height: 60px;
      border-radius: 5px;
      background-color: #fff;
      margin-bottom: 10px;
      &:nth-child(2n-1) {
        margin-right: 10px;
      }
      .left {
        margin: 0 10px;
      }
      .right {
        font-size: 14px;
        p {
          padding: 0;
          margin: 0;
          &:nth-child(1) {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>

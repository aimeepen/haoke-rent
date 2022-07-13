<template>
  <div>
    <div class="login" v-if="user && user.token">
      <div
        class="my-head"
        :style="{
          'background-image': `url(${baseURL}${userInfo.avatar})`,
          'background-repeat': 'no-repeat',
          'background-size': '100%',
        }"
      ></div>
      <div class="user-login">
        <div class="my-avatar">
          <img :src="baseURL + userInfo.avatar" alt="" />
        </div>
        <div class="my-name">{{ userInfo.nickname }}</div>
        <div class="back"><span @click="logout">退出</span></div>
        <p class="edit">编辑个人资料</p>
      </div>
    </div>
    <div class="not-login" v-else>
      <div class="head"></div>
      <div class="user-not-login">
        <div class="avatar"></div>
        <div class="name">游客</div>
        <div class="logo">
          <span @click="$router.push('/login')">去登录</span>
        </div>
      </div>
    </div>

    <div class="function">
      <div class="top">
        <div class="collect" @click="isGoCollect">
          <van-icon name="star-o" size="20" />
          <span>我的收藏</span>
        </div>
        <div class="rent">
          <van-icon name="wap-home-o" @click="isGoRent" size="20" />
          <span>我的出租</span>
        </div>
        <div class="record">
          <van-icon name="clock-o" size="20" />
          <span>看房记录</span>
        </div>
      </div>
      <div class="bottom">
        <div class="become-owners">
          <van-icon name="debit-pay" size="20" />
          <span>成为房主</span>
        </div>
        <div class="personal-data">
          <van-icon name="contact" size="20" />
          <span>个人资料</span>
        </div>
        <div class="contact">
          <van-icon name="service-o" size="20" />
          <span>联系我们</span>
        </div>
      </div>
    </div>
    <div class="ad"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo, getUserFavorites } from '@/api/user'
export default {
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        // console.log('res', res)
        this.userInfo = res.data.body
        try {
          const res1 = await getUserFavorites()
          console.log(res1)
        } catch (err) {
          console.log(err)
        }
      } catch (error) {
        console.log(error)
        this.$toast()
      }
    } else {
      this.$toast('请先登录')
    }
  },
  data () {
    return {
      userInfo: [],
      baseURL: 'http://liufusong.top:8080',
      UserFavorites: []
    }
  },
  methods: {
    isGoCollect () {
      if (this.user && this.user.token) {
        this.$router.push('/collect')
      } else {
        this.$router.push('/login')
      }
    },

    async logout () {
      if (this.user && this.user.token) {
        try {
          await this.$dialog.confirm({ message: '是否确定退出' })
          this.$store.commit('setUser', {})
        } catch (error) {
          console.log(error)
        }
      }
    },
    isGoRent () {
      if (this.user && this.user.token) {
        this.$router.push('/rent')
      } else {
        this.$router.push('/login')
      }
    }

  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login {
  .my-head {
    height: 375px;
  }
  .user-login {
    margin-top: -205px !important;
    width: 320px;
    height: 207px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -50px;
    box-shadow: 0 0 10px 3px #ddd;

    .my-avatar {
      position: relative;
      transform: translateY(-50%);
      width: 70px;
      height: 70px;
      margin: 0 auto;
      border-radius: 70px;
      border: 5px solid #f5f5f5;
      box-shadow: 0 2px 2px #bdbdbd;
      img {
        width: 70px;
        height: 70px;
      }
    }
    .my-name {
      font-size: 13px;
      text-align: center;
      margin-top: -20px;
    }
    .back {
      width: 54px;
      height: 20px;
      margin: 0 auto;
      margin-bottom: 30px;
      span {
        margin: 0 auto;
        border-radius: 30px;
        color: #fff;
        padding: 2px 15px;
        background: #21b97a;
        font-size: 12px;
      }
    }
    .edit {
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
  }
}
.not-login {
  .head {
    height: 190px;
    background: url("@/assets/bg.png") no-repeat 0 / cover;
  }
  .user-not-login {
    width: 320px;
    height: 165px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: -50px;
    box-shadow: 0 0 10px 3px #ddd;
    .avatar {
      position: relative;
      transform: translateY(-50%);
      width: 70px;
      height: 70px;
      background: url("@/assets/avatar.png") no-repeat 0 / cover;
      margin: 0 auto;
      border-radius: 70px;
      border: 5px solid #f5f5f5;
      box-shadow: 0 2px 2px #bdbdbd;
    }
    .name {
      font-size: 13px;
      text-align: center;
      margin-top: -30px;
      margin-bottom: 22px;
    }
    .logo {
      width: 70px;
      height: 30px;
      line-height: 30px;

      margin: 0 auto;
      background-color: #21b97a;
      border: 1px solid #ddd;
      border-radius: 5px;
      span {
        display: block;
        color: #fff;
        text-align: center;
        font-size: 13px;
      }
    }
  }
}
.function {
  margin-top: 15px;
  height: 190px;
  // background-color: pink;
  font-size: 13px;
  .top {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    .collect {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 125px;
      height: 65px;
      span {
        margin-top: 10px;
      }
    }
    .rent {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 125px;
      height: 65px;
      span {
        margin-top: 10px;
      }
    }
    .record {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 125px;
      height: 65px;
      span {
        margin-top: 10px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    .become-owners {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 125px;
      height: 65px;
      span {
        margin-top: 10px;
      }
    }
    .personal-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 125px;
      height: 65px;
      span {
        margin-top: 10px;
      }
    }
    .contact {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 125px;
      height: 65px;
      span {
        margin-top: 10px;
      }
    }
  }
}
.ad {
  margin: 0 auto;
  width: 345px;
  height: 84px;
  background: url("@/assets/join.png") 0 0 / cover;
  margin-top: -5px;
}
</style>

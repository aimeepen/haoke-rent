<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="用户名"
        placeholder="请输入账号"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录 </van-button>
      </div>
    </van-form>
    <div class="reg"><a href="#">还没有账号，去注册~</a></div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      user: {
        username: '',
        password: ''
      }

    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      const reg = /^[0-9a-zA-Z]{5,8}$/
      const usm = user.username
      const psd = user.password
      const res = reg.test(usm)
      const res1 = reg.test(psd)
      if (user.username === '' || user.password === '') {
        this.$toast('用户名和密码不能为空')
        return
      } else if (res === false) {
        this.$toast('用户名格式5-8位的格式或数字')
      } else if (res1 === false) {
        this.$toast('用户名格式5-8位的格式或数字')
      }

      this.$toast.loading({
        message: '登录中',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })

      try {
        const res2 = await login(user)
        console.log(res2)
        this.$store.commit('setUser', res2.data.body)
        this.$toast.success('登录成功')
        this.$router.push({ path: '/my' })
      } catch (error) {
        console.log('登录失败', error)
        this.$toast.fail('登录失败')
      }
      this.$toast.clear()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  margin-bottom: 20px;
  height: 45px;
  line-height: 45px;
}
.van-button {
  width: 345px;
  height: 50px;
  background-color: #21b97a;
  font-size: 18px;
  margin-top: 27px;
}
.van-field {
  width: 345px;
  height: 60px;
  font-size: 18px;
}
.reg {
  a {
    color: #666;
    font-size: 14px;
    margin-left: 130px;
  }
}
</style>

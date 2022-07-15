<template>
  <div>
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.push('/home')"
    />
    <van-cell-group>
      <van-cell title="房源信息" />
      <van-cell
        @click="$router.push('/rent/search')"
        title="小区名称"
        is-link
        :value="
          $store.state.communityname
            ? $store.state.communityname
            : '请输入小区名称'
        "
      />
      <van-cell class="price">
        <span>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</span>
        <input type="text" placeholder="请输入租金/月" v-model="price" />
        <span class="second">￥/月</span>
      </van-cell>
      <van-cell class="area">
        <span>建筑面积</span>
        <input type="text" placeholder="请输入建筑面积" v-model="size" />
        <span class="second">㎡</span>
      </van-cell>
      <van-cell
        class="huxing"
        title="户型"
        is-link
        :value="value1"
        @click="showPicker1 = true"
      />
      <van-popup :value="value1" v-model="showPicker1" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns1"
          @cancel="showPicker1 = false"
          @confirm="onConfirm1"
        />
      </van-popup>
      <van-cell
        title="所在楼层"
        is-link
        :value="value2"
        @click="showPicker2 = true"
      />
      <van-popup :value="value2" v-model="showPicker2" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns2"
          @cancel="showPicker2 = false"
          @confirm="onConfirm2"
        />
      </van-popup>
      <van-cell
        class="chaoxiang"
        is-link
        title="朝向"
        label="房屋标题"
        :value="value3"
        @click="showPicker3 = true"
      />
      <van-popup :value="value3" v-model="showPicker3" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns3"
          @cancel="showPicker3 = false"
          @confirm="onConfirm3"
        />
      </van-popup>
      <van-cell>
        <input
          v-model="title"
          class="title"
          type="text"
          placeholder="请输入标题(例如：整租 小区名 2室 5000元)"
        />
        <p>房屋图像</p>
      </van-cell>
      <van-cell>
        <van-uploader v-model="fileList" :after-read="afterRead">
          <van-button icon="plus" color="#dddddd" plain></van-button>
        </van-uploader>
        <p>房屋配置</p>
      </van-cell>

      <van-grid :column-num="5">
        <van-grid-item
          :class="{ green: isChoose.indexOf(item) != -1 }"
          @click="addStyle(item, index)"
          v-for="(item, index) in supporting[0]"
          :key="index"
          icon="photo-o"
        >
          <i :class="'iconfont' + ' ' + 'icon-' + item.icon"></i>
          <p>{{ item.label }}</p>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="房屋描述"></van-cell>
      <van-cell>
        <textarea name="" id="" cols="30" rows="10" v-model="des"></textarea>
      </van-cell>
    </van-cell-group>
    <div class="root">
      <van-button type="primary" @click="quxiao" plain>取消 </van-button>
      <van-dialog
        @cancel="$router.push('/home')"
        confirm-button-text="继续编辑"
        cancel-button-text="放弃"
        title="提示"
        show-cancel-button
        v-model="show"
        confirmButtonColor="#21b97a"
        >放弃发布房源？</van-dialog
      >
      <van-button type="primary" @click="submit">提交</van-button>
      <van-dialog
        @confirm="confirm"
        confirm-button-text="发布"
        cancel-button-text="取消"
        title="提示"
        show-cancel-button
        v-model="flag"
        confirmButtonColor="#21b97a"
        >是否发布房源？</van-dialog
      >
    </div>
  </div>
</template>

<script>
import { getHouseImage, getHousesParams, postHouse } from '@/api/house'
// import _ from 'lodash'
export default {
  // 在创建之前，添加body的style属性， 给组件单独设置背景色
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#F5F6FA')
  },
  // 在销毁前，将body的style属性删除
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  },
  created () {
    this.columns1 = this.$store.state.roomType
    this.columns2 = this.$store.state.floor
    this.columns3 = this.$store.state.oriented
    this.getHousesParams()
  },

  data () {
    return {
      value1: '请选择',
      value2: '请选择',
      value3: '请选择',
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      columns1: [],
      columns2: [],
      columns3: [],
      fileList: [],
      peizhi: [],
      supporting: [],
      icons: [
        'dianshiji',
        'bingxiang',
        'xiyiji',
        'kongtiao',
        'haofangtuo400iconfont2reshuiqi',
        'shafa',
        'shuinuanqigongcheng',
        'kuandai',
        'yigui',
        'meiqitianranqi'
      ],
      isChoose: [],
      show: false,
      flag: false,
      title: '',
      des: '',
      size: '',
      price: '',
      roomType: '',
      floor: '',
      oriented: '',
      newImgList: [],
      newpeizhi: []
    }
  },
  methods: {
    onConfirm1 (value) {
      console.log(value)
      this.roomType = value.value
      this.value1 = value.text
      this.showPicker1 = false
    },
    onConfirm2 (value) {
      console.log(value)
      this.floor = value.value
      console.log(this.floor)
      this.value2 = value.text
      this.showPicker2 = false
    },
    onConfirm3 (value) {
      console.log(value)
      this.oriented = value.value
      this.value3 = value.text
      this.showPicker3 = false
    },
    // 图片处理
    async afterRead (file) {
      // console.log(file)
      const form = new FormData()
      form.append('file', file.file)
      const { data } = await getHouseImage(form)
      this.newImgList.push(...data.body)
      console.log(this.newImgList)

      if (this.newImgList.length > 1) {
        this.newImgList = this.newImgList.join('|')
      } else {
        this.newImgList = this.newImgList.join('')
      }
      console.log(this.newImgList)
      if (data.body === Object) {
        this.fileList.push(data.body)
      }

      // console.log(this.fileList)
    },
    async getHousesParams () {
      const res = await getHousesParams()
      console.log('res', res)
      this.supporting.push(res.data.body.supporting)

      this.icons.forEach((item, index) => {
        this.supporting[0].forEach((item1, index1) => {
          if (index1 === index) { item1.icon = item }
        })
      })

      console.log(this.supporting)
    },
    addStyle (item, index) {
      console.log(item)
      // this.isChoose.indexOf(item) 判断item下标是否为-1，
      // 是-1则数组中匹配不到该数据，添加
      // 不是-1则说明匹配到了，抹除
      if (this.isChoose.indexOf(item) !== -1) {
        this.isChoose.splice(this.isChoose.indexOf(item), 1) // 取消
      } else {
        this.isChoose.push(item)// 选中添加到数组里
      }
      console.log(this.isChoose)
      const supp = this.isChoose.map(item => item.label)
      console.log('sup', supp)
      if (supp.length > 1) {
        this.newpeizhi = supp.join('|')
      } else {
        this.newpeizhi = supp
      }
      console.log(this.newpeizhi)
    },
    quxiao () {
      this.show = true
    },
    submit () {
      if (this.fileList.length === 0) {
        this.$toast('请先上传房源图片')
      } else {
        this.flag = true
      }
    },
    async confirm () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      const res = await postHouse({
        title: this.title,
        description: this.des,
        oriented: this.oriented,
        houseImg: this.newImgList,
        supporting: this.newpeizhi,
        price: this.price,
        roomType: this.roomType,
        size: this.size,
        floor: this.floor,
        community: this.$store.state.communityId
      })
      this.$toast('发布成功')
      this.$router.push('/rent')
      console.log(res)
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-grid-item {
  .van-icon {
    font-size: 24px;
  }
  p {
    font-size: 14px;
  }
}
/deep/.green {
  color: #21b97a !important;
}
.huxing {
  .van-cell__title {
    span {
      letter-spacing: 18px;
    }
  }
}
.chaoxiang {
  .van-cell__title {
    span {
      letter-spacing: 18px;
    }
  }
}
.van-cell__title {
  flex: 0.25;
}
input {
  border: none;
}
.price {
  span {
    color: #666;
  }
  input {
    margin-right: 52px;
    margin-left: 24px;
  }
  .second {
    color: #888;
  }
}
input::-webkit-input-placeholder {
  color: #cabbbb;
}
.area {
  span {
    color: #666;
  }
  input {
    margin-right: 70px;
    margin-left: 24px;
  }
  .second {
    color: #888;
  }
}
.van-cell__label {
  margin-top: 24px;
  color: #323233;
  font-size: 14px;
}
.title {
  width: 100%;
  margin-bottom: 10px;
}
p {
  margin-bottom: -2px;
}
.van-button {
  width: 82px;
  height: 82px;
}
.van-button__icon {
  font-size: 25px;
}
.van-uploader {
  margin-bottom: 16px;
}

.van-cell-group {
  margin-bottom: 20px;
}
textarea {
  border: none;
  width: 100%;
  height: 125px;
}
.root {
  display: flex;
  .van-button {
    height: 45px;
    flex: 1;
    border: none;
  }
}
/deep/.van-dialog__header {
  margin-top: -5px;
  // padding-top: 0;
}
/deep/.van-dialog__content {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>

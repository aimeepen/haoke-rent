<template>
  <div>
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="房源信息" />
      <van-cell
        @click="$router.push('/rent/search')"
        title="小区名称"
        is-link
        value="请输入小区名称"
      />
      <van-cell class="price">
        <span>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</span>
        <input type="text" placeholder="请输入租金/月" />
        <span class="second">￥/月</span>
      </van-cell>
      <van-cell class="area">
        <span>建筑面积</span>
        <input type="text" placeholder="请输入建筑面积" />
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
          :columns="columns"
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
          :columns="columns"
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
          :columns="columns"
          @cancel="showPicker3 = false"
          @confirm="onConfirm3"
        />
      </van-popup>
      <van-cell>
        <input
          class="title"
          type="text"
          placeholder="请输入标题(例如：整租 小区名 2室 5000元)"
        />
        <p>房屋图像</p>
      </van-cell>
      <van-cell>
        <van-uploader>
          <van-button icon="plus" color="#dddddd" plain></van-button>
        </van-uploader>
        <p>房屋配置</p>
      </van-cell>
      <van-cell>
        <ul>
          <li>
            <i class="iconfont icon-yigui"></i>
            <p>衣柜</p>
          </li>
          <li>
            <i class="iconfont icon-xiyiji"></i>
            <p>洗衣机</p>
          </li>
          <li>
            <i class="iconfont icon-kongtiao"></i>
            <p>空调</p>
          </li>
          <li>
            <i class="iconfont icon-meiqitianranqi"></i>
            <p>天然气</p>
          </li>
          <li>
            <i class="iconfont icon-bingxiang"></i>
            <p>冰箱</p>
          </li>
          <li>
            <i class="iconfont icon-shuinuanqigongcheng"></i>
            <p>暖气</p>
          </li>
          <li>
            <i class="iconfont icon-dianshiji"></i>
            <p>电视</p>
          </li>
          <li>
            <i class="iconfont icon-haofangtuo400iconfont2reshuiqi"></i>
            <p>热水器</p>
          </li>
          <li>
            <i class="iconfont icon-kuandai"></i>
            <p>宽带</p>
          </li>
          <li>
            <i class="iconfont icon-shafa"></i>
            <p>沙发</p>
          </li>
        </ul>
      </van-cell>
      <van-cell></van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="房屋描述"></van-cell>
      <van-cell>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </van-cell>
    </van-cell-group>
    <div class="root">
      <van-button type="primary" plain>取消</van-button>
      <van-button type="primary">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  // 在创建之前，添加body的style属性， 给组件单独设置背景色
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#F5F6FA')
  },
  // 在销毁前，将body的style属性删除
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  },
  created () { },
  data () {
    return {
      value1: '请选择',
      value2: '请选择',
      value3: '请选择',
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']
    }
  },
  methods: {
    onConfirm1 (value) {
      this.value1 = value
      this.showPicker1 = false
    },
    onConfirm2 (value) {
      this.value2 = value
      this.showPicker2 = false
    },
    onConfirm3 (value) {
      this.value3 = value
      this.showPicker3 = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
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
ul {
  display: flex;
  flex-wrap: wrap;
  height: 140px;
  // background-color: pink;
  li {
    margin: 10px 0;
    width: 67px;
    height: 50px;
    text-align: center;
    i {
      font-size: 24px;
    }
    p {
      margin-top: 5px;
    }
  }
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
</style>

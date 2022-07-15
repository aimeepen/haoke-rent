<template>
  <div class="main">
    <van-nav-bar :title="houseInfo.community">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="content">
      <div class="top">
        <p class="title">{{ houseInfo.title }}</p>
        <p class="tags">
          <van-tag
            type="warning"
            v-for="(item, index) in houseInfo.tags"
            :key="index"
            >{{ item }}</van-tag
          >
        </p>
      </div>
      <div class="center">
        <div class="aitem">
          <p class="price">{{ houseInfo.price }} <span>/月</span></p>
          <p class="txt">租金</p>
        </div>
        <div class="aitem">
          <p class="num">{{ houseInfo.roomType }}</p>
          <p class="txt">房型</p>
        </div>
        <div class="aitem">
          <p class="size">{{ houseInfo.size }}平米</p>
          <p class="txt">面积</p>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <p>装修： <span>精装</span></p>
          <p>
            楼层： <span>{{ houseInfo.floor > 3 ? "高楼层" : "中楼层" }}</span>
          </p>
        </div>
        <div class="right">
          <p>
            朝向:
            <span
              class="chaoxiang"
              v-for="(item, index) in houseInfo.oriented"
              :key="index"
              >{{ item }}</span
            >
          </p>
          <p>类型: <span>普通住宅</span></p>
        </div>
      </div>
    </div>

    <div class="content">
      <p>小区：{{ houseInfo.community }}</p>
      <div id="container"></div>
      <p class="peitao">房屋配套</p>
      <van-grid :border="false">
        <van-grid-item
          v-for="(item, index) in houseInfo.supporting"
          :key="index"
          icon="star-o"
          :text="item"
        />
      </van-grid>
    </div>
    <div class="content">
      <p class="gaik">房源概况</p>
      <div class="master">
        <van-image :src="require('@/assets/head.png')" />
        <van-cell title="喷大爷" label="描述信息">
          <span slot="label">
            <van-icon name="like"></van-icon> 已认证房主
          </span>
          <van-button plain type="primary" slot="extra">发消息</van-button>
        </van-cell>
      </div>
      <p class="decp">{{ houseInfo.description }}</p>
    </div>

    <!-- <div class="sanceng sanceng3">
      <p class="gaik">猜你喜欢</p>
      <homeitem
        v-for="(item, index) in likehome"
        :key="index"
        :item="item"
      ></homeitem>
    </div> -->

    <van-grid :border="true" :column-num="3" class="fixbottom">
      <van-grid-item>
        <van-button plain @click="collect">
          <van-icon
            :name="isFavorite ? 'star' : 'star-o'"
            :color="isFavorite ? 'red' : 'unset'"
          ></van-icon>
          收藏</van-button
        >
        <van-dialog
          @confirm="confirm"
          confirm-button-text="去登录"
          cancel-button-text="取消"
          title="登录失效请重新登录"
          show-cancel-button
          v-model="flag"
          confirmButtonColor="#21b97a"
          >是否发布房源？</van-dialog
        >
      </van-grid-item>
      <van-grid-item>
        <van-button plain>在线咨询</van-button>
      </van-grid-item>
      <van-grid-item>
        <van-button type="primary">电话预约</van-button>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { addCollect, getHouseDetail, delCollect } from '@/api/house'

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.getHouseDetail()
  },
  updated () {
    this.initmap()
  },
  data () {
    return {
      houseInfo: {},
      images: [],
      isFavorite: false,
      flag: false
    }
  },
  methods: {
    async getHouseDetail () {
      console.log('id', this.id)
      const res = await getHouseDetail(this.id)
      console.log(res)
      this.houseInfo = res.data.body

      if (res.data.body.houseImg instanceof Array) {
        this.images = res.data.body.houseImg.map((item) => `http://liufusong.top:8080${item}`)
      } else {
        this.images.push('http://liufusong.top:8080' + res.data.body.houseImg)
      }

      // console.log(this.images)
    },
    initmap () {
      // 创建地图实例
      const { BMapGL } = window
      this.baidumap = new BMapGL.Map('container')
      const point = new BMapGL.Point(
        this.houseInfo.coord.longitude,
        this.houseInfo.coord.latitude
      )
      this.baidumap.centerAndZoom(point, 11)
      this.baidumap.enableScrollWheelZoom()
      const cont = `<span>${this.houseInfo.community}</span>`
      const label = new BMapGL.Label(cont, {
        // 创建文本标注
        position: point,
        offset: new BMapGL.Size(10, 20)
      })
      this.baidumap.addOverlay(label) // 将标注添加到地图中
      label.setStyle({
        // 设置label的样式
        // color: '#000',
        // fontSize: '30px',
        // border: '2px solid #1E90FF',
        position: 'absolute',
        display: 'inline',
        cursor: 'inherit',
        backgroundColor: 'rgb(238, 93, 91)',
        border: '1px solid rgb(255, 0, 0)',
        padding: '5px 10px',
        whiteSpace: 'nowrap',
        font: '12px / 14px arial, sans-serif',
        zIndex: '-999999',
        color: 'rgb(255, 255, 255)',
        boxShadow: 'rgb(204 204 204) 2px 2px 2px',
        userSelect: 'none',
        left: '188px',
        top: '37px'
      })
    },
    async collect () {
      try {
        if (this.isFavorite) {
          const res = await delCollect(this.houseInfo.houseCode)
          console.log('del', res)
          this.isFavorite = false
          this.$toast.success('取消收藏成功')
        } else {
          console.log('收藏')
          const res = await addCollect(this.houseInfo.houseCode)
          console.log('collect', res)
          if (res.data.status === 400) {
            this.flag = true
          } else {
            this.$toast.success('收藏成功')
            this.isFavorite = true
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    confirm () {
      this.$router.push('/login')
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.van-dialog {
  text-align: center;
  /deep/.van-dialog__content {
    margin-top: 10px;
  }
}
.decp {
  color: #999;
  margin-top: 10px;
  padding-bottom: 30px;
}
.master {
  display: flex;
  align-content: center;
  justify-content: start;
  /deep/ .van-image {
    width: 60px;
    height: 60px;
    margin-right: 5px;
    /deep/ img {
      width: 60px;
      height: 60px;
    }
    margin-top: 5px;
  }
}
/deep/ .van-cell {
  width: 280px;
}
.peitao,
.gaik {
  padding: 10px 0;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}
/deep/ .van-grid-item {
  border: none;
}
/deep/ .van-tag {
  margin-right: 5px;
}

#container {
  width: 100%;
  height: 145px;
  padding: 0 !important;
  margin-top: 5px;
}
.main {
  background-color: #eee;
}
p {
  margin: 0;
  padding: 0;
  font-size: 15px;
}

.content {
  margin-bottom: 5px;
  background-color: #fff;
  //   height: 266px;
  padding: 0 15px;
  .top {
    // height: 80px;
    border-bottom: 1px solid #aaa;
    .title {
      font-size: 16px;
      padding-top: 15px;
      margin-bottom: 10px;
    }
    padding-bottom: 10px;
  }
  .center {
    text-align: center;
    height: 70px;
    border-bottom: 1px solid #aaa;
    display: flex;
    justify-content: space-around;
    align-content: center;
    .aitem {
      margin-top: 10px;
      p {
        margin-bottom: 5px;
        font-size: 13px;
        color: #666;
        color: #4eb979;
        font-size: 18px;
      }
      .txt {
        font-size: 13px;
        color: #666;
      }
    }
  }
  .bottom {
    margin-top: 20px;
    height: 70px;
    display: flex;
    justify-content: start;
    p {
      margin-bottom: 5px;
      margin-right: 6px;
      font-size: 13px;
      color: #666;
      span {
        margin-right: 5px;
        font-size: 14px;
        color: #333;
      }
    }
    .right {
      margin-left: 120px;
    }
  }
}
/deep/ .van-nav-bar {
  background-color: #4eb979;
  .van-nav-bar__title {
    color: #fff;
    font-size: 20px;
  }
  .van-icon {
    color: #fff;
    font-size: 20px;
  }
}
/deep/ .van-swipe {
  //   margin-top: 40px;
  width: 100%;
  height: 252px;
  img {
    width: 100%;
    height: 252px;
  }
}
.fixbottom {
  z-index: 999;
  border-top: 1px solid #eee;
  width: 100%;
  position: fixed;
  bottom: 0;
  /deep/ .van-button--normal {
    font-size: 18px;
  }
  /deep/ .van-button {
    border: none;
    width: 100%;
  }
  /deep/ .van-grid-item__content {
    padding: 0;
  }
}
</style>

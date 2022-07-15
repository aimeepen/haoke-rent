<template>
  <div>
    <!-- 必须指定宽高 -->
    <div id="container"></div>
  </div>
</template>

<script>
import { getCityData } from '@/api/city'
// import { mapState } from 'vuex'
export default {
  created () {

  },
  async mounted () {
    this.$toast.loading({
      message: '加载中',
      forbidClick: true, // 禁用背景点击
      duration: 0
    })
    await this.getCityData()
    this.$toast.clear()
    this.initMap()
  },

  data () {
    return {
      info: []
    }
  },
  methods: {
    async getCityData () {
      const res = await getCityData(this.$store.state.id)
      console.log(res)
      this.info = res.data.body
      console.log('1', this.info)
    },
    initMap () {
      console.log('info', this.info)
      // const { BMapGL } = window
      // 创建地址解析器实例
      const myGeo = new window.BMapGL.Geocoder()
      const name = this.$store.state.name
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(name, (point) => {
        if (point) {
          // 初始化地图
          map.centerAndZoom(point, 11)
          // 添加常用控件
          map.addControl(new window.BMapGL.NavigationControl())
          map.addControl(new window.BMapGL.ScaleControl())
        }
      }, name)
      const map = new window.BMapGL.Map('container') // 创建地图实例
      const point = new window.BMapGL.Point(116.404, 39.915) // 创建点坐标
      map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

      this.info.forEach(item => {
        // const {
        //   coord: { longitude, latitude },
        //   // value,
        //   label
        // } = item
        // 创建label实例对象
        const label = {
          position: new window.BMapGL.Point(item.coord.longitude, item.coord.latitude),
          offset: new window.BMapGL.Size(10, 20)
        }
        // 创建文本标注
        const labelList = new window.BMapGL.Label(item.label, label)
        console.log(labelList)

        // labelList.setContent(item.label)
        // 标签样式
        labelList.setStyle({
          color: '#fff',
          fontSize: '14px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#21b97a',
          border: 'none',
          textAlign: 'center',
          lineHeight: '40px'
        })
        labelList.addEventListener('click', function () {
          map.centerAndZoom(labelList, 18)
        })
        // 添加覆盖物到地图中
        map.addOverlay(labelList)
      })
    }
  },

  computed: {},
  watch: {},
  filters: {},
  components: {
  }
}
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
#container {
  width: 100vw;
  height: 100vh;
}
</style>

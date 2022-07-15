initMap () {
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

      // 标签样式
      // labelList.setStyle({
      //   color: '#fff',
      //   fontSize: '14px',
      //   width: '40px',
      //   height: '40px',
      //   borderRadius: '50%',
      //   backgroundColor: 'pink',
      //   textAlign: 'center',
      //   lineHeight: '40px'
      // })
      this.info.forEach(item => {
        const {
          coord: { longitude, latitude },
          value,
          label
        } = item
        // 创建覆盖物
        const areaPoint = new window.BMapGL.Point(longitude, latitude)
        // 创建label实例对象
        const label1 = new window.BMapGL.Label('111', {
          position: areaPoint,
          offset: new window.BMapGL.Size(10, 20)
        })
        // 给 label 对象添加一个唯一标识
        label.id = value

        // 设置样式
        label.setStyle(labelStyle)
        // 添加单击事件
        label.addEventListener('click', () => {
          console.log('房源覆盖物被点击了', label.id)
          // 放大地图，以当前点击的覆盖物为中心放大地图
          // 第一个参数：坐标对象
          // 第二个参数：放大级别
          map.centerAndZoom(areaPoint, 13)
          // 解决清除覆盖物时，百度地图API的JS文件自身报错的问题
          setTimeout(() => {
            // 清除当前覆盖物信息
            map.clearOverlays()
          }, 0)
        })
        // 添加覆盖物到地图中
        map.addOverlay(label1)
      })
    }
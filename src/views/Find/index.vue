<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <search-address @getId="getHouseCondition"
          ><van-icon name="search"
        /></search-address>
      </template>
    </van-nav-bar>
    <van-dropdown-menu active-color="#21b97a">
      <van-dropdown-item title="区域" ref="quyu">
        <van-picker
          :style="{ display: firm ? 'none' : '' }"
          show-toolbar
          :columns="columns"
          @confirm="onConfirmQuyu"
          @cancel="onCancel"
          @change="onChange"
        />
      </van-dropdown-item>
      <van-dropdown-item title="方式" ref="fangshi">
        <van-picker
          show-toolbar
          :columns="columns1"
          @confirm="onConfirmFangshi"
          @cancel="onCancel"
          @change="onChange"
        />
      </van-dropdown-item>
      <van-dropdown-item title="租金" ref="zujin">
        <van-picker
          :columns="columns2"
          show-toolbar
          @confirm="onConfirmZujin"
          @cancel="onCancel"
          @change="onChange"
        />
      </van-dropdown-item>
      <van-dropdown-item class="choose" title="筛选" @open="show = true">
      </van-dropdown-item>
      <van-popup
        v-if="show"
        position="right"
        :style="{
          width: '80%',
          height: '100%',
        }"
        v-model="show"
      >
        <div class="type-choose">
          <div class="top">
            <h4>户型</h4>
            <div class="bottom-content">
              <ul>
                <li
                  v-for="(item, index) in lis1"
                  :key="index"
                  @click="addStyle($event, item)"
                >
                  {{ item.text }}
                </li>
              </ul>
            </div>
            <van-divider />
          </div>
          <div class="top">
            <h4>朝向</h4>
            <div class="bottom-content">
              <ul>
                <li
                  v-for="(item, index) in lis2"
                  :key="index"
                  @click="addStyle($event, item)"
                >
                  {{ item.text }}
                </li>
              </ul>
            </div>
            <van-divider />
          </div>
          <div class="top">
            <h4>楼层</h4>
            <div class="bottom-content">
              <ul>
                <li
                  v-for="(item, index) in lis3"
                  :key="index"
                  @click="addStyle($event, item)"
                >
                  {{ item.text }}
                </li>
              </ul>
            </div>
            <van-divider />
          </div>
          <div class="top">
            <h4>房屋亮点</h4>
            <div class="bottom-content">
              <ul>
                <li
                  v-for="(item, index) in lis4"
                  :key="index"
                  @click="addStyle($event, item)"
                >
                  {{ item.text }}
                </li>
              </ul>
            </div>
            <van-divider />
          </div>
          <div class="another">
            <van-button class="qingchu" type="primary" @click="cancel" fixed
              >清除</van-button
            >
            <van-button class="queding" type="primary" @click="confirm" fixed
              >确定</van-button
            >
          </div>
        </div>
      </van-popup>
    </van-dropdown-menu>
    <div class="bottom">
      <room-item
        @click="$router.push('detail')"
        :obj="item"
        v-for="(item, index) in house"
        :key="index"
      ></room-item>
    </div>
  </div>
</template>

<script>
import SearchAddress from '@/components/SearchAddress.vue'
import { getHouseCondition, getHouses } from '@/api/house'
import RoomItem from '@/components/RoomItem.vue'
export default {
  created () {
    this.getHouseCondition()
  },
  mounted () {
    this.getHouses(this.obj)
  },
  data () {
    return {
      quyu: true,
      show: false,
      firm: false,
      isChoose: [],
      columns1: [],
      columns2: [
        // '不限',
        // '1000及以下',
        // '1000-2000',
        // '2000-3000',
        // '3000-4000',
        // '4000-5000',
        // '5000-7000',
        // '7000以上'
      ],
      columns: [
        // {
        //   text: '',
        //   children: [
        //     {
        //       text: '',
        //       children: [{ text: '' }]
        //     }
        //   ]
        // },
        // {
        //   text: ''
        // }
      ],
      lis1: [],
      lis2: [],
      lis3: [],
      lis4: [],
      obj: {
        start: 1,
        end: 20,
        rentType: true,
        price: null,
        floor: 'FLOOR|1',
        cityId: '',
        more: '',
        area: '',
        subway: '',
        characteristic: 'CHAR|76eb0532-8099-d1f4',
        roomType: '',
        oriented: ''
      },
      house: []

    }
  },
  methods: {

    async getHouseCondition (id) {
      // 判断参数数据类型
      // 第一次为字符串即对obj的cityId赋值
      // 第二次为对象即改变obj对象
      if (id instanceof Object) {
        this.obj = id
      } else {
        this.$set(this.obj, 'cityId', id)
        console.log(this.obj)
      }
      this.$toast.loading({
        message: '加载中',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      // 获取房屋查询条件
      try {
        // 查询时只传id
        // 第一次成功时因为初始化传过来的是一个id 后面传过来的都是对象
        const res = await getHouseCondition(this.obj.cityId)
        console.log('res', res)
        // 区域
        this.columns.push(res.data.body.area)
        this.columns[0].text = res.data.body.area.label
        this.columns[0].value = res.data.body.subway.value
        this.columns[0].children.forEach(item => {
          item.text = item.label
          item.val = item.value

          if (item.children) {
            item.children.forEach(item1 => {
              item1.text = item1.label
              item1.val = item1.value
            })
          }
        })
        this.columns[0].children.shift()
        // 地铁
        this.columns.push(res.data.body.subway)
        this.columns[1].text = res.data.body.subway.label
        this.columns[1].value = res.data.body.subway.value
        this.columns[1].children.forEach(item => {
          item.text = item.label
          item.val = item.value
          if (item.children) {
            item.children.forEach(item1 => {
              item1.text = item1.label
              item1.val = item1.value
            })
          }
        })
        console.log(this.columns)

        res.data.body.rentType.forEach(item => {
          this.columns1.push({ text: item.label, value: item.value })
          // this.$store.commit('setrentType', this.columns1)
        })
        // console.log(this.columns1)

        res.data.body.price.forEach(item => {
          this.columns2.push({ text: item.label, value: item.value })
        })
        // console.log(this.columns2)

        // 户型
        res.data.body.roomType.forEach(item => {
          this.lis1.push({ text: item.label, value: item.value })
          this.$store.commit('setroomType', this.lis1)
        })

        // 朝向
        res.data.body.oriented.forEach(item => {
          this.lis2.push({ text: item.label, value: item.value })
          this.$store.commit('setoriented', this.lis2)
        })
        // console.log(this.lis2)
        // 楼层
        res.data.body.floor.forEach(item => {
          this.lis3.push({ text: item.label, value: item.value })
          this.$store.commit('setfloor', this.lis3)
        })
        // console.log(this.lis3)
        // 房屋亮点
        res.data.body.characteristic.forEach(item => {
          this.lis4.push({ text: item.label, value: item.value })
        })
        // console.log(this.lis4)
      } catch (err) {
        console.log(err)
      }
      this.$toast.clear()
    },
    async getHouses () {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      try {
        const res = await getHouses(this.obj)
        // console.log(this.obj)
        // console.log(res)
        this.house = res.data.body.list
      } catch (err) {
        console.log(err)
      }
      this.$toast.clear()
    },
    // 获取区域地铁id
    onConfirmQuyu (value) {
      this.$refs.quyu.toggle()
      console.log(value)
      try {
        this.columns.forEach(item => {
          if (item.text === '区域') {
            item.children.forEach(item1 => {
              if (item1.text === value[1]) {
                // console.log(item1.text)
                // console.log(value[1])
                item1.children.forEach(item2 => {
                  this.$set(this.obj, 'area', item1.val)
                  if (item2.text === value[2]) {
                    // console.log(item2.text)
                    // console.log(value[2])
                    // console.log(item2.val)
                    this.$set(this.obj, 'area', item2.val)
                  }
                })
              }
            })
          } else if (item.text === '地铁') {
            item.children.forEach(item1 => {
              if (item1.text === value[1]) {
                // console.log(item1.text)
                // console.log(value[1])
                item1.children.forEach(item2 => {
                  if (item2.text === value[2]) {
                    // console.log(item2.text)
                    // console.log(value[2])
                    // console.log(item2.val)
                    this.$set(this.obj, 'subway', item2.val)
                  }
                })
              }
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
      console.log(this.obj)
      this.getHouses(this.obj)
    },
    onConfirmFangshi (value) {
      this.$refs.fangshi.toggle()
      console.log(value)
      this.$set(this.obj, 'rentType', value.value)
      console.log(this.obj)
      this.getHouses(this.obj)
    },
    onConfirmZujin (value) {
      this.$refs.zujin.toggle()
      console.log(value)
      this.$set(this.obj, 'price', value.value)
      console.log(this.obj)
      this.getHouses(this.obj)
    },
    onChange (value, index) {
    },
    onCancel () {

    },

    addStyle (e, val) {
      // console.log(val)
      // console.log(e.target.parentElement.parentElement.previousElementSibling.innerHTML)
      const ele = e.target.parentElement.parentElement.previousElementSibling.innerHTML
      if (e.target.className.indexOf('green') === -1) {
        e.target.className = 'green'
        if (ele === '户型') {
          this.obj.roomType = val.value
        } else if (ele === '朝向') {
          this.obj.oriented = val.value
        } else if (ele === '楼层') {
          this.obj.floor = val.value
        } else {
          this.obj.more = val.value
        }
        this.isChoose.push(val)
      } else {
        e.target.className = ''
        this.isChoose.forEach((item, i) => {
          if (item === val) {
            this.isChoose.splice(i, 1)
          }
        })
      }
      console.log(this.obj)
      console.log(this.isChoose)
    },
    confirm () {
      this.show = false
      this.getHouses(this.obj)
    },
    cancel () {
      document.querySelectorAll('li').className('')
      this.isChoose = []
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchAddress, RoomItem }
}
</script>

<style scoped lang='less'>
.green {
  background-color: #defaef;
  color: #21b97a;
  border: 1px solid #21b97a !important;
}
.type-choose {
  padding: 14px 15px;
  .top {
    h4 {
      font-size: 15px;
      color: #333;
      font-weight: normal;
    }
    .bottom-content {
      margin-left: 40px;
      ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        color: #888;
        li {
          width: 70px;
          height: 32px;
          line-height: 32px;
          border: 1px solid #e5e5e5;
          margin: 0 18px 15px 0;
          text-align: center;
        }
      }
    }
    .van-divider {
      color: #e5e5e5;
      margin-left: 40px;
    }
  }
  .another {
    display: flex;
    position: relative;
    height: 50px;
    .qingchu {
      flex: 1 1;
      background-color: #fff;
      color: #21b97a;
      border: none;
    }
    .queding {
      flex: 2 1;
      background-color: #21b97a;
    }
  }
}

/deep/ .show {
  position: absolute;
  top: 46px;
  right: -14px;
  width: 94px;
  height: 48px;
  opacity: 0;
}
/deep/.van-search__content {
  margin-left: 20px;
  margin-top: -19px;
}
/deep/.location {
  margin-top: -17px;
  margin-left: 15px;
  color: #333;
}
/deep/.circle {
  position: absolute;
  top: 12px;
  right: 18px;
  padding-right: 1px;
}
/deep/ .van-search__content {
  width: 268px;
}
/deep/ .van-icon {
  color: #888;
}
/deep/.van-picker__toolbar {
  width: 375px;
  height: 50px;
  position: fixed;
  top: 358px;
  background-color: #fff;
  text-align: center;
}
/deep/.van-picker__cancel {
  color: #21b97a;
  flex: 1 1;
  font-size: 18px;
}
/deep/.van-picker__confirm {
  background-color: #21b97a;
  color: #fff;
  flex: 2 1;
  font-size: 18px;
}
</style>

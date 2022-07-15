<template>
  <div
    class="house-item"
    @click="$router.push({ name: 'detail', params: { id: obj.houseCode } })"
  >
    <div class="house-img">
      <van-image :src="'http://liufusong.top:8080' + obj.houseImg" />
    </div>
    <div class="house-content">
      <div class="van-ellipsis">
        {{ obj.title }}
      </div>
      <p>{{ obj.desc }}</p>
      <div class="label">
        <span v-for="(item1, index1) in obj.tags" :key="index1">{{
          item1
        }}</span>
      </div>
      <div class="price">
        <span>{{ obj.price }}</span
        >元/月
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
    }
  },
  methods: {

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-image__img {
  width: 106px;
  height: 80px;
}
.house-item {
  display: flex;
  margin-top: 18px;
  height: 100px;
  border-bottom: 1px solid #e5e5e5;
  .house-img {
    width: 106px;
    height: 80px;
  }
  .house-content {
    width: 270px;
    height: 90px;
    margin-left: 12px;

    .van-ellipsis {
      font-size: 15px;
      color: #394043;
      margin: 2px 0;
      font-weight: bold;
    }
    p {
      font-size: 12px;
      color: #afb2b3;
      margin: 0;
    }
    .label {
      span {
        position: relative;
        top: -7px;
        height: 12px;
        line-height: 12px;
        display: inline-block;
        font-size: 12px;
        border-radius: 3px;
        padding: 4px 5px;
        color: #39becd;
        background: #e1f5f8;
        margin: 0 auto;
        margin-right: 3px;
      }
    }
    .price {
      position: relative;
      top: -2px;
      font-size: 12px;
      color: #fa5741;
      span {
        font-size: 16px;
        font-weight: bolder;
      }
    }
  }
}
</style>

import request from '@/utils/request'
export const getHouseCondition = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}

// 根据条件查询房屋所需各种数据
export const getHouses = ({
  cityId,
  area,
  subway,
  rentType,
  price,
  more,
  roomType,
  oriented,
  characteristic,
  floor,
  start,
  end

}) => {
  return request({
    url: '/houses',
    params: {
      cityId,
      area,
      subway,
      rentType,
      price,
      more,
      roomType,
      oriented,
      characteristic,
      floor,
      start,
      end

    }
  })
}

export const getHouseInfo = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
/**
 * 查询小区信息
 * @returns
 */
export const getCommunity = ({ id, name }) => {
  return request({
    url: '/area/community',
    params: {
      id,
      name
    }
  })
}
/**
 * 图片上传
 * @param {*} data
 * @returns
 */
export const getHouseImage = (data) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    data
  })
}
/**
 * 发布房屋所需条件
 * @returns
 */
export const getHousesParams = () => {
  return request({
    url: '/houses/params'
  })
}

/**
 * 发布房屋
 * @param {*} param0
 * @returns
 */
export const postHouse = ({
  title,
  description,
  houseImg,
  oriented,
  supporting,
  price,
  roomType,
  size,
  community
}) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data: {
      title,
      description,
      houseImg,
      oriented,
      supporting,
      price,
      roomType,
      size,
      community
    }
  })
}

/**
 * 房屋详情
 * @param {*} id
 * @returns
 */
export const getHouseDetail = (id) => {
  return request({
    url: `/houses/${id}`
  })
}

/**
 * 添加收藏
 */

export const addCollect = id => {
  return request({
    url: `/user/favorites/${id}`
  })
}

/**
 * 删除收藏
 */
export const delCollect = id => {
  return request({
    url: `/user/favorites/${id}`
  })
}

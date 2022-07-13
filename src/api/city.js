import request from '@/utils/request'

export const getCityHot = () => {
  return request({
    url: '/area/hot'
  })
}

export const getCityList = (level) => {
  return request({
    url: '/area/city',
    params: { level }
  })
}

export const getCityInfo = (name) => {
  return request({
    url: 'area/info',
    params: {
      name
    }
  })
}

export const getCityData = (id) => {
  return request({
    url: '/area/map',
    params: {
      id
    }
  })
}

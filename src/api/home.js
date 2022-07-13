import request from '@/utils/request'
export const getSwiper = () => {
  return request({
    url: '/home/swiper'
  })
}

export const getRentGroup = (id) => {
  return request({
    url: '/home/groups',
    params: {
      id
    }
  })
}

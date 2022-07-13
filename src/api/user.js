import request from '@/utils/request'
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data
  })
}

export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}

export const getUserFavorites = () => {
  return request({
    url: '/user/favorites'
  })
}

// export const getUserHouses = (data) => {
//   return request({
//     method: 'POST',
//     url: '/user/houses',
//     data
//   })
// }

export const getUserHouses = () => {
  return request({
    url: '/user/houses'
  })
}

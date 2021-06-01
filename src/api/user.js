import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/backend/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/backend/v1/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/backend/v1/logout',
    method: 'delete'
  })
}

export function getUserList(params) {
  return request({
    url: '/backend/v1/user',
    method: 'get',
    params
  })
}

export function getUserDriver(params) {
  return request({
    url: '/backend/v1/driver',
    method: 'get',
    params
  })
}
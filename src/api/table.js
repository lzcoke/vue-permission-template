import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function deleteAdminUser(data) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'delete',
    data
  })
}

export function getAdminUserList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getAdminLog(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

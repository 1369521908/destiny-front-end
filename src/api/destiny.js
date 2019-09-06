import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/destiny/list',
    method: 'get',
    params
  })
}

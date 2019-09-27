import request from '@/utils/request'

export function getList(params, page) {
  return request({
    url: '/lol/hero',
    method: 'get',
    params
  })
}

export function getDetailList(params, page) {
  return request({
    url: '/lol/heroDetail',
    method: 'get',
    params
  })
}

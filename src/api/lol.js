import request from '@/utils/request'

export function getList(params, page) {
  return request({
    url: '/lol/hero',
    method: 'get',
    params,
    page
  })
}

export function get(id) {
  return request({
    url: '/lol/hero/' + id,
    method: 'get'
  })
}

export function getDetail(id) {
  return request({
    url: '/lol/heroDetail/' + id,
    method: 'get'
  })
}

export function getDetailList(data) {
  return request({
    url: '/lol/heroDetail/all',
    method: 'post',
    data
  })
}

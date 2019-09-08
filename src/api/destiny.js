import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/destiny',
    method: 'get',
    params
  })
}

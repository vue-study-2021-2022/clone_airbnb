import request from '@/apis/request'

export const getSample = (id, params) => {
  return request({
    url: `/sample/${id}`,
    method: 'get',
    params,
  })
}

export const postSample = (data) => {
  return request({
    url: `/sample`,
    method: 'post',
    data,
  })
}

export const putSample = (id, data) => {
  return request({
    url: `/sample/${id}`,
    method: 'put',
    data,
  })
}

export const deleteSample = (id) => {
  return request({
    url: `/sample/${id}`,
    method: 'delete',
  })
}

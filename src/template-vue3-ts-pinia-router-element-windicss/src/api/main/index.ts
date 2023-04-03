import request from '@/api';
export function getData(params: any) {
  return request({
    url: '/getData',
    method: 'get',
    params,
  });
}
export function postData(data: any) {
  return request({
    url: '/postData',
    method: 'post',
    data,
  });
}

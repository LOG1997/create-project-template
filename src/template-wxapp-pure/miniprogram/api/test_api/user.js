import wxRequest from '../request'

export const getUser=(data)=>{
  return wxRequest({
    url:'/api/getUser',
    method:'GET',
    data
  })
}
import {request} from './request';


export function getHomeMultidata() {
  return request ({
    url:'/api/m5/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url: '/api/m5/home/data',
    params: {
      type,
      page
    }
  })
}

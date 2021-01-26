import {request} from './request';


export function getSort() {
  return request ({
    url:'/api/m5/category'
  })
}

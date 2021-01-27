import {request} from './request';


export function getSort() {
  return request ({
    url:'/api/m5/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: "/api/m5/subcategory",
    params: {
      maitKey
    }
  }).catch(err => err);
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/api/m5/subcategory/detail",
    params: {
      miniWallkey,
      type
    }
  }).catch(err => err);
}

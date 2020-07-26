import {request} from './request'

export function getDetail(iid){
 return  request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

//ES6中使用类
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
  }
}
// export class Shop{
//   constructor(shopInfo){
//     this.shopLogo = shopInfo.shopLogo
//   }
// }
import Http from "../../utils/http";
import Qs from 'qs'

export function doLogin(data: any) {
  return Http.post('/api/front/login', Qs.stringify(data))
}

export function doRegister(data: any) {
  return Http.post('/api/front/register', data)
}

export function doChangePassword(data: any) {
  return Http.post('/api/front/changePassword', Qs.stringify(data))
}

export async function getUserInfo() {
  return await Http.get('/api/front/userInfo')
}

export function getUserOrder(size: number, page: number, goodsName: string) {
  return Http.get('/api/front/orders/showMyOrders', {
    params: {
      size: size,
      page: page,
      goodsName: goodsName,
    }
  })
}
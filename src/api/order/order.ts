import Http from "../../utils/http"

export function searchOrderFrom(data: any) {
  return Http.get('/api/front/orderGroups/searchFrom', {
    params: {
      playTime: data.playTime,
      goodsName: data.goodsName,
      roomName: data.roomName,
      roundName: data.roundName,
    }
  })
}

export function addOrder(orderGroup: number) {
  return Http.post('/api/front/orders', {
    orderGroup: orderGroup
  })
}

export function deleteOrderById(id: number) {
  return Http.delete('/api/front/orders/' + id)
}
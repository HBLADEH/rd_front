import Http from "../../utils/http"


export function getGoodsData(size: number, page: number, keyword: string) {
  return Http.get('/api/front/goods/listAll', {
    params: {
      size: size,
      page: page,
      name: keyword
    }
  })
}

export function getGoodsInfoById(goodsId: number) {
  return Http.get(`/api/front/goods/${goodsId}`)
}


export function getGoodsDWData(goodsName: string) {
  return Http.get('/api/front/goods/goodsDW', {
    params: {
      goodsName: goodsName
    }
  })
}
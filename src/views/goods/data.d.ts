export interface GoodsItem {
  id: number
  createTime: Date
  updateTime: Date
  name: string
  description: string
  playNum: number
  coverImg: string
}
export interface packageItem {
  goodsId: number
  name: string
  price: number
}
export interface GoodsInfoType {
  goods?: GoodsItem
  packageList?: packageItem[]
}
import { BottomBar } from "./data";

export const BottomBarList: BottomBar = {
  default: "orderGroup",
  list: [
    { name: "orderGroup", text: "场次", icon: "calendar-o", to: "/orderGroup" },
    { name: "order", text: "预约", icon: "clock-o", to: "/order" },
    { name: "goods", text: "商品", icon: "shop-o", to: "/goods" },
    { name: "user", text: "我的", icon: "user-circle-o", to: "/user" },
  ],
}


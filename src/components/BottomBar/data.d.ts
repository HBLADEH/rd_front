export interface BottomBar {
  list: BottomBarItem[]
  default: string
}
export interface BottomBarItem {
  name: string
  text: string
  icon: string
  to: string
}
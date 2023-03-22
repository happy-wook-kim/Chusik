import infoStore from "@/stores/info"
import Menu from "@/components/common/menu"
import styles from "./settings.module.scss"

export default function Settings() {
  const menus = [
    {title: '내 설정', img: new URL('@/assets/account.svg', import.meta.url).href, alt:"account"},
    {title: '우선 순위 설정', img: new URL('@/assets/star.svg', import.meta.url).href, alt:"priority"},
    {title: '즐겨찾기 보기', img: new URL('@/assets/favorite.svg', import.meta.url).href, alt:"favorite"},
    {title: '블랙리스트 관리', img: new URL('@/assets/blacklist.svg', import.meta.url).href, alt:"blacklist"},
  ]

  return (
    <div className={styles.settings}>
      <h1 className={styles.title}>설정</h1>
      <Menu menus={menus}/>
    </div>
  )
}
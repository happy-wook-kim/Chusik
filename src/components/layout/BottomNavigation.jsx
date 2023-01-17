import styles from "./BottomNavigation.module.scss"
import { useState } from "react"

export default function BottomNavigation() {
  const [navi, setNavi] = useState([
    {
      index: 0,
      value: true,
      title: '식당 찾기',
      src: new URL('../../assets/map.svg', import.meta.url).href
    },
    {
      index: 1,
      value: false,
      title: '즐겨찾기',
      src: new URL('../../assets/bookmark.svg', import.meta.url).href
    },
    {
      index: 2,
      value: false,
      title: '설정',
      src: new URL('../../assets/settings.svg', import.meta.url).href
    }
  ])

  const onClick = (a) => {
    console.log('13123')
    console.log(a.target)
  }

  return (
    <div className={styles.navigation}>
      {navi?.map((item, i) => 
        <section key={item.index}>
          <button className={item.value ? 'active' : 'none'} onClick={onClick}>
            <img src={item.src} />
            {item.title}
          </button>
        </section>
      )}
    </div>
  )
}